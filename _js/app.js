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
		manualStateChange = true;


	// INIT
	function headerInit() {
		postHeader = document.querySelector('.post-header-content');
		bg = document.querySelector('.page-header');
		gradient = document.querySelector('.post-header-wrap .gradient');

		if (postHeader != null) {
			var postHeaderHeight = postHeader.clientHeight;
			postHeader.style.top = (400 - postHeader.clientHeight) / 2 + 'px';
		};
	}
	headerInit();


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
			} else {
				linksArr[i].onclick = function(e) {
					e.preventDefault();

					var url = this.href;

					ajaxPage(url);
				};
			}
		};
	};
	linksInit();


	// Bind to StateChange Event
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        if (manualStateChange == true){
			// BACK BUTTON WAS PRESSED
			ajaxPage(State.url);
	    }
	    manualStateChange = true;
    });


    function changeContent(content) {

    	document.querySelector('.content').innerHTML = content;
    	headerInit();
    	linksInit();
  		var tri2 = makeTriangle(6000);
		TweenMax.to('.triangle', 1, {
			morphSVG: tri2,
			delay: 0.3,
			onComplete: contentChanged
		});
		TweenMax.to('.overlay', 0.8, {
			opacity: 0,
			delay: 0.3
		});
    }

    function contentChanged() {
    	TweenMax.set('.loader', {zIndex: -1});
    	TweenMax.set('.overlay', {zIndex: -1});
    }


    function ajaxPage(url) {

    	// DO AJAXY STUFF
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				var arr = request.responseText.split('<div class="content">'),
					title = arr[0].split('<title>'),
					title = title[1].split('</title>'),
					nearlycontent = arr[1].split('<section class="footer">');
					// content = nearlycontent[0].split()

				// TweenMax.to('.content', 0.4, {
				// 	opacity: 0,
				// 	ease: Power3.easeOut,
				// 	onComplete: contentAnimOutComplete,
				// 	onCompleteParams: [nearlycontent[0]]
				// });

				// ANIMATE

				var tri1 = makeTriangle(20),
					tri2 = makeTriangle(6000);

				document.querySelector('.triangle').setAttribute('d', tri2);
				TweenMax.set('.loader', {zIndex: 99});
				TweenMax.set('.overlay', {zIndex: 98});
				TweenMax.to('.triangle', 0.7, {
					morphSVG: tri1,
					zIndex: 99,
					onComplete: changeContent,
					onCompleteParams: [nearlycontent[0]]
				});
				TweenMax.to('.overlay', 0.9, {
					opacity: 0.9,
					zIndex: 98
				});


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
    }

    // LOADER
    function makeTriangle(a) {
		var winx = window.innerWidth,
			winy = window.innerHeight,
			h = (Math.sqrt(3) / 2) * a,
			b = { x: (winx * 0.6) - (a / 2) , y: (winy * 0.5) + (h / 2) },
			c = { x: (winx * 0.6) + (a / 2) , y: (winy * 0.5) + (h / 2) },
			d = { x: winx * 0.6 , y: (winy * 0.5) - (h / 2) },
			strRect = 'M0 0 L' + winx + ' 0 L' + winx + ' ' + winy + ' L0 ' + winy + ' z ',
			strTri = 'M' + d.x + ' ' + d.y + ' L' + b.x + ' ' + b.y + ' L' + c.x + ' ' + c.y + ' z';

		return strRect + strTri;
	}


})();
