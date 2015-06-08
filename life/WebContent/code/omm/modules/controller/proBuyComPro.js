define(function(require,exports,module){
	var $ = require('zepto'),
		_ = require('underscore'),
		App = require('../common/config'),
		Com = require('../common/common'),
		ajaxService = require('../models/ajaxService');
		var myService = new ajaxService();



	//初始化定义一个order方法对象	
	function expObj(){
		this.productSuccess = $('#productSuccess');
		this.productSuccessTem = $('#productSuccessTem');
		this.product = $('#product');
		this.productTem = $('#productTem');
		this.radiobox = $('#radiobox');
	}
	
	//存放所有的事件触发
	expObj.prototype.eventFun = function(){
		this.radiobox.on('click',function(){
			if($(this).attr('class')=='order_icon'){
				$(this).attr('class','order_icon1');
			}else{
				$(this).attr('class','order_icon');
			}
		})

	}
	 
	//实现功能逻辑，实现控制功能
	expObj.prototype.controll = function(){
		var self = this;
		var id = Com.getParams('id') || '';
		if(_.isEmpty(id)){
			//alert('没有获取到产品ID值，请确认参数是否正确');
			//return;
		}
		var send = {
			url:'data/proBuyComPro.json',    //App.getWebServiceUrl('randCodeImgage');
			data:{
				id:id
			}
		}
		var ajaxSuccess = function(response){
			if(response.flg){
				self.productSuccess.html(_.template(self.productSuccessTem.html(),response));
				self.product.html(_.template(self.productTem.html(),response));
			}
		}
		var ajaxError = function(type){
			console.log(type);
		}
		myService.getData(send,ajaxSuccess,ajaxError);
	}

	return {
		init:function(){
			var obj = new expObj();
			obj.controll();
			obj.eventFun();
		}
	}
})
