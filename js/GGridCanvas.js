function GGridCanvas (id,classes,parent,zindex) {
	this.$_canvas = $('<canvas></canvas>').addClass(classes);
	this.$_parent = $(parent);
	this._ctx = false;
	this._zindex = 0;

	// Setting z-index
	this.setZIndex(zindex);

	// Appending canvas to parent
	this.$_parent.append(this.$_canvas);

	// Initializing canvas
	this.reInit();

	// Getting context
	this._ctx = this.$_canvas[0].getContext("2d");
}

GGridCanvas.prototype.reInit = function () {
	this.$_canvas.prop({width:this.$_parent.width(),height:this.$_parent.height()});
}

GGridCanvas.prototype.setZIndex = function (zindex) {
	zindex = parseInt(zindex);
	if (isNaN(zindex) || zindex < 0) {
		zindex = 0;
	}

	this._zindex = zindex;
	this.$_canvas.css('z-index',zindex);
}

GGridCanvas.prototype.getCanvas = function () { return this.$_canvas }
GGridCanvas.prototype.getContext = function () { return this._ctx }
GGridCanvas.prototype.getZIndex = function () { return this._zindex }

GGridCanvas.prototype.drawPoly = function (vertices,stroke,fill) {
	if (!(vertices instanceof Array)) {
		throw 'Passed vertices are not an array!';
	}

	var ctx = this.getContext();
	ctx.beginPath();

	if (vertices[0] instanceof GGridCoordPoint) {
		ctx.lineTo(vertices[0].x(),vertices[0].y());
	}
	else {
		ctx.lineTo(vertices[0][0],vertices[0][1]);
	}

	for (var i = 1; i < vertices.length; i++) {
		if (vertices[i] instanceof GGridCoordPoint) {
			ctx.lineTo(vertices[i].x(),vertices[i].y());
		}
		else {
			ctx.lineTo(vertices[i][0],vertices[i][1]);
		}
	}

	if (fill instanceof GGridFillStyle) {
		fill.applyTo(ctx);
		ctx.fill();
	}

	if (stroke instanceof GGridStrokeStyle) {
		stroke.applyTo(ctx);
		ctx.stroke();
	}

	ctx.closePath();
}

GGridCanvas.prototype.clear = function () {
	this.reInit();
}