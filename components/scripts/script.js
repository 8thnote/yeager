$(function() {
	var topoffset = 43;

	var isTouch = 'ontouchstart' in document.documentElement;

	var wheight = $(window).height(); //get height of the window

	$('.fullheight').css('height', wheight);
	$('#about .fullheight').css('height', wheight - topoffset);

	$(window).resize(function() {
		var wheight = $(window).height(); //get height of the window
		$('.fullheight').css('height', wheight);
		$('#about .fullheight').css('height', wheight - topoffset);
	});

	//smooth scrolling
	$('a[href*=#]:not([href=#])').click(
		function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		    $('html,body').animate({
		      scrollTop: target.offset().top-topoffset
		    }, 1000);
		    return false;
		  } //target.length
		} //location hostname
	}); //on click

	//highlight navigation
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop() + topoffset + 1;
		$('nav li a').removeClass('active');

		if (windowpos > ($('#about').offset().top - 5)) {
			$('nav li a').removeClass('active');
			$('a[href$="#about"]').addClass('active');
		}

		if (windowpos > $('#gear').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#gear"]').addClass('active');
		}

		if (windowpos > $('#tournaments').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#tournaments"]').addClass('active');
		}

		if (windowpos > $('#contact').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#contact"]').addClass('active');
		}
	});

	//set up ScrollMagic
	var controller = new ScrollMagic({
		globalSceneOptions: {
			triggerHook: "onLeave"
		}
	});

	//pin the navigation
	var pin = new ScrollScene({
		triggerElement: '#nav',
	}).setPin('#nav').addTo(controller);

/*

	if(!isTouch) {
		//room animations
		var roomOrigin = {
			bottom: -700,
			opacity: 0,
			scale: 0
		}

		var roomDest = {
			repeat: 1,
			yoyo: true,
			bottom: 0,
			opacity: 1,
			scale: 1,
			ease: Back.easeOut
		}

		var roomtween = TweenMax.staggerFromTo(
			"#westminster .content",
			1, roomOrigin, roomDest);

		var pin = new ScrollScene({
			triggerElement: '#westminster',
			offset: -topoffset,
			duration: 500
		}).setPin('#westminster')
			.setTween(roomtween)
			.addTo(controller);

		//attractions animation
		var attractionstween = TweenMax.staggerFromTo('#attractions article', 1, { opacity: 0, scale: 0 }, {delay: 1, opacity: 1, scale: 1, ease: Back.easeOut});

		var scene = new ScrollScene({
			triggerElement: '#attractions',
			offset: -topoffset
		}).setTween(attractionstween)
			.addTo(controller);
	} //if NOT touch device
*/

}); //on load