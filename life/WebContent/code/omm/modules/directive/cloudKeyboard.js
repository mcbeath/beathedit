define(function(require, exports, module){
	/**
	 * 云键盘
	 * 
	 * 
	 */
	
	var app = require('common/app'),
		$ = require('zepto');
	
	require('ccsk');
	
	module.exports = app.directive('exCloudKeyboard', [function(){
		return {
			restrict: 'A',
			scope: {
				//键盘类型
				//大小写字母+数字+符号键盘:Standard
				//大小写字母+数字键盘:Normal
				//纯数字键盘:Number
				keyboardType: '@',
				securityUrl: '@',
				//是否初始化
				initialize: '='
			},
			link: function($scope, $elem, $attrs){
				var keyboardType = $scope.keyboardType || 'Standard',
					securityUrl = $scope.securityUrl;
				
				if(!securityUrl){ return; }
				
				$scope.$watch('initialize', function(val){
					if(val){
						//初始化云键盘
						$.ccsk_ready(function(){
							$.getCCSKeyPad(securityUrl, keyboardType).init({
								elementId: $attrs.id,
								placeholder: $attrs.placeholder || "请输入交易密码",
								length: +$attrs.maxlength,
								input_style:{
									width: +$attrs.width,
									height: +$attrs.height
								}
							});
						});
					}
				});
			}
		};
	}]);
	
	/**
	 * 时间转换，将毫秒数格式化
	 * 
	 * @return {
	 * 	year: 0,
	 * 	day: 1,
	 * 	hour: 2,
	 *  minute: 23,
	 *  seconed: 2,
	 *  millisecond:123
	 * }
	 */
	function _format(millisecond){
		var datatime = {
				 year: 0,
				 day: 0,
				 hour: 0,
				 minute: 0,
				 second: 0,
				 millisecond:0
	 		};
		
		if(millisecond< 1000){ 
			datatime.millisecond = millisecond;
			return datatime; 
		}
		
		var times = [
		            ['day', 1000*60*60*24],
		            ['hour', 1000*60*60],
		            ['minute', 1000*60],
		            ['second', 1000]
		            ];
		
		for(var i=0; i<times.length; i++){
			var current = times[i];
			
			if(millisecond>0 && millisecond>=current[1]){
				datatime[current[0]] = Math.floor(millisecond/current[1]);
				millisecond = millisecond - datatime[current[0]]*current[1];
			}
		}
		
		datatime.millisecond = millisecond;
		
		return datatime;
	}
	
});