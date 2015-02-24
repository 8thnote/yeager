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

	//One Page Scroll (jQuery plugin)
	$("#mainWrap").onepage_scroll({
	   sectionContainer: ".fullheight",     // sectionContainer accepts any kind of selector in case you don't want to use section
	   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
	                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
	   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
	   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
	   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
	   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
	   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
	   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
	   keyboard: true,                  // You can activate the keyboard controls
	   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
	                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
	                                    // the browser's width is less than 600, the fallback will kick in.
	   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
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