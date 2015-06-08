define(function(require, exports, module) {
	/**
	 * angular主引导文件
	 * 所有controller, director, factory都会装配到此对象
	 * 可以将公共用到的常量放到这个，如地址、上下文、服务端URL，也可以将所有的URL放到一个单独的文件，
	 * 然后装载到一个常量中,如:
	 *
	 * var urls = require('urls');
	 *
	 * app.constant('URLS', urls)
	 *
	 * 后面使用angular的controller中会自动注入这个对象，无须再次引用。
	 *
	 */
	var ng = require('angularjs');
		//require('angular-touch');

	var HOST = '';
	
	var _hostname = window.location.hostname;
	if (_hostname == 'localhost' || _hostname == '10.50.102.23') {
    	HOST = 'http://10.17.228.54';
    }
	module.exports = ng.module('ow', [], function() {

	}).constant('URLS', {//这个对象可以是一个CMD模块
		HOST: HOST,
		//基金列表
		FUND_LIST : HOST + '/omm/finance/FundIndexAction.do?function=AjaxFundList',
		//新发基金列表
		FUND_LIST_NEW : HOST + '/omm/finance/FinanceIndexAction.do?function=NewFundList',
		//专项理财产品基金列表
		FUND_LIST_SPECIAL : HOST + '/omm/finance/FinanceIndexAction.do?function=SpecialProductList',
		//现金货币基金列表
		FUND_LIST_CASH : HOST + '/omm/finance/FinanceIndexAction.do?function=CashProductList',
		//产品搜索-搜索基金代码或名称
		FUND_SEARCH : HOST + '/omm/finance/FundIndexAction.do?function=SearchFund',
		//产品详情-基金详细信息-基金详情
		FUND_DETAIL : HOST + '/omm/finance/FundAction.do?function=PlainlicaiInfo',
		//产品详情-基金与基准对比走势图
		FUND_TREND : HOST + '/omm/user/CommonQuery.do?function=AjaxUnitFundFlash',
		//产品详情-基金详细信息-基金简介
		FUND_INTRODUCTION : HOST + '/omm/manage/ManageMoneyAction.do?function=Survey',
		//产品详情-基金详细信息-历史净值
		FUND_HISTORICAL_NET : HOST + '/omm/manage/ManageMoneyAction.do?function=Historicalnet',
		//产品详情-基金详细信息-基金公司
		FUND_COMPANY : HOST + '/omm/manage/ManageMoneyAction.do?function=Company',
		//产品详情-基金详细信息-基金分红
		FUND_BONUS : HOST + '/omm/manage/ManageMoneyAction.do?function=Bonus',
		//用户登录
		ACCOUNT_LOGIN : HOST + '/omm/user/MobileLoginAction.do',
		//获取云键盘布局信息
		CLOUD_SECURITY_KEYBOARD : HOST + '/omm/SecurityKeyboardomm.do',
		//判断用户是否登录 
		CHECK_LOGIN_STATUS: HOST + '/omm/user/CheckLoginAction.do',
		
		//-------------转帐相关
		//登录标识 判断code=901  未登陆或登陆超时,code=000 已登陆
		ACCOUNT_STATUS: HOST + '/omm/user/ClientState.do',
		//读取当前用户银行和帐号列表信息
		ACCOUNT_LIST: HOST + '/omm/user/UserCenter.do?function=Userbankall',
		//转帐前查询交易状 信息
		ACCOUNT_INFO: HOST + '/omm/user/UserCenter.do?function=RollOut&accountid=accountzr',
		//帐户间互转
		ACCOUNT_TRANSFER: HOST + '/omm/user/UserCenter.do?function=Conversion&currency=0',
		//银行转证券
		BANK_SECURITY_TRANSFER: HOST + '/omm/cash/CashTreasureAction.do?function=bankRecharge',
		//证券转银行
		SECURITY_BANK_TRANSFER: HOST + '/omm/user/UserCenter.do?function=RollOut',
		/**
		 * 前端地址
		 *
		 *
		 */
		//公募基金详情
		PUBLIC_FUND_DETAIL : 'fundChinaSift.html',
		//货币基金详情
		CASH_FUND_DETAIL : 'fundMonetary.html',
		//专项基金详情
		SPECIAL_FUND_DETAIL : 'pingSecurities.html',
		//用户中心
		USER_CENTER : 'myorder.html',
		//首页
		INDEX : 'index.html',
		//公募基金列表页
		PUBLIC_FUND_LIST : 'publicFundList.html',
		//专项基金列表
		SPECIAL_FUND_LIST : 'specialFundList.html',
		//登陆页面
		LOGIN : 'login.html',
		//搜索页面
		SEARCH : 'search.html',
		//银证转帐
		TRANSFER_TYPE: 'transferType.html'
	}).config(function($httpProvider) {  
	    $httpProvider.defaults.transformRequest = function(data) {  	
	    	$httpProvider.defaults.headers.post['angpang'] = 'angpang';  
     	};  
	});  
	
	

});

