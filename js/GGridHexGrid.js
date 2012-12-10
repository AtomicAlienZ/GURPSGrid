function GGridHexGrid (GGrid,gridCanvas,overlayCanvas,hexSize) {
	this._xoffset = 0;
	this._yoffset = 0;
	this._ggrid = GGrid;
	this._gridCanvas = gridCanvas;
	this._overlayCanvas = overlayCanvas;
	this._hexSize = hexSize;

	// Building all the hexes data needed
	this._hexSlopeHeight = Math.sin(Math.PI/6) * this._hexSize;
	this._hexSlopeWidth = Math.cos(Math.PI/6) * this._hexSize;

	this._hexSlopeTg = (this._hexSlopeHeight/this._hexSlopeWidth);
}

/**
 * Hex drawing by coordinates
 *
 * @param coordPoint
 * @param stroke
 * @param fill
 * @param canvas
 * @private
 */
GGridHexGrid.prototype._drawHex = function (coordPoint,stroke,fill,canvas) {
	// Defining top-left pixel
	var tlp = this._getHexRectTLCoords(coordPoint);

	canvas.drawPoly(
		[
			[Math.round(tlp.x() + this._hexSlopeWidth), Math.round(tlp.y())],
			[Math.round(tlp.x() + 2*this._hexSlopeWidth), Math.round(tlp.y() + this._hexSlopeHeight)],
			[Math.round(tlp.x() + 2*this._hexSlopeWidth), Math.round(tlp.y() + this._hexSlopeHeight + this._hexSize)],
			[Math.round(tlp.x() + this._hexSlopeWidth), Math.round(tlp.y() + 2*this._hexSlopeHeight + this._hexSize)],
			[Math.round(tlp.x()), Math.round(tlp.y() + this._hexSlopeHeight + this._hexSize)],
			[Math.round(tlp.x()), Math.round(tlp.y() + this._hexSlopeHeight)],
			[Math.round(tlp.x() + this._hexSlopeWidth), Math.round(tlp.y())]
		],
		stroke,
		fill
	);
}

GGridHexGrid.prototype._getHexRectTLCoords = function (coordPoint) {
	return new GGridCoordPoint(coordPoint.x()*2*this._hexSlopeWidth + (coordPoint.y() & 1) * this._hexSlopeWidth,coordPoint.y() * (this._hexSlopeHeight + this._hexSize));
}

GGridHexGrid.prototype.getHexCenter = function (coordPoint) {
	var retcoords = this._getHexRectTLCoords(coordPoint);
	retcoords.setX(retcoords.x() + this._hexSlopeWidth,true);
	retcoords.setY(retcoords.y() + this._hexSlopeHeight + (this._hexSize/2),true);

	return retcoords;
}

GGridHexGrid.prototype.drawHex = function (coordPoint,stroke,fill,canvas) {
	this._drawHex(coordPoint,stroke,fill,this._overlayCanvas);
}

GGridHexGrid.prototype.drawHexField = function (xbegin,ybegin,xend,yend,stroke,fill) {
	for (var i = xbegin; i < xend; i++) {
		for (var j = ybegin; j < yend; j++) {
			this._drawHex(new GGridCoordPoint(i,j),stroke,fill,this._gridCanvas);
		}
	}
}

GGridHexGrid.prototype.drawLine = function (from,to,stroke) {
	this._overlayCanvas.drawPoly([from,to],stroke);
}

GGridHexGrid.prototype.clearOverlay = function () {
	this._overlayCanvas.clear();
}

GGridHexGrid.prototype.getHexCoords = function (coordPoint) {
	// Defining section coordinates.
	// Refer to http://www.gamedev.net/page/resources/_/technical/game-programming/coordinates-in-hexagon-based-tile-maps-r1800
	var sectX = Math.floor(coordPoint.x() / (2*this._hexSlopeWidth));
	var sectY = Math.floor(coordPoint.y() / (this._hexSlopeHeight + this._hexSize));

	// Click coordinates within section
	var sectPxlX = coordPoint.x() % (2*this._hexSlopeWidth);
	var sectPxlY = coordPoint.y() % (this._hexSlopeHeight + this._hexSize);

	var hexX = 0;
	var hexY = 0;

	hexX = sectX;
	hexY = sectY;
	// Section is B-type section
	if (sectY & 1) {
		// Top triangle
		if (
			sectPxlY < this._hexSlopeTg * sectPxlX && // left side of triangle
				sectPxlY < -this._hexSlopeTg * sectPxlX + 2 * this._hexSlopeTg * this._hexSlopeWidth // right side of triangle
			) {
			hexY--;
		}
		// Left part
		else if (sectPxlX < this._hexSlopeWidth) {
			hexX--;
		}
	}
	else {
		// Left edge
		if (sectPxlY < (this._hexSlopeHeight - (this._hexSlopeTg * sectPxlX))) {
			hexX--;
			hexY--;
		}
		// Right edge
		else if (sectPxlY < ((this._hexSlopeTg * sectPxlX) - this._hexSlopeHeight)) {
			hexY--;
		}
	}

	return new GGridCoordPoint(hexX,hexY);
}

GGridHexGrid.prototype.getHexOwnWidth = function () {return 2*this._hexSlopeWidth}
GGridHexGrid.prototype.getHexOwnHeight = function () {return this._hexSlopeHeight + this._hexSize}