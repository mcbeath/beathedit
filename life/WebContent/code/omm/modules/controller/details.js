if (document.attachEvent) {
	alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	//引入外部模块
	var ng = require('angularjs'), Conf = require('common/config'), Com = require('common/common'), Nav=require('common/native'), _ = require('underscore'), app = require('directive/detailsDirect');
	require('models/detailsServer');

	//详情页面的整体控制器,控制器之间的变量的全局传递,
	app.controller('detailCtrl', ['$scope', '$rootScope', 'detailService',
	function($scope, $rootScope, detailService) {
		var id = Com.getParams('id') || '';
		var type = $scope.type = Com.getParams('type') || '1';
		//默认为基金的类型
		if (_.isEmpty(id)) {
			alert('缺少必需的产品ID值');
			return;
		}
		//记录基金相关数据的参数，用于全局之间传递关系
		$scope.pro = {
			'id' : id
		};
		//导航内容的初始化
		$rootScope.h = {//rootScope实现垮scope在不继承关系下的数据传递
			'name' : '',
			'product_no' : id
		};
	}]);

	//基金顶部显示内容
	app.controller('fundHeader', ['$scope', '$rootScope', 'detailService',
	function($scope, $rootScope, detailService) {
		var _sendData = {
			'productno' : $scope.pro.id,
			'function' : 'PlainlicaiInfo'
		}
		//从接口中返回相关的详情数据
		detailService.getFundAction(_sendData).success(function(data, status, headers, config) {
			if (status == 200) {//如果成功返回
				successCall(data);
			} else {
				errorCall(data);
			}
		}).error(function(data, status, headers, config) {
			errorCall(data);
		})
		//实现数据的相关处理
		var dataHandle = {
			formatData : function(data) {
				return data;
			},
			renderData : function(data) {
				$scope.d = data.datainfo;
				$scope.s = data.exdaterow;
				$rootScope.h.name = data.datainfo.name;
			}
		}
		var successCall = function(response) {
			var fdata = dataHandle.formatData(response);
			dataHandle.renderData(fdata);
			$rootScope.proId = fdata.datainfo.product_id; 
			//控制是否可以购买的按钮
			if(!_.isEmpty(fdata.datainfo.fund_status) || Number(fdata.datainfo.fund_status) == 0){
				var status = Number(fdata.datainfo.fund_status);
				if(status == 0 || status == 1){		//申购状态、认购状态
					$rootScope.isActive = $rootScope.redeem == true?'button_buy_2':'button_buy';
				}else {	
					$rootScope.isActive = $rootScope.redeem == true?'button_buy_22':'button_buy2';
				}
			}else{	//非购买及非认购状态
				$rootScope.isActive = 'button_buy_2';
			}
		}
		var errorCall = function(data) {
		}
		
		
	}]);

	//专项理财产品详情的投保
	app.controller('specialHead', ['$scope', '$rootScope', 'detailService',
	function($scope, $rootScope, detailService) {
		var _sendData = {
			"productno" : $scope.pro.id,
			"function" : 'GdDetails'
		}
		//从接口中返回相关的详情数据
		detailService.getGaoDuanLICai(_sendData).success(function(data, status, headers, config) {
			if (status == 200) {//如果成功返回
				successCall(data);
			} else {
				errorCall(data);
			}
		}).error(function(data, status, headers, config) {
			errorCall(data);
		})
		var successCall = function(response) {
			console.log(response);
			$scope.g = response.datadetails;
			$rootScope.h.name = response.datadetails.name;
			//专项理财产品，定义标题
			$rootScope.content = response.datadetails.content;
			//专项理财产品，具体的文本内容
		}
		var errorCall = function(data) {
		}
	}]);

	//主体tab：业绩表现与产品详情切换
	app.controller('TabsCtrl', ['$scope',
	function($scope) {
		$scope.tabs = [{
			title : '业绩表现',
			url : 'two.tpl.html'
		}, {
			title : '产品详情',
			url : 'three.tpl.html'
		}];
		$scope.currentTab = 'two.tpl.html';
		$scope.onClickTab = function(tab) {
			$scope.currentTab = tab.url;
		}
		$scope.isActiveTab = function(tabUrl) {
			return tabUrl == $scope.currentTab;
		}
	}]);

	//业绩表现：基金的报表信息
	app.controller('chartCtrl', ['$scope', '$filter', 'detailService',
	function($scope, $filter, detailService) {
		var  _sendData = {
				'function' : 'AjaxUnitFundFlash',
				'fund_code' : $scope.pro.id
			};
		if($scope.type == 1){	//如果是非货币基金，只有一条线
			_sendData = _.extend(_sendData,{
				'index_code' : '399300'		//399300 标识沪深300指数
			});
		}	
		detailService.getCommonQuery(_sendData).success(function(data, status, headers, config) {
			var chartData = $scope.type == 1? $filter('chart')(data):$filter('chart2')(data);
			if(chartData){
				$scope.option = chartData;
			}
			//触发watch对象
		}).error(function(data, status, headers, config) {
			console.log(data);
		})
	}]);

	//业绩表现：基金历史详情
	app.controller('historyList', ['$scope','$rootScope' ,'$filter','detailService',
	function($scope,$rootScope,$filter, detailService) {
		//获取历史净值的数据
		var _sendData = {
			'productno' : $scope.pro.id,
			'function' : 'Historicalnet'
		}
		detailService.getManageMoney(_sendData).success(function(data, status, headers, config) {
			if (status == 200) {//如果成功返回
				successCall(data);
			} else {
				errorCall(data);
			}
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
		//成功返回处理数据
		var successCall = function(data) {
			if($scope.type == 1){	//如果普通基金，直接显示table信息，且要求分页
				if (!_.isEmpty(data.dbPage)) {
					$scope.curPage = data.dbPage.currentPage;
					if (data.dbPage.data.length > 5) {
						$scope.h = data.dbPage.data.slice(0, 5);
					} else {
						$scope.h = data.dbPage.data;
					}
					var firstData = data.dbPage.data[0];
					$rootScope.h = {
						"time":firstData.infopubldate,
						"growth":firstData.nvdailygrowthrate
					}
				}
			}else if($scope.type == 2){		//如果是货币基金，则将此数据进行报表图形的显示
				var chartData = $filter('chart3')(data.dbPage.data);
				if(chartData){	//如果存在数据
					$scope.option = chartData;
				}else{
					console.log('历史净值没有任何的数据');
				}
			}
		}
		//失败处理数据
		var errorCall = function(data) {
		}
	}])

	//产品详情：tab切换
	app.controller('tabCtr2', function($scope) {
		var vm = $scope.vm = {
			activeTab : 1
		};
	});

	//产品详情：基本资料
	app.controller('survey', ['$scope', 'detailService',
	function($scope, detailService) {
		var _sendData = {
			"productno" : $scope.pro.id,
			"function" : 'Survey'
		}
		detailService.getManageMoney(_sendData).success(function(data, status, headers, config) {
			if (status == 200) {//如果成功返回
				successCall(data);
			} else {
				errorCall(data);
			}
		}).error(function(data, status, headers, config) {
			errorCall(data);
		});
		var successCall = function(data) {
			$scope.v = data;
		}
		var errorCall = function(data) {
		}
	}]);

	//产品详情：分红配送
	app.controller('bonus', ['$scope', 'detailService',
	function($scope, detailService) {
		var _sendData = {
			"productno" : $scope.pro.id,
			"function" : 'Bonus'
		}
		detailService.getManageMoney(_sendData).success(function(data, status, headers, config) {
			if (status == 200) {//如果成功返回
				successCall(data);
			} else {
				errorCall(data);
			}
		}).error(function(data, status, headers, config) {
			errorCall(data);
		});
		var successCall = function(data) {
			$scope.l = data.dbPage.data;
		}
		var errorCall = function(data) {
		}
	}]);
	
	//货币紧急的图形tab切换
	app.controller('currentTab',function($scope){
		//切换tab属性
		$scope.curentUrl = 'chart1.tpl.html';	//初始化
		$scope.curTab = 1;
		$scope.onClickCurTab = function(id){
			if(id == 1){	//最近7日年化收益率
				$scope.curentUrl = 'chart1.tpl.html';
				$scope.curTab = 1;
			}else if(id == 2){ //万分收益
				$scope.curentUrl = 'chart2.tpl.html';
				$scope.curTab = 2;
			}
		};
	});
	
	//购买之前判断是否已经登陆
	app.controller('isLogin',['$scope','$rootScope','detailService','URLS',function($scope,$rootScope,detailService){
		detailService.checkLoginStatus({}).success(function(data, status, headers, config) {
			if (status == 200 && (data.hasLogin == true || data.hasLogin == 'true')) {//如果成功返回
				$scope.isLogin = true;
				//如果已经登陆，查询相关
				detailService.queryProAssets({"productno":$scope.pro.id}).success(function(res, status, headers, config) {
					if(!_.isEmpty(res.assetDetail)){	//如果assetDetail存在，标识是可以赎回的。
						$rootScope.redeem = true;
					}
				})
			}else{
				$scope.isLogin = false;
			}
		}).error(function(data, status, headers, config) {
			$scope.isLogin = false;
		});
		
		$scope.buy = function(){
			var targetUrl = window.location.origin+'/omm/proBuy.html?id='+$rootScope.proId+'&type=1';
			if($scope.isLogin == true){		//如果已经登陆
				window.location.href = targetUrl;
			}else{
				window.location.href = 'login.html?target='+targetUrl;
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
