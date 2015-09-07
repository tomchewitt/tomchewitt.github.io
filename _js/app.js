/**
 * INIT
 */
var mod = require('./modules/module.js');
var mod2 = require('./modules/moduletwo.js');

(function() {

	var hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('.sidebar');

	hamburger.addEventListener('click', function() {
		sidebar.classList.toggle('JS_on');
	});

})();
