define(function(require, exports, module) {
	var $ = require('zepto'), _ = require('underscore'), App = require('../common/config'), Com = require('../common/common'), Nav=require('common/native'), ajaxService = require('../models/ajaxService');
	var myService = new ajaxService();
	
	//初始化定义一个order方法对象
	function expObj() {
		this.proBuyComFund = $('#proBuyComFund'), this.proBuyComFundTem = $('#proBuyComFundTem'), this.radiobox = $('#radiobox'), this.showMyAsset = $('#showMyAsset'), this.headerRight = $("#headerRight");
	}

	//存放所有的事件触发
	expObj.prototype.eventFun = function() {
		this.radiobox.on('click', function() {
			if ($(this).attr('class') == 'order_icon') {
				$(this).attr('class', 'order_icon1');
			} else {
				$(this).attr('class', 'order_icon');
			}
		});
		this.showMyAsset.on('click', function() {
			window.location.href = "myorder.html";
		});
		this.headerRight.find("a").on('click',function(){
			window.location.href = "myorder.html";
		});
	}
	//实现功能逻辑，实现控制功能
	expObj.prototype.controll = function() {
		var self = this;
		var id = Com.getParams('id') || '', ordersn = Com.getParams('o') || '', buymoney = Com.getParams('m') || '';
		if (_.isEmpty(id)) {
			alert('没有获取到产品ID值，请确认参数是否正确');
			return;
		}
		var send = {
			url : App.getWebServiceUrl('buyMMAction'),
			data : {
				"function" : "GdSuccess",
				"productid" : id,
				"ordersn" : ordersn,
				"buymoney" : buymoney
			}
		}
		var ajaxSuccess = function(response) {
			if(!_.isEmpty(response.datadetails)){
				self.proBuyComFund.html(_.template(self.proBuyComFundTem.html(), response.datadetails));
			}else{
				alert(response.errorMessage);
			}
		}
		var ajaxError = function(type) {
			console.log(type);
		}
		myService.getData(send, ajaxSuccess, ajaxError);
	}
	
	//重定义完成按钮的含义
	Com.complete = function(){
		window.location.href = 'myorder.html';
	}

	return {
		init : function() {
			var obj = new expObj();
			obj.controll();
			obj.eventFun();
		}
	}
})
