define(function(require, exports, module){
	/**
	 * 帐号管理
	 * 
	 */
	
	var app = require('common/app');
	
	module.exports = app.factory('AccountService', ['$http', 'URLS', function($http, urls){
		return {
			//搜索基金
			getBranchInfo: function(params, callback){
				$http({
						url: urls.ACCOUNT_LOGIN, 
						params: params,
						method: 'GET'
					})
					.success(function(data){
						callback(data);
					});
			},
			//登录
			login: function(params, callback){
				$http({
						url: urls.ACCOUNT_LOGIN, 
						params: params,
						method: 'POST'
					})
					.success(function(data){
						callback(data);
					});
			},
			//检查登录态
			checkLogin: function(params, callback){
				$http({
					url: urls.CHECK_LOGIN_STATUS, 
					params: params,
					method: 'POST'
				})
				.success(function(data){
					callback(data);
				});
			}
		};
	}]);
});