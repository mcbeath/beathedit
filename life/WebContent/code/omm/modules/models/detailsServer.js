define(function(require, exports, module) {
	//实现一个最简单的service
	var app = require('filter/detailsFilter'), Conf = require('common/config');

	app.factory('detailService', function($http) {
		var gitHuburl = 'https://api.github.com', githubUsername;

		var runFundAction = function(send) {
			return $http({
				method : 'GET',
				url : Conf.getWebServiceUrl('fundAction'),
				params : send
			});
		}
		var runManageMoney = function(send) {
			return $http({
				method : 'GET',
				url : Conf.getWebServiceUrl('manageMoney'),
				params : send
			});
		}
		var runCommonQuery = function(send) {
			return $http({
				method : 'GET',
				url : Conf.getWebServiceUrl('commonQuery'),
				params :send
			});
		}
		var runGaoDuanLICai = function(send){
			return $http({
				method : 'GET',
				url:Conf.getWebServiceUrl('gaoDuanLICai'),
				params :send
			});
		}
		var runCheckLogin = function(send){
			return $http({
				method : 'GET',
				url:Conf.getWebServiceUrl('checkLoginAction'),
				params :send
			});
		}
		var runIsSatisfy = function(send){
			return $http({
				method : 'GET',
				url:Conf.getWebServiceUrl('isSatisfy'),
				params :send
			});
		}
		var runIsLogin = function(send){
			return $http({
				method : 'GET',
				url:Conf.getWebServiceUrl('checkLoginAction'),
				params :send
			});
		}
		var runQueryAsset = function(send){
			return $http({
				method : 'GET',
				url:Conf.getWebServiceUrl('queryProductAsset'),
				params :send
			});
		}
		return {
			//基金详细信息-基金详情 
			getFundAction : function(param) {
				return runFundAction(param);
			},
			//基金详细信息：基金简介（Survey）、历史净值（Historicalnet）、基金公司（Company）、基金分红（Bonus）
			getManageMoney : function(param) {
				return runManageMoney(param);
			},
			//基金与基准对比走势图
			getCommonQuery : function(param) {
				return runCommonQuery(param);
			},
			//专项理财产品详情
			getGaoDuanLICai : function(param){
				return runGaoDuanLICai(param);
			},
			//判断用户是否已经登陆
			checkLoginStatus : function(param){
				return runCheckLogin(param);
			},
			//检查用户风险等级是否满足产品购买条件
			checkSatisfy : function(param){
				return runIsSatisfy(param);
			},
			//查询一个产品的持仓
			queryProAssets : function(param){
				return runQueryAsset(param);
			},
			setUserName : function(username) {
				githubUsername = username;
			}
			
		}
	})
	module.exports = app;

})