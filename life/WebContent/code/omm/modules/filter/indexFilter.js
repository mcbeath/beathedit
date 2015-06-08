'use strict';

define(function(require,exports,module){
	var app = require('common/app');
	
	app.filter('interpolate', ['version', function(version) {
	    return function(text) {
	        return String(text).replace(/\%VERSION\%/mg, version);
	    }
    }])
    
	return app;
});