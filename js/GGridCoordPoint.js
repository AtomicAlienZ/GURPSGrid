/**
 * Class for coordinates point like hex coordinates or click event coordinates
 * @param x
 * @param y
 * @param round
 * @constructor
 */
function GGridCoordPoint (x, y, round) {
	this._x = 0;
	this._y = 0;

	if (typeof x != "undefined") {
		this.setX(x, round);
	}

	if (typeof y != "undefined") {
		this.setY(y, round);
	}
}

GGridCoordPoint.prototype.x = function () { return this._x; }

GGridCoordPoint.prototype.y = function () { return this._y; }

GGridCoordPoint.prototype.setX = function (value, round) {
	this._x = this._prepareCoordinate(value, round);
}

GGridCoordPoint.prototype.setY = function (value, round) {
	this._y = this._prepareCoordinate(value, round);
}

GGridCoordPoint.prototype._prepareCoordinate = function (value, round) {
	if (typeof value == 'undefined' || isNaN(value = parseFloat(value))) {
		throw 'CoordPoint setY error: value is not a number!';
	}

	return (typeof round != 'undefined' && round)?Math.round(value):value;
}