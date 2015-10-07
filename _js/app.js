/**
 * INIT
 */

(function() {

	// HEADERS
	var postHeader = document.querySelector('.post-header-content'),
		bg = document.querySelector('.page-header'),
		gradient = document.querySelector('.post-header-wrap .gradient'),
		headerHeight = 160,
		titleHeight = 400;

	// Initial setup
	if (postHeader != null) {
		var postHeaderHeight = postHeader.clientHeight;
		postHeader.style.top = (400 - postHeader.clientHeight) / 2 + 'px';
	};

	window.onscroll = function() {
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
			var headerOffset = (380 - (postHeader.clientHeight)) / 2 - 10;

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
		};
	};


	// MOBILE NAVIGATION
	var hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('.sidebar');

	hamburger.addEventListener('click', function() {
		sidebar.classList.toggle('JS_on');
	});


	// EXTERNAL LINKS
	var linksArr = document.querySelectorAll('a');

	for (var i = 0; i < linksArr.length; i++) {
		var a = new RegExp('/' + window.location.host + '/');
		if (!a.test(linksArr[i].href)) {
			linksArr[i].onclick = function(e) {
				e.preventDefault();

				var url = this.href;

				// twitter
				if ((this.href.indexOf('https://twitter.com/intent') > -1)) {
					var urltext = document.title.split(' | Tom Does Digital')
					urltext = encodeURIComponent(urltext);
					url = 'https://twitter.com/intent/tweet?text=' + urltext + '&url=' + window.location.href + '&via=tomchewitt';
				}

				window.open(url, '_blank');
			};
		}
	};


})();
