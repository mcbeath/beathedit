define(function(require, exports, module){	
	var app = require('filter/indexFilter');
	app.directive('test',function(){
		return {
			template:'<p>this is a test</p>'
		}
	})
	module.exports = app;
})