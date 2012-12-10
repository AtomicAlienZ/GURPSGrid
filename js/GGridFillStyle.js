function GGridFillStyle (color,opacity) {
	// Calling parent constructor
	this.parent.constructor.call(this,color,opacity);
}

// Extending from GGridStyle
GGridFillStyle.prototype = new GGridStyle();
GGridFillStyle.prototype.constructor = GGridFillStyle;
GGridFillStyle.prototype.parent = GGridStyle.prototype;

GGridFillStyle.prototype.applyTo = function (context) {
	// Setting color
	context.fillStyle = this._prepareColorString();
}