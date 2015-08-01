(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * INIT
 */
var mod = require('./modules/module.js');
var mod2 = require('./modules/moduletwo.js');

(function() {
	console.log('script does stuff ?!?');

	// mod2.init();

})();

},{"./modules/module.js":2,"./modules/moduletwo.js":3}],2:[function(require,module,exports){
// create module
module.exports = function() {

	var testmodule = {};

	testmodule.init = function() {
		return console.log('testmodule initted...');
	};

	return testmodule;
};

},{}],3:[function(require,module,exports){
// create module
var testmodule2 = function() {

	var testmodule2 = {};

	testmodule2.init = function() {
		console.log('testmodule2 initted...');
	};

	return testmodule2;
};

module.exports = testmodule2;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfanMvYXBwLmpzIiwiX2pzL21vZHVsZXMvbW9kdWxlLmpzIiwiX2pzL21vZHVsZXMvbW9kdWxldHdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBJTklUXG4gKi9cbnZhciBtb2QgPSByZXF1aXJlKCcuL21vZHVsZXMvbW9kdWxlLmpzJyk7XG52YXIgbW9kMiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9tb2R1bGV0d28uanMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnc2NyaXB0IGRvZXMgc3R1ZmYgPyE/Jyk7XG5cblx0Ly8gbW9kMi5pbml0KCk7XG5cbn0pKCk7XG4iLCIvLyBjcmVhdGUgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZXN0bW9kdWxlID0ge307XG5cblx0dGVzdG1vZHVsZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNvbnNvbGUubG9nKCd0ZXN0bW9kdWxlIGluaXR0ZWQuLi4nKTtcblx0fTtcblxuXHRyZXR1cm4gdGVzdG1vZHVsZTtcbn07XG4iLCIvLyBjcmVhdGUgbW9kdWxlXG52YXIgdGVzdG1vZHVsZTIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgdGVzdG1vZHVsZTIgPSB7fTtcblxuXHR0ZXN0bW9kdWxlMi5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ3Rlc3Rtb2R1bGUyIGluaXR0ZWQuLi4nKTtcblx0fTtcblxuXHRyZXR1cm4gdGVzdG1vZHVsZTI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3Rtb2R1bGUyO1xuIl19
