$(function(){
	// initializing everything
	GGrid.init();

	// Registering modes
	GGrid.registerMode(new GGridModeHighlightHex());
	GGrid.registerMode(new GGridModeDistanceMeter());

	// Binding mode switchings
	$('.js-GGrid-mode_button').on('click',function () {
		var $this = $(this);

		if (typeof $this.attr('data-mode') == "undefined") {
			return;
		}

		$('.js-GGrid-mode_button').removeClass('b-GGrid-toolbar_button__active');
		if (GGrid.getCurrentModeName() == $this.attr('data-mode')) {
			GGrid.deactivateCurrentMode();
		}
		else {
			$this.addClass('b-GGrid-toolbar_button__active');
			GGrid.activateMode($this.attr('data-mode'));
		}
	});

	$('body2').on('click',function (e) {
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

	$('.js-toolbar').on('click mousemove',function (e) {
		e.stopPropagation();
	});

	$('.js-toolbar_closebutton').click(function (e) {
		var content = $(this).parents('.js-toolbar').find('.js-toolbar_content')
		content.toggle();
		if (content.is(':visible')) {
			$(this).removeClass('b-GGrid-toolbar_closebutton__closed');
		}
		else {
			$(this).addClass('b-GGrid-toolbar_closebutton__closed');
		}
	});
});