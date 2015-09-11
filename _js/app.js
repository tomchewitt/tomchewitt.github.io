/**
 * INIT
 */
var headings = require('./modules/headings.js');

(function() {

	headings.init();

	var hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('.sidebar');

	hamburger.addEventListener('click', function() {
		sidebar.classList.toggle('JS_on');
	});

})();
