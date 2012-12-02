// HEX TESTING
$(function(){
	var viewCanvas = document.getElementById('canvas_grid');
	var ctx = viewCanvas.getContext("2d");
	var viewCanvas2 = document.getElementById('canvas_grid2');
	var ctx2 = viewCanvas2.getContext("2d");

	function makeline (fromx, fromy, tox, toy) {
		ctx.beginPath();
		ctx.moveTo(fromx,fromy);
		ctx.lineTo(tox,toy);
		ctx.stroke();
	}

	// in pixels
	var s = 50;
	var h = Math.sin(Math.PI/6) * s;
	var r = Math.cos(Math.PI/6) * s;
	var b = s + 2 * h;
	var w = 2 * r;

	function drawHex (x,y,ctx) {
		console.log('HEX: ',x,y);

		// Tile drawing
		// Defining top-left pixel
		var tlx = x*2*r + (y & 1) * r;
		var tly = y * (h + s);

		// Drawing hex
		ctx.beginPath();
		ctx.moveTo(tlx,tly);

		ctx.moveTo(tlx + r,tly);
		ctx.lineTo(tlx + 2*r, tly + h);
		ctx.lineTo(tlx + 2*r, tly + h + s);
		ctx.lineTo(tlx + r, tly + 2*h + s);
		ctx.lineTo(tlx, tly + h + s);
		ctx.lineTo(tlx, tly + h);
		ctx.lineTo(tlx + r,tly);

		ctx.stroke();
	}

	for (var x = 0; x < 7; x++) {
		for (var y = 0; y < 7; y++) {
			drawHex(x,y,ctx);
		}
	}

	// Initial functions bindings
	$('#canvas_grid2').mousemove(function (e) {
		$this = $(this);
		var offset = $this.offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		// Defining section coordinates.
		// Refer to http://www.gamedev.net/page/resources/_/technical/game-programming/coordinates-in-hexagon-based-tile-maps-r1800
		var sectX = Math.floor(x / (2*r));
		var sectY = Math.floor(y / (h + s));

		// Click coordinates within section
		var sectPxlX = x % (2*r);
		var sectPxlY = y % (h + s);

		var hexX = 0;
		var hexY = 0;

		var m = (h/r);

		hexX = sectX;
		hexY = sectY;
		// Section is B-type section
		if (sectY & 1) {
			// Top triangle
			if (
				sectPxlY < m * sectPxlX && // left side of triangle
				sectPxlY < -m * sectPxlX + 2 * m * r // right side of triangle
			) {
				hexY--;
			}
			// Left part
			else if (sectPxlX < r) {
				hexX--;
			}
		}
		else {
			// Left edge
			if (sectPxlY < (h - (m * sectPxlX))) {
				hexX--;
				hexY--;
			}
			// Right edge
			else if (sectPxlY < ((m * sectPxlX) - h)) {
				hexY--;
			}
		}

		ctx2.lineWidth = 3;
		ctx2.strokeStyle = '#ff0000';

		ctx2.clearRect(0, 0, 1000, 600);
		drawHex(hexX,hexY,ctx2);
	});

	$('.js-toolbar').click(function (e) {
		e.stopPropagation();
	});

	$('.js-toolbar_closebutton').click(function (e) {
		$(this).parents('.js-toolbar').find('.js-toolbar_content').toggle();
	});
});