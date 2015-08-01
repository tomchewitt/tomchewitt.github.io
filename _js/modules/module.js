// create module
module.exports = function() {

	var testmodule = {};

	testmodule.init = function() {
		return console.log('testmodule initted...');
	};

	return testmodule;
};
