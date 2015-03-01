$(function() {
	var topoffset = 43;

	var isTouch = 'ontouchstart' in document.documentElement;

	var wheight = $(window).height(); //get height of the window

	//set height of fullheight class to window height only for 650px width and above
	if ($(window).width() >= 650) {
		$('.fullheight').css('height', wheight);
	};
	//set again when window is resized
	$(window).resize(function() {
		if ($(window).width() >= 650) {
			var wheight = $(window).height(); //get height of the window
			$('.fullheight').css('height', wheight);
		}
	});
	//set height of intro fullheight for all window sizes
	$('#intro .fullheight').css('height', wheight);
	$(window).resize(function() {
		$('#intro .fullheight').css('height', wheight);
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

	//focus on form
	$('a[href$="#contact"]').click(function() {
		$('#name').focus();
	});

	//mobile nav
	$('.fa-bars').click(function() {
		$('nav ul').toggle();
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

	if(!isTouch) {
		//box animations
		var aboutTween = TweenMax.from(
			"#about .content", 0.6, {css:{transform:"translateX(3000px)",opacity:0}, ease:Expo.easeOut});

		var pin = new ScrollScene({
			triggerElement: '#about',
			offset: -topoffset,
			reverse: false
		}).setTween(aboutTween).addTo(controller);

		var gearTween = TweenMax.from(
			"#gear .content", 0.6, {css:{transform:"translateX(-3000px)",opacity:0}, ease:Expo.easeOut});

		var pin = new ScrollScene({
			triggerElement: '#gear',
			offset: -topoffset,
			reverse: false
		}).setTween(gearTween).addTo(controller);

		var tournTween = TweenMax.from(
			"#tournaments .content", 0.6, {css:{transform:"translateX(3000px)",opacity:0}, ease:Expo.easeOut});

		var pin = new ScrollScene({
			triggerElement: '#tournaments',
			offset: -topoffset,
			reverse: false
		}).setTween(tournTween).addTo(controller);

		var contactTween = TweenMax.from(
			"#contact .content", 0.8, {css:{transform:"translateY(1000px)",opacity:0}, ease:Expo.easeOut});

		var pin = new ScrollScene({
			triggerElement: '#contact',
			offset: -topoffset,
			reverse: false
		}).setTween(contactTween).addTo(controller);
	} //if NOT touch device

}); //on load