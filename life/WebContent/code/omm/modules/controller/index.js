if (document.attachEvent) {
	alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	//引入外部模块
	var ng = require('angularjs'), Conf = require('common/config'), Com = require('common/common'), Nav=require('common/native'), Nav=require('common/native'), _ = require('underscore'), app = require('directive/indexDirect')
	require('models/detailsServer');
	
	//模板名称列表:key值必须与模板的k保持一致
	var tpl = {
		'1' : 'one.tpl.html',
		"2" : 'two.tpl.html',
		"3" : 'three.tpl.html',
		"4" : "four.tpl.html",
		"5" : "five.tpl.html",
		"6" : "six.tpl.html",
		"7" : "seven.tpl.html",
		"8" : "eight.tpl.html",
		"9" : "nine.tpl.html"
	};

	//主控制器
	app.controller('index', function($scope,$rootScope) {
		//产品配置
		/**
		 * type取值： fund(普通基金及货币基金)、fundMoney(货币基金)、special(专项理财固定收益)、specialFloat(专项理财：浮动收益)
		 */
		var items = $scope.items = [{
				"code" : "519692",		//产品编号
				"tpl" : tpl[1],			//采用那一套模板
				"type" : "fund"			//具体类型，区别是基金还是固收
			}, {
				"code" : "S00006",
				"tpl" : tpl[2],
				"type" : "special"
			},{
				"code" : "202011",
				"tpl" : tpl[3],
				"type" : "fund"
			},{
				"code" : "001001",
				"tpl" : tpl[4],
				"type" : "fund"
			},{
				"code" : "100016",
				"tpl" : tpl[5],
				"type" : "fund"
			},{
				"code" : "118002",
				"tpl" : tpl[6],
				"type" : "fund"
			},{
				"code" : "166005",
				"tpl" : tpl[7],
				"type" : "fund"
			},{
				"code" : "486002",
				"tpl" : tpl[8],
				"type" : "fund"
			}
			];
	});
	
	//判断是否已经登陆了
	app.controller('checkLogin',['$scope','$rootScope','detailService',function($scope,$rootScope,detailService){
		var isLogin = false;
		detailService.checkLoginStatus({}).success(function(data, status, headers, config){
			if(status == 200 && data.hasLogin == true){
				isLogin = true;
			}
		}).error(function(data, status, headers, config){
			
		});
		$scope.toAssets = function(){
			var targetUrl = window.location.origin+'/omm/myAssets.html';
			if(isLogin == true){
				window.location.href = 'myAssets.html';
			}else{
				window.location.href = 'login.html?target='+targetUrl;
			}
		}
		$scope.myOrder = function(){
			var targetUrl = window.location.origin+'/omm/myorder.html';
			if(isLogin == true){
				window.location.href = 'myorder.html';
			}else{
				window.location.href = 'login.html?target='+targetUrl;
			}
		}
		$scope.myActivity = function(){
			alert('活动页面紧张开发中...')
		}
	}]);
	
	//首页相关模板的处理
	app.controller('renderIndex', ['$scope', '$rootScope', 'detailService', 'URLS',
	function($scope, $rootScope, detailService, urls) {
		var curItem = $scope.item;
		//当前正在执行的产品
		if (_.isEmpty(curItem.code)) {
			alert('当前产品不存在');
			return;
		}
		//针对基金的处理
		if (curItem.type == 'fund' || curItem.type == 'fundMoney') {
			var _sendData = {
				'productno' : curItem.code,
				'function' : 'PlainlicaiInfo'
			}
			//从接口中返回相关的详情数据
			detailService.getFundAction(_sendData).success(function(data, status, headers, config) {
				if (status == 200) {//如果成功返回
					if (data.datainfo) {
						var key = getKey(curItem.tpl);	//获取到key值
						if(key){
							$scope[key] = formatData(data);
						}else{
							alert('获取key值出错');	
						}
					} else {
						errorBack(curItem.code + '产品无详细信息返回');
					}
				} else {
					errorBack(data);
				}
			}).error(function(data, status, headers, config) {
				errorBack(data);
			})
			var errorBack = function(data) {
				console.log(data);
			}
			//格式化数据
			var formatData = function(data) {
				var df = data.datainfo;
				var dx = data.exdaterow;
				var rdata = {
							"name" : "", 	  		//产品名称
							"productNo" : "", 		//产品编号
							"threeMonth" : "", 		//近3个月涨幅
							"sixMonth" : "", 		//近6个月涨幅
							"beginMoney" : "", 		//起购金额
							"openSale" : "", 		//开售日期
							"sevenRate" : "", 		//7日年化收益
							"yearRate" : "", 		//年化收益率
							"limitMonth" : "", 		//理财限期
							"completedRate" : "", 	//已完成比例
							"surplus" : {			//剩余时间
								"day" : "", 		//天
								"hour" : "", 		//时
								"min" : "", 		//分
								"second" : "" 		//秒
							},
							"amount" : "", 			//投资金额
							"adviser" : "", 		//投资顾问
							"comment" : "", 		//点评
							"overRate" : "", 		//力争大幅超越行业水平
							"beginTime" : {			//距离发布时间
								"day" : "", 		//天
								"hour" : "", 		//时
								"min" : "", 		//分
								"second" : "" 		//秒
							}
						};	
				rdata.name = df.name;
				rdata.productNo = df.product_no;
				rdata.threeMonth = !_.isEmpty(dx) ? dx.rrinsinglemonth : "";
				rdata.sixMonth = !_.isEmpty(dx) ? dx.rrinsixmonth:"";
				rdata.beginMoney = df.minimum_cost+df.monenyname;
				rdata.openSale = df.open_sale;
				rdata.sevenRate = df.laskweek;
				rdata.yearRate = "1.0";
				rdata.limitMonth = "3个月";
				rdata.completedRate = "50";
				rdata.surplus = {
					"day" : "4",
					"hour" : "2",
					"min" : "35",
					"second" : "42"
				};
				rdata.amount = "1000";
				rdata.adviser = "深商所";
				rdata.comment = "this is a test";
				rdata.overRate = "20";
				rdata.beginTime = {
					"day" : "5",
					"hour" : "4",
					"min" : "36",
					"second" : "25"
				}
				return rdata;
			}
			//针对固收的处理
		} else if (curItem.type == 'special' || curItem.type == 'specialFloat') {
			var _sendData = {
				"productno" : curItem.code,
				"function" : 'GdDetails'
			}
			//从接口中返回相关的详情数据
			detailService.getGaoDuanLICai(_sendData).success(function(data, status, headers, config) {
				if (status == 200) {//如果成功返回
					specialCall(data);
				} else {
					specialError(data);
				}
			}).error(function(data, status, headers, config) {
				specialError(data);
			})
			var specialCall = function(response) {
				var key = getKey(curItem.tpl);	//获取到key值
				if(key){
					$scope[key] = formatSpe(response.datadetails);
				}else{
					alert('获取key值出错');	
				}
			}
			var specialError = function(data) {
				console.log(data);
			}
			//格式化固收的数据
			var formatSpe =function(data){
				var rdata = {						//初始化变量和基金的保持一致
							"name" : "", 	  		//产品名称
							"productNo" : "", 		//产品编号
							"threeMonth" : "", 		//近3个月涨幅
							"sixMonth" : "", 		//近6个月涨幅
							"beginMoney" : "", 		//起购金额
							"openSale" : "", 		//开售日期
							"sevenRate" : "", 		//7日年化收益
							"yearRate" : "", 		//年化收益率
							"limitMonth" : "", 		//理财限期
							"completedRate" : "", 	//已完成比例
							"surplus" : {			//剩余时间
								"day" : "", 		//天
								"hour" : "", 		//时
								"min" : "", 		//分
								"second" : "" 		//秒
							},
							"amount" : "", 			//投资金额
							"adviser" : "", 		//投资顾问
							"comment" : "", 		//点评
							"overRate" : "", 		//力争大幅超越行业水平
							"beginTime" : {			//距离发布时间
								"day" : "", 		//天
								"hour" : "", 		//时
								"min" : "", 		//分
								"second" : "" 		//秒
							}
						};	
				rdata.name = data.name;
				rdata.productNo = data.product_no;
				rdata.threeMonth = !_.isEmpty(data.rrinsinglemonth) ? dx.rrinsinglemonth : "";
				rdata.sixMonth = !_.isEmpty(data.rrinsixmonth) ? dx.rrinsixmonth:"";
				rdata.beginMoney = data.minimum_cost+data.monenyname;
				rdata.openSale = data.open_sale;
				rdata.sevenRate = "";
				rdata.yearRate = "1.0";
				rdata.limitMonth = "3个月";
				rdata.completedRate = "50";
				rdata.surplus = {
					"day" : "4",
					"hour" : "2",
					"min" : "35",
					"second" : "42"
				};
				rdata.amount = "1000";
				rdata.adviser = "深商所";
				rdata.comment = "this is a test";
				rdata.overRate = "20";
				rdata.beginTime = {
					"day" : "5",
					"hour" : "4",
					"min" : "36",
					"second" : "25"
				}
				return rdata;
			}
		}
		
		//获取显示的可以值
		var getKey = function(str){
			var _key = false;
			_.map(tpl,function(item,key){
				if(item == str){
					_key = key;
				}
			});
			return 'k'+_key;
		}
		
		$scope.showDetail = function(){
			if(curItem.type == 'fund' || curItem.type == 'fundMoney'){
				window.location.href = urls.PUBLIC_FUND_DETAIL+'?id='+curItem.code;
			}else if (curItem.type == 'special' || curItem.type == 'specialFloat') {
				window.location.href = urls.SPECIAL_FUND_DETAIL+'?id='+curItem.code;
			}
		}
	}]);

	return {
		//页面初始化入口
		init : function() {
			ng.bootstrap(document.body, ['ow']);
		}
	}
});
