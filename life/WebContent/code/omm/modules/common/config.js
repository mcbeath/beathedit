define('common/config',function(require, exports, module) {  
	/**
	 * 定义整体变量
	 */
	var App = new Object();
	
	if(!navigator.cookieEnabled){
        alert('请确认您当前的浏览器已开启Cookie，如果您是IOS设备，请在  设置=>safari=>接受Cookie 中选择“总是”');
    }
    
    /**
     * 常量定义
     */
    var ua = navigator.userAgent.toUpperCase();
    App.userAgent = ua;
    
    // 当前环境是否为Android平台
    App.IS_ANDROID = ua.indexOf('ANDROID') != -1;
    // 当前环境是否为IOS平台
    App.IS_IOS = ua.indexOf('IPHONE') != -1 || ua.indexOf('IPAD') != -1;
	// 当前是否微信环境
	App.IS_WEIXIN = ua.indexOf('MICROMESSENGER') != -1;
	// 当前环境为windows phone版本 （暂时不考虑兼容）
	App.IsWP = (ua.indexOf('WINDOWS') != -1 && ua.indexOf('PHONE') != -1);
	// 当前环境是否为本地Native环境
    //App.IS_NATIVE = (App.IS_ANDROID || App.IS_IOS) ? true : false;
	
	App.IS_NATIVE = false;		//未上客户端之前，值暂时设置为false
	
	// 媒体来源
	App.MediaSource = {};
	
	// 服务器地址
    App.ServerHost = '/';
    
	// 是否为开发环境
    App.IS_DEV = false;
    if (window.location.host.indexOf('pingan.com') != -1) {
    	App.IS_DEV = false;	
    }
    var _hostname = window.location.hostname;
    if (_hostname == 'localhost' || _hostname == '10.50.102.23') {
    	App.ServerHost = 'http://10.17.228.54/';
    }
    
    // 公共提示信息
    App.lang = {
        serviceError : '系统发生错误, 请稍后重试！'
    }
    
    /**
     * Web Service接口定义
     */
    var webServiceUrls = {
		//基金详细信息-基金详情 
		fundAction : 'omm/finance/FundAction.do',
		//基金与基准对比走势图
		commonQuery : 'omm/user/CommonQuery.do',
		//基金详细信息：基金简介（Survey）、历史净值（Historicalnet）、基金公司（Company）、基金分红（Bonus）
        manageMoney : 'omm/manage/ManageMoneyAction.do',
        //专项理财产品详情
        gaoDuanLICai : 'omm/manage/GaoDuanLICaiManagerAction.do',
		//查询一个产品的持仓
		queryProductAsset : 'omm/user/QueryProductAssetAction.do',
        //获取资金帐户信息
        myAssetsTotal : 'omm/user/MyAssetDetails.do?function=AjaxMyAssets',
        
        //获取理财产品信息
        myAssetsList : 'omm/user/MyAssetDetails.do?function=AjaxMyBuyjijin',
        
        //我的订单——切换
        myOrder1 : 'omm/user/OrderAction.do?function=FindBusiness&productdata=5&producttype=1',
        myOrder2 : 'omm/user/OrderAction.do?function=FindBusiness&productdata=5&producttype=2',
        myOrder3 : 'omm/user/OrderAction.do?function=FindBusiness&productdata=5&producttype=3',
        myOrder4 : 'omm/user/OrderAction.do?function=FindBusiness&productdata=5&producttype=4',
        myOrder5 : 'omm/user/OrderAction.do?function=FindBusiness&productdata=5&producttype=5',
        
        //产品购买
        proBuySub : 'omm/manage/BuyMMAction.do?function=ToPlainOrder',
        
        //产品购买
        proBuy : 'omm/manage/BuyMMAction.do?function=PlainToBuy',
        proTotal : 'omm/user/MyAssetDetails.do?function=AjaxMyAssets',
        
        //产品赎回提交
         redSub : 'omm/user/UserCenter.do?function=ZqCallable',
        //查询一个产品的持仓
        proAsset:'omm/user/QueryProductAssetAction.do',
        //
        buyMMAction : 'omm/manage/BuyMMAction.do',
        //判断用户是否已经登陆
        checkLoginAction : 'omm/user/CheckLoginAction.do',
		//检查用户风险等级是否满足产品购买条件
		isSatisfy : 'omm/manage/BuyMMAction.do?function=IsSatisfy',
		//购买高端理财
		toGdBuy : 'omm/manage/BuyMMAction.do?function=ToGdBuy',
		//高端理财购买确认
		toGdOrder : 'omm/manage/BuyMMAction.do?function=ToGdOrder',
		//撤单
		cancelOrder : 'omm/manage/BuyMMAction.do?function=CancelOrder',
		//设置保留额度
		setLimit: '/omm/cash/CashTreasureAction?function=setLimit',
		//
		
		
    } 
    
    App.getWebServiceUrl = function(name) {
        return App.ServerHost + webServiceUrls[name];
    }
    
    module.exports = App;
});	