define(function(require, exports, module){
	/**
	 * 页面数据渲染完成后执行回调
	 * 
	 * 
	 */
	var app = require('common/app');
	
	module.exports = app.directive('exRenderComplate', ['$parse', function($parse){
		return {
			restrict: 'A',
			scope: {
				//结束时间
				callback: '@exRenderComplate'
			},
			link: function($scope, $elem, $attrs){
				if($scope.$parent.$last){
					$parse($scope.callback)($scope.$parent.$parent).refresh();
				}
			}
		};
	}]);
});