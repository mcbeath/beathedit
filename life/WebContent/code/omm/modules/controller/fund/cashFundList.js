define(function(require, exports, module){
	/**
	 * 现金基金主要逻辑
	 * 包括推荐、各列表页显示等。
	 * 
	 * 
	 * 
	 */
	var ng = require('angularjs'),
		app = require('directive/timer');
	
	//加载基本服务接口
	require('models/fundService');
	
	app.controller('CashFundListController', ['FundService', '$scope', 'URLS', function(FundService, $scope, urls){
		
		var fund = {
				//页面上tab显示状态
				//根据tabs菜单的顺序位置来定
				status: 1,
				//切换菜单动作
				switchTab: function(index){
					var self = this;
					
					//读取股票型公募基金信息
					if(self.status == 2){
						_queryStockPublicFund($scope, {
							fundType: 2,
							type: 'stockPublicFunds',
							curPage: 1
						});
					}
					
					if(self.status == 3){
						_queryStockPublicFund($scope, {
							fundType: 3,
							type: 'mixedPublicFunds',
							curPage: 1
						});
					}
					
					if(self.status == 4){
						_queryStockPublicFund($scope, {
							fundType: 4,
							type: 'bondPublicFunds',
							curPage: 1
						});
					}
					
					if(self.status == 5){
						_queryStockPublicFund($scope, {
							fundType: 5,
							type: 'newPublicFunds',
							curPage: 1
						});
					}
					
				}
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