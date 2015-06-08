define(function(require, exports, module){	
	var app = require('filter/detailsFilter');
	  //实现画图
	  app.directive('chartView',function(){
	  	 return {
	  	 	restrict:'A',
	  	 	scope:false,
	  	 	controller:function($scope,$element,$attrs,$transclude){
	  	 		//监督$scope.option的变化，初始化时候值为undefined,调用接口之后会重新赋值
	  	 		$scope.$watch('option',function(newVal,oldVal){		
	  	 			if(newVal){
			  	 		var echarts = require('echart');
			  	 		var myChart = echarts.init(document.getElementById($attrs.id));
			  	 		myChart.setOption($scope.option);
	  	 			}
	  	 		});
	  	 	}
	  	 }
	  });
	 app.directive('fundContent', function() {
		return {
			restrict: 'AE',
			replace: true,
			scope: {
				content2:'=expanderCon'		//创建一个本地作用域属性，用于存放返回具体的内容，这个具体内容来自于expander-con绑定的内容
			},
			controller:function($scope,$rootScope,$element,$attrs){
				var t = angular.element(document.getElementById('funContains')); 
				$rootScope.$watch('content',function(val){
					t.append($rootScope.content);
				})
			}
			//template: '<div>{{content2}}</div>'
		};
	});
	
	// app.directive('expander', function(){
		// return {
			// restrict: 'EA',
			// replace: true,
			// transclude: true,
			// scope: { title:'=expanderTitle' }, template: '<div>' +
			// '<div class="title" ng-click="toggle()">{{title}}</div>' +
			// '<div class="body" ng-show="showMe" ng-transclude></div>' +
			// '</div>',
			// link: function(scope, element, attrs) {
				// scope.showMe = false;
				// scope.toggle = function toggle() {
				// scope.showMe = !scope.showMe;
			// }
		// }
	// }
	
	module.exports = app;
})