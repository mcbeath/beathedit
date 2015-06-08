if (document.attachEvent) {
	alert('请在手机浏览器或者高版本的chrome浏览器进行预览');
}
define(function(require) {
	//引入外部模块
	var ng = require('angularjs');Conf = require('common/config'), Com = require('common/common'), Nav=require('common/native'), app = require('directive/cash');
	require('models/cashSetService');
	
	app.controller('cashSet',['cashService','$scope','URLS',function(cashService,$scope,URLS){
		$scope.step1 = true, $scope.step2 = false, $scope.step3 = false;		//初始化，三个步骤控制是否要显示
		var id = Com.getParams('id') || '';
		if(!id)	alert('缺少必需的产品ID值')
		
		//step1($scope,cashService,);
	}]);
	
	//步骤一：预留设置开关
	function step1($scope,ser,obj){
		console.log(ser);
		
	}
	
	//步骤二:资金预留设置
	function step2($scope,ser,obj){
		
		
	}
	
	//步骤三：资金预留设置成功
	function step3($scope,ser,obj){
		
		
	}
	
	
	return {
		//页面初始化入口
		init : function() {
			ng.bootstrap(document.body, ['ow']);
		}
	}
});