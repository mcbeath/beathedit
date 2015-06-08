define(function(require, exports, module){
	/**
	 * 新发基金主要逻辑
	 * 包括推荐、各列表页显示等。
	 * 
	 * 
	 * 
	 */
	var ng = require('angularjs'),
		app = require('directive/timer');
	
	//加载基本服务接口
	require('models/fundService');
	
	app.controller('NewFundListController', ['FundService', '$scope', 'URLS', function(FundService, $scope, urls){
		
		var fund = {
		};
		
		$scope.fund = fund;
		
		/**
		 * 加载公募基金列表
		 * 
		 * 
		 */
		function _queryStockPublicFund($scope, params){
			var options = {
				function: 'AjaxFundList'
			};
			
			ng.extend(options, params);
			FundService.getStockFundList(options, function(data){
				if(data.resultCode){ alert('系统异常');return; }
				$scope[options.type] = data.dbPage.data;
			});
		}
		
	}]);
	
	
	//导出公共方法，启动angular,一个页面启动一次。
	exports.run = function(){
		//启动
		ng.element(window.document).ready(function(){
			ng.bootstrap(document, ['ow'])
		});
	}
	
});