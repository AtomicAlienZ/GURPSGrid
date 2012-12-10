function GGridStyle (color,opacity) {
	this._color = this._hexToRGB('000000');
	this._opacity = 1;

	if (typeof color != "undefined" && color) {
		this.setColor(color);
	}

	if (typeof opacity != "undefined") {
		this.setOpacity(opacity);
	}
}

GGridStyle.prototype.setColor = function (value) {
	if (
		typeof value == 'object' &&
			typeof value.r != "undefined" &&
			typeof value.g != "undefined" &&
			typeof value.b != "undefined"
		) {
		this._color = value;
		return;
	}

	this._color = this._hexToRGB(value);
}

GGridStyle.prototype.setOpacity = function (value) {
	value = parseFloat(value);

	if (isNaN(value)) {
		throw 'Invalid opacity value supplied!';
	}

	this._opacity = Math.max(Math.min(value, 1), 0);
}

GGridStyle.prototype._prepareColorString = function () {
	// building color string
	var colorstring = this._color.r+','+this._color.g+','+this._color.b;

	// No half-transparency - color via rgb
	if (this._opacity == 1) {
		colorstring = 'rgb('+colorstring+')';
	}
	// Transparent or half-transparent - color via rgba
	else {
		colorstring = 'rgba('+colorstring+','+this._opacity+')';
	}

	return colorstring;
}

GGridStyle.prototype._hexToRGB = function (hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) {
		throw 'Invalid HEX color supplied!';
	}
	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};
}