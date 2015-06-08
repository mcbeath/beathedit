define(function(require, exports, module){
	/**
	 * 转帐操作相关
	 * 
	 */
	
	var app = require('common/app');

	module.exports = app.factory('TransferService', ['$http', 'URLS', function($http, urls){
		return {
			//查询当前用户帐户信息,根据登录
			getAccountList: function(params, callback){
				$http({
					url: urls.ACCOUNT_LIST, 
					params: params,
					method: 'GET'
				})
				.success(function(data){
					callback(data);
				});
			},
			//根据帐号Id查询信息
			getAccountInfoById: function(params, callback){
				$http({
					url: urls.ACCOUNT_INFO, 
					params: params,
					method: 'GET'
				})
				.success(function(data){
					callback(data);
				});
			},
			//帐户间转帐
			accountToAccount: function(params, callback){
				$http({
					url: urls.ACCOUNT_TRANSFER, 
					params: params,
					method: 'GET'
				})
				.success(function(data, status, headers){
					callback(data, status, headers);
				});
			},
			//银行转证券
			bankToSecurity: function(params, callback){
				$http({
					url: urls.BANK_SECURITY_TRANSFER, 
					params: params,
					method: 'GET'
				})
				.success(function(data, status, headers){
					callback(data, status, headers);
				});
			},
			//证券转银行
			securityToBank: function(params, callback){
				$http({
					url: urls.SECURITY_BANK_TRANSFER, 
					params: params,
					method: 'POST'
				})
				.success(function(data, status, headers){
					callback(data, status, headers);
				});
			}
			
		};
	}]);
});