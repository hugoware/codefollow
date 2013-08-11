window.setTimeout( function() {
	var canvas = document.getElementById('canvas')
		, context = canvas.getContext('2d');

	// updates the view
	function draw() {

		// first block
		context.fillStyle = '#f00';
		context.fillRect( 100, 50, 100, 50 );

		window.setTimeout( function() {
			context.fillStyle = '#0f0';
			context.fillRect( 0, 0, 100, 50 );
		}, 1000 );

		window.setTimeout( function() {
			context.fillStyle = '#00f';
			context.fillRect( 0, 50, 100, 50 );
		}, 2000 );

		window.setTimeout( function() {
			context.fillStyle = '#ff0';
			context.fillRect( 100, 0, 100, 50 );
		}, 3000 );

		window.setTimeout( function() {
			canvas.width = canvas.width;
		}, 4000 );

	}

	window.setInterval( draw, 5000 );
	draw();


}, 500 );