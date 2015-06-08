define(function(require, exports, module){
	/**
	 * 定时器，倒计时指令
	 * 
	 * 
	 */
	
	var app = require('filter/pad');
	
	module.exports = app.directive('exTimer', ['$interval', function($interval){
		return {
			restrict: 'E',
			scope: {
				//结束时间
				end: '='
			},
			template: '<span class="timer-day">{{timer.day}}</span>天<span class="timer-hour">{{timer.hour|pad}}</span>小时<span class="timer-minute">{{timer.minute|pad}}</span>分钟{{timer.second|pad}}秒',
			link: function($scope, $elem, $attrs){
				var end = new Date($scope.end);
				
				var inter = $interval(function(){
						var now = new Date(),
							diff = +end-(+now);
						
						$scope.timer = _format(diff);
				}, 1000);
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