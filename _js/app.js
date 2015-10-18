/**
 * INIT
 */

require('./modules/native.history.js');

(function() {

	// VARS
	var postHeader = document.querySelector('.post-header-content'),
		bg = document.querySelector('.page-header'),
		gradient = document.querySelector('.post-header-wrap .gradient'),
		headerHeight = 160,
		titleHeight = 400,
		hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('.sidebar'),
		linksArr = document.querySelectorAll('a'),
		currentState = 1,
		manualStateChange = true;


	// INIT
	if (postHeader != null) {
		var postHeaderHeight = postHeader.clientHeight;
		postHeader.style.top = (400 - postHeader.clientHeight) / 2 + 'px';
	};


	// SCROLL
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
	hamburger.addEventListener('click', function() {
		sidebar.classList.toggle('JS_on');
	});


	// EXTERNAL LINKS
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
		} else {
			linksArr[i].onclick = function(e) {
				e.preventDefault();

				var url = this.href;

				// DO AJAXY STUFF
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						// Success!
						var arr = request.responseText.split('<div class="content">'),
							title = arr[0].split('<title>'),
							title = title[1].split('</title>'),
							content = arr[1].split('</div><section class="footer">');

						document.querySelector('.content').innerHTML = content[0];

						manualStateChange = false;
						currentState ++;
						History.pushState({ state: currentState }, title[0], url);



					} else {
						window.open(this.href);
					}
				};

				request.onerror = function() {
					window.open(this.href);
				};

				request.send();
			};
		}
	};


	// Bind to StateChange Event
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();
        // console.log(State);
        if(manualStateChange == true){
			// BACK BUTTON WAS PRESSED
			currentState --;
			History.pushState({ state: currentState }, '', '');
	    }
	    manualStateChange = true;
    });


})();
