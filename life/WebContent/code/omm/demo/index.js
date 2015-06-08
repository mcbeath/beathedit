if (document.attachEvent) {
  alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	var angular = require('angularjs');
    var App = require('common/config');
    var $ = require('zepto');
    var _ = require('underscore');
    var listField = require('common/listField')
    
    console.log(angular);	
	console.log(App);
	console.log($('#test'));
	var a = [];
	console.log(_.isEmpty(a));
	
	var listfield = new listField({
	                el : $('#listfield'),
	                options : [{
	                    text : '身份证',
	                    value : 0
	                }, {
	                    text : '居住证',
	                    value : 1
	                }, {
	                    text : '其它',
	                    value : 2
	                }]
		 		});
	console.log(listfield);
	
	var Core = require('common/core');		
	console.log(Core);
	
	//var RadioBox = require('common/radioBox');
	//是否投保
	/*
    radioboxList = new RadioBox({
        el : $('#radiobox'),
        options : ['投保', '不投保'],
        value : 1
    });
    radioboxList.onchange = function(value) {
    	console.log('--------');
    }
    */
   
	var Validate = require('common/formValidate');
	console.log(Validate.isDate('2015-05-02'));
	
	
	
	
});