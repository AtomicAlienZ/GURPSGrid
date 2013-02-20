function GGridModeHighlightHex () {
	GGridMode.call(this);
	this._name = 'highlightHex';
	this._highlightedHex = null;
	this._stroke = new GGridStrokeStyle('#00ff00',3,0.5);
	this._fill = new GGridFillStyle('00ff00',0.2);
}

// Extending from GGridStyle
GGridModeHighlightHex.prototype = new GGridMode();
GGridModeHighlightHex.prototype.constructor = GGridModeHighlightHex;
GGridModeHighlightHex.prototype.parent = GGridMode.prototype;

GGridModeHighlightHex.prototype.modeStart = function () {}

GGridModeHighlightHex.prototype.modeEvent = function (coords,type,e) {
	if (type == 'click') {
		var coordPoint = this._ggrid.grid.getHexCoords(coords);

		// Hilighting if we have no hilighted hex or hilghlightd hex was different
		if (
			!this._highlightedHex ||
			this._highlightedHex.x() != coordPoint.x() ||
			this._highlightedHex.y() != coordPoint.y()
		) {
			this._ggrid.grid.clearOverlay();

			this._ggrid.grid.drawHex(coordPoint,this._stroke,this._fill);

			this._highlightedHex = coordPoint;
		}
		else if (
			this._highlightedHex &&
			this._highlightedHex.x() == coordPoint.x() &&
			this._highlightedHex.y() == coordPoint.y()
		) {
			this.modeEnd();
		}
		// Else - do nothing
	}
}

GGridModeHighlightHex.prototype.modeEnd = function () {
	this._ggrid.grid.clearOverlay();
	this._highlightedHex = null;
}