define(function(require, exports, module){
	/**
	 * 基金相关服务
	 * 
	 * 服务器异常后会返回如下格式的数据：
	 * {"errorMessage":"Exception Class:java.lang.NumberFormatException, ErrorMessage:For input string: \"aa21233\"","returnCode":"-999"}
	 */
	
	var app = require('common/app');
	
	module.exports = app.factory('FundService', ['$http', 'URLS', function($http, urls){
		return {
			//获取股票类型的基金列表
			getStockFundList: function(params, callback){
				$http({
						url: urls.FUND_LIST, 
						params: params
					})
					.success(function(data){
						callback(data);
					});
			},
			//新发基金
			getNewFundList: function(params, callback){
				$http({
						url: urls.FUND_LIST_NEW, 
						params: params
					})
					.success(function(data){
						callback(data);
					});
			},
			//专项理财产品-列表
			getSpecialFundList: function(params, callback){
				$http({
						url: urls.FUND_LIST_SPECIAL, 
						params: params
					})
					.success(function(data){
						callback(data);
					});
			},
			//现金货币基金列表
			getCashFundList: function(params, callback){
				$http({
						url: urls.FUND_LIST_CASH, 
						params: params
					})
					.success(function(data){
						callback(data);
					});
			},
			//搜索基金
			search: function(params, callback){
				$http({
						url: urls.FUND_SEARCH, 
						params: params
					})
					.success(function(data){
						callback(data);
					});
			}
		};
	}]);
});