if (document.attachEvent) {
	alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	//引入外部模块
	var ng = require('angularjs'), Conf = require('common/config'), Com = require('common/common'), _ = require('underscore'), app = require('directive/detailsDirect');
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
			console.log(response);
			$scope.g = response.datadetails;
			$rootScope.h.name = response.datadetails.name;	//专项理财产品，定义标题
			$rootScope.content = response.datadetails.content;	//专项理财产品，具体的文本内容
		}
		var errorCall = function(data) {
			console.log(data);
		}
	}]);
	
	//业绩表现：基金的报表信息
	app.controller('chartCtrl', ['$scope', '$filter', 'detailService',
	function($scope, $filter, detailService) {
		var _sendData = {
			'function' : 'AjaxAneFundChartFlash',
			'fund_code' : $scope.pro.id,
			'index_code' : '399300',//399300 标识沪深300指数
			'isfund':'1'
		}
		detailService.getCommonQuery(_sendData).success(function(data, status, headers, config) {
			var chartData = $filter('chart')(data);
			if($filter('chart')(data)){
				$scope.option = $filter('chart')(data);
			}
			//触发watch对象
		}).error(function(data, status, headers, config) {
			console.log(data);
		})
	}]);
	
	return {
		//页面初始化入口
		init : function() {
			ng.bootstrap(document.body, ['ow']);
		}
	}
});