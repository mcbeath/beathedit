if (document.attachEvent) {
	alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	//引入外部模块
	var ng = require('angularjs'), Conf = require('common/config'), Com = require('common/common'), Nav=require('common/native'), _ = require('underscore'), app = require('directive/detailsDirect');
	require('models/detailsServer');
	
	//高端理财的整体控制器,控制器之间的变量的全局传递,
	app.controller('gaoduan', ['$scope', '$rootScope', 'detailService',
	function($scope, $rootScope, detailService) {
		var id = Com.getParams('id') || '';
		var type = $scope.type = Com.getParams('type') || '1';
		
		//默认为基金的类型
		if (_.isEmpty(id)) {
			alert('缺少必需的产品ID值');
			return;
		}
		$scope.pro = {
			'id' : id
		};
		//导航内容的初始化
		$rootScope.h = {//rootScope实现垮scope在不继承关系下的数据传递
			'name' : '',
			'product_no' : id
		};
		$rootScope.content = '';
		
	}]);
	
	//专项理财产品详情的投保
	app.controller('specialHead',['$scope','$rootScope','detailService',function($scope,$rootScope,detailService){
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
			$scope.g = response.datadetails;
			$rootScope.proId = $scope.g.product_id;
			$rootScope.h.name = response.datadetails.name;	//专项理财产品，定义标题
			$rootScope.content = response.datadetails.content;	//专项理财产品，具体的文本内容
			
			//控制是否可以购买的按钮
			if(!_.isEmpty(response.datadetails.status_new)){
				var status_new = Number(response.datadetails.status_new);
				if(status_new != 2 ){		//申购状态
					$rootScope.isActive = true;
				}else {	//认购状态
					$rootScope.isActive = false;
				}
			}else{	//非购买及非认购状态
				$rootScope.isActive = false;
			}
		}
		var errorCall = function(data) {
			console.log(data);
		}
	}]);
	
	//业绩表现：基金的报表信息
	app.controller('chartCtrl', ['$scope','$rootScope','$filter', 'detailService',
	function($scope, $rootScope, $filter, detailService) {
		var _sendData = {
			'function' : 'AjaxAneFundChartFlash',
			'fund_code' : $scope.pro.id,
			'index_code' : '399300',//399300 标识沪深300指数
			'isfund':'1'
		}
		detailService.getCommonQuery(_sendData).success(function(data, status, headers, config) {
			var isDev = Com.getParams('dev') || false;  
			var chartData = '';
			if(isDev == 'true'){	//专项理财净值型制作模拟数据
				chartData= $filter('test')(data);	
			}else{
				chartData = $filter('chart')(data);
			}
			if(chartData){		
				$scope.option = chartData;
				$rootScope.fundTab = 1;
				$rootScope.w33 = true;		//控制显示栏
				$rootScope.w50 = false;
			}else{
				$rootScope.fundTab = 2;
				$rootScope.w33 = false;
				$rootScope.w50 = true;
			}
			
			//触发watch对象
		}).error(function(data, status, headers, config) {
			console.log(data);
		})
	}]);
	
	//购买之前判断是否已经登陆
	app.controller('isBuy',['$scope','$rootScope','detailService',function($scope,$rootScope,detailService){
		//检查是否已经登陆
		detailService.checkLoginStatus({}).success(function(data, status, headers, config) {
			if (status == 200 && (data.hasLogin == true || data.hasLogin == 'true')) {//如果成功返回
				$scope.isLogin = true;
			}else{
				$scope.isLogin = false;
			}
		}).error(function(data, status, headers, config) {
			$scope.isLogin = false;
		});

		$scope.buy = function(){
			if($scope.isLogin == true){		//如果已经登陆
				var targetUrl = window.location.origin+'/omm/proBuy.html?id='+$rootScope.proId+'&type=2';
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