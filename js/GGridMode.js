function GGridMode () {
	this._ggrid = null;
	this._name = '';
}

GGridMode.prototype.modeStart = function () {/* initializings and building mode options and stuff */}
GGridMode.prototype.modeEvent = function (coords,type,e) {/* mode events processor */}
GGridMode.prototype.modeEnd = function () {/* deinitializings */}

GGridMode.prototype.getName = function () {
	return this._name;
}

GGridMode.prototype.setGGrid = function (GGrid) {
	this._ggrid = GGrid;
}