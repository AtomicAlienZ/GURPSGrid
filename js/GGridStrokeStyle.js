function GGridStrokeStyle (color,linethickness,opacity,linecaps) {
	// Calling parent constructor
	this.parent.constructor.call(this,color,opacity);

	// Own members
	this._thickness = 1;
	this._lineCaps = 'butt'; // 'round', 'square'

	if (typeof linethickness != "undefined" && linethickness) {
		this.setThickness(linethickness);
	}

	if (typeof linecaps != "undefined" && linecaps) {
		this.setCaps(linecaps);
	}
}

// Extending from GGridStyle
GGridStrokeStyle.prototype = new GGridStyle();
GGridStrokeStyle.prototype.constructor = GGridStrokeStyle;
GGridStrokeStyle.prototype.parent = GGridStyle.prototype;

GGridStrokeStyle.prototype.setThickness = function (value) {
	value = parseInt(value);

	if (isNaN(value)) {
		throw 'Invalid line thickness value supplied!';
	}

	this._thickness = Math.max(value, 1);
}

GGridStrokeStyle.prototype.setCaps = function (value) {
	value = value.toLowerCase();
	if (
		value != 'butt' &&
		value != 'round' &&
		value != 'square'
	) {
		throw 'Invalid line caps style supplied!';
	}

	this._lineCaps = value;
}

GGridStrokeStyle.prototype.applyTo = function (context) {
	// Setting color
	context.strokeStyle = this._prepareColorString();

	// Setting line thickness
	context.lineWidth = this._thickness;

	// Setting line caps style
	context.lineCap = this._lineCaps;
}