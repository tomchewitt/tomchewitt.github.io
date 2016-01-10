/**
 * INIT
 */

require('./modules/MorphSVGPlugin.min.js');
require('./modules/native.history.js');

(function() {

	// VARS
	var postHeader,
		bg,
		gradient,
		headerHeight = 160,
		titleHeight = 400,
		hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('.sidebar'),
		linksArr,
		currentState = 1,
		manualStateChange = true,
		scrolled = false;

	linksInit();
	headerInit();
	videoInit();


	// VIDEOS
	function videoInit() {
		var video = document.querySelector('.video'),
			playButton = document.querySelector('.video-play');

		if (video != null) {
			video.controls = false;
			video.loop = false;

			playButton.onclick = function() {
				playButton.classList.add('JS_off');
				video.play();
			};

			video.onended = function(e) {
				playButton.classList.remove('JS_off');
			};
		}
	}


	// HEADERS
	function headerInit() {
		postHeader = document.querySelector('.post-header-content');
		bg = document.querySelector('.page-header');
		gradient = document.querySelector('.post-header-wrap .gradient');

		if (postHeader != null) {
			var postHeaderHeight = postHeader.clientHeight;
			postHeader.style.top = (400 - postHeader.clientHeight) / 2 + 'px';
		};
	}


	setInterval(function() {
		if (scrolled) {
			// code
			var winOffset = window.pageYOffset,
				gradientPercentage = ((winOffset / titleHeight) / 2.2) + 0.8,
				bgPercentage = 1 - (winOffset / headerHeight);

			if (bg != null) {
				if (winOffset <= headerHeight) {
					bg.style.opacity = bgPercentage;
				};
			};

			if (gradient != null) {
				if (winOffset <= titleHeight) {
					gradient.style.opacity = gradientPercentage;
				};
			};

			if (postHeader != null) {
				var headerOffset = (380 - (postHeader.clientHeight)) / 2 - 10,
					winx = window.innerWidth;

				if (winx > 789) {
					if (winOffset >= headerOffset) {
						postHeader.style.top = 'auto';
						postHeader.style.bottom = '60px';
						postHeader.style.position = 'absolute';
						postHeader.style.left = '12.5%';
						postHeader.style.width = '75%';
					} else {
						postHeader.style.top = (400 - postHeader.clientHeight) / 2 + 'px';
						postHeader.style.bottom = 'auto';
						postHeader.style.position = 'fixed';
						postHeader.style.left = '30%';
						postHeader.style.width = '60%';
					};
				} else {
					postHeader.style.position = 'absolute';
					postHeader.style.left = '12.5%';
					postHeader.style.width = '75%';
				};

			};
			scrolled = false;
		}
	}, 30);

	// SCROLL
	window.onscroll = function() {
		scrolled = true;
	};


	// MOBILE NAVIGATION
	hamburger.addEventListener('click', function() {
		sidebar.classList.toggle('JS_on');
	});


	// EXTERNAL LINKS
	function linksInit() {
		linksArr = document.querySelectorAll('a');

		for (var i = 0; i < linksArr.length; i++) {
			var a = new RegExp('/' + window.location.host + '/');
			if (!a.test(linksArr[i].href)) {
				linksArr[i].onclick = function(e) {
					e.preventDefault();

					var url = this.href;

					// twitter
					if ((this.href.indexOf('https://twitter.com/intent') > -1)) {
						var urltext = document.title.split(' | Tom Does Digital');
						urltext = encodeURIComponent(urltext);
						url = 'https://twitter.com/intent/tweet?text=' + urltext + '&url=' + window.location.href + '&via=tomchewitt';
					}

					window.open(url, '_blank');
				};
			};
		};
	};


})();
