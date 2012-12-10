/**
 * Engine object
 * @type {Object}
 */
var GGrid = {
	_options: {
		hexSize: 40,
		hex: {
			size: 40,
			linewidth: 1,
			linecolor: '#000000',
			lineopacity: 1
		}
	},

	_canvasContainer: null,
	/**
	 * Layers container. values contain z-indexes, later will become GGridCanvas objects
	 */
	_layers: {
		overlay: 40,
		grid: 30,
		objects: 20,
		tiles: 10,
		background: 0
	},

	_eventsCollector: null,
	_modes: {},
	_currentMode: null,

	// Global positioning data
	_globalOffset: null,

	// Visible hexes data
	_hexesX: 0,
	_hexesY: 0,

	// Assets
	grid: null,

	init: function () {
		this._canvasContainer = $('#canvasContainer');

		// Creating layers
		var mzindex = 0;
		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				if (this._layers[i] > mzindex){
					mzindex = this._layers[i];
				}

				this._layers[i] = new GGridCanvas(i,'',this._canvasContainer,this._layers[i]);
			}
		}

		// Creating events collector
		this._eventsCollector = $('<div></div>').attr('id','GGrid-eventsCollector').css('z-index',mzindex+10);
		this._canvasContainer.prepend(this._eventsCollector);

		// Getting offsets
		var offset = this._eventsCollector.offset();
		this._globalOffset = new GGridCoordPoint(offset.left,offset.top);

		// Creating grid
		this.grid = new GGridHexGrid(this,this._layers.grid,this._layers.overlay,this._options.hex.size);
		this._hexesX = Math.ceil (this._eventsCollector.width()/this.grid.getHexOwnWidth());
		this._hexesY = Math.ceil (this._eventsCollector.height()/this.grid.getHexOwnHeight());

		// Building hexes grid
		var hexstroke = new GGridStrokeStyle(this._options.hex.linecolor,this._options.hex.linewidth,this._options.hex.lineopacity);
		this.grid.drawHexField(0,0,this._hexesX,this._hexesY,hexstroke);

		// Setting events listener on events collector via closure
		this._eventsCollector.on('dblclick click mousemove mousedown mouseup',(function (e) {
			var self = this;
			return function (e) {
				self._eventsProcessor(e);
			}
		}).call(this));

		return this._layers;
	},

	_eventsProcessor: function (e) {
		if (this._currentMode) {
			this._currentMode.modeEvent(
				new GGridCoordPoint(e.pageX -= this._globalOffset.x(), e.pageY -= this._globalOffset.y()),
				e.type,
				e
			);
		}
	},

	registerMode: function (mode) {
		if (!(mode instanceof GGridMode)) {
			throw 'Invalid mode registered!';
		}

		this._modes[mode.getName()] = mode;
		this._modes[mode.getName()].setGGrid(this);
	},

	registerAction: function (action,controller) {

	},

	activateMode: function (mode) {
		if (typeof this._modes[mode] != "undefined") {
			this.deactivateCurrentMode();

			// Setting needed mode as current
			this._currentMode = this._modes[mode];
			this._currentMode.modeStart();
		}
	},

	deactivateCurrentMode: function () {
		// Deinitializing current active mode if any
		if (this._currentMode) {
			this._currentMode.modeEnd();
		}

		this._currentMode = null;
	},

	getCurrentModeName: function () {
		if (this._currentMode) {
			return this._currentMode.getName();
		}
		return '';
	}
}