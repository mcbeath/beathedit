define(function(require,exports,module) {
	var $ = require('zepto'),
		_ = require('underscore'),
		App = require('../common/config'),
		Com = require('../common/common'),
		orderService = require('../models/oderServer');
		
	var orderService = new orderService();
	
	//初始化定义一个order方法对象	
	function order(){
		this.testId = $('#testId'),
		this.testName = $('#testName'),
		this.declareTemp = $("#declareTemp");
	}
	
	//存放所有的事件触发
	order.prototype.eventFun = function(){
		this.testId.on('click',function(){
			console.log('tap success');
		});
	}
	 
	//实现功能逻辑，实现控制功能
	order.prototype.orderCtrl = function(){
		var self = this;
		var id = Com.getParams('id') || '';
		if(_.isEmpty(id)){
			alert('没有获取到产品ID值，请确认参数是否正确');
			return;
		}
		var send = {
			url:'data/order.json',    //App.getWebServiceUrl('randCodeImgage');
			data:{
				id:id
			}
		}
		var orderSuccess = function(response){
			var tmp = _.template(self.declareTemp.html(), response);
			self.testId.html(tmp);
		}
		var orderErr = function(data){
			console.log(data);
		}
		orderService.getOrderById(send,orderSuccess,orderErr);
	}

	
	return {
		//页面初始化入口
	    init: function() { 
	    	var orderObj = new order();
	      	orderObj.eventFun();
	      	orderObj.orderCtrl();
	    }
	}
})  