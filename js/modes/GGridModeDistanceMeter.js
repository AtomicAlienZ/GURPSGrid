function GGridModeDistanceMeter () {
	this._name = 'distanceMeter';

	// Strat and end points in hex and global coordinates
	this._startPointHex = null;
	this._startPointLine = null;
	this._endPointHex = null;
	this._endPointLine = null;

	// Options - should be operated by mode settings
	this._snapToHexes = true;

	// Visual styling
	this._hexStroke = new GGridStrokeStyle('#009900',3,0.5);
	this._hexFill = new GGridFillStyle('#009900',0.2);
	this._arrowStroke = new GGridStrokeStyle();
}

// Extending from GGridStyle
GGridModeDistanceMeter.prototype = new GGridMode();
GGridModeDistanceMeter.prototype.constructor = GGridModeDistanceMeter;
GGridModeDistanceMeter.prototype.parent = GGridMode.prototype;

GGridModeDistanceMeter.prototype.modeStart = function () {}

GGridModeDistanceMeter.prototype.modeEvent = function (coords,type,e) {
	// Stopping event propagation and selecting for good dragging
	e.stopPropagation();
	e.preventDefault();

	if (type == 'mousedown' || type == 'mouseup') {
		if ((type == 'mousedown' && this._startPointHex && !this._endPointHex) || type == 'mouseup') {
			this._endPointHex = this._ggrid.grid.getHexCoords(coords);
			this._endPointLine = coords;
		}
		else {
			console.log('start');
			this._ggrid.grid.clearOverlay();
			this._endPointHex = null;
			this._endPointLine = null;
			this._startPointHex = this._ggrid.grid.getHexCoords(coords);
			this._startPointLine = coords;
		}
	}
	else if (type == 'mousemove') {
		if (this._startPointHex && !this._endPointHex) {
			var hexCoords = this._ggrid.grid.getHexCoords(coords);

			this._ggrid.grid.clearOverlay();

			// Building overlays needed
			if (this._startPointHex) {
				// Start hex
				this._ggrid.grid.drawHex(this._startPointHex,this._hexStroke,this._hexFill);

				// If current hex differs - build end hex
				if (hexCoords.x() != this._startPointHex.x() || hexCoords.y() != this._startPointHex.y()) {
					this._ggrid.grid.drawHex(hexCoords,this._hexStroke,this._hexFill);
				}

				// Draw a line
				if (this._snapToHexes) {
					this._ggrid.grid.drawLine(
						this._ggrid.grid.getHexCenter(this._startPointHex),
						this._ggrid.grid.getHexCenter(hexCoords),
						this._arrowStroke
					);
				}
				else {
					this._ggrid.grid.drawLine(this._startPointLine,coords,this._arrowStroke);
				}
			}
		}
	}
}

GGridModeDistanceMeter.prototype.modeEnd = function () {
	this._ggrid.grid.clearOverlay();
}