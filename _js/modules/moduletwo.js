// create module
var testmodule2 = function() {

	var testmodule2 = {};

	testmodule2.init = function() {
		console.log('testmodule2 initted...');
	};

	return testmodule2;
};

module.exports = testmodule2;
