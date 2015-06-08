define(function(require, exports, module){
	/**
	 * 范围校验
	 * 
	 * 
	 */
	
	var app = require('common/app');
	
	module.exports = app.directive('exRangeValidator', [function(){
		return {
			require: '?ngModel',
			scope: {
				min: '@',
				max: '@'
			},
			link: function($scope, $elem, $attrs, $controller){
				$controller.$parsers.push(function(val){
					var min = $scope.min || 0,
					max = $scope.max || 0,
					name = $attrs.name;
					
					if(/^(?:[1-9]\d{0,8}(?:\.\d{1,2})?|0\.\d{1,2})$/.test(val) && +val<=+max && +val>=+min){
						$controller.$setValidity(name, true);
						return val;
					}else{
						$controller.$setValidity(name, false);
						return undefined;
					}
				});
			}
		};
	}]);
});