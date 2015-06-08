define(function(require, exports, module) {
	var $ = require('zepto'), _ = require('underscore'), App = require('common/config'), Com = require('../common/common'), Nav=require('common/native'), ajaxService = require('../models/ajaxService');
	var myService = new ajaxService();
	function orderObj() {
		//DOM
		_.extend(this, {
			orderTab : $('#orderTab'),
			myAssetsBox1 : $('#myAssetsBox1'),
			myAssetsBox2 : $('#myAssetsBox2'),
			myAssetsBox3 : $('#myAssetsBox3'),
			myAssetsBox4 : $('#myAssetsBox4'),
			myAssetsBox5 : $('#myAssetsBox5'),
			myOrderTem : $('#myOrderTem'),
			tabContent : $('.myAssetsBox'),
			myAssetsBox4Empty : $('#myAssetsBox4Empty'),
			myorderUndo : $('.myorder_undo1')
		})
		//全局变量
		this.errFlag = true;
		//防止多次弹出错误信息
	}

	orderObj.prototype.eventFun = function() {
		var self = this;
		//点击切换显示内容
		this.orderTab.on('click', 'li', function() {
			$(this).find('a').addClass('check').parent().siblings().find('a').removeClass('check');
			self.tabContent.eq($(this).index()).show().siblings('.myAssetsBox').hide();
		})

		self.myorderUndo.live('click', function() {
			self.cancelOrder($(this).attr('ref'));
		});

	}

	orderObj.prototype.controll = function() {
		var self = this;
		var send1 = {
			url : App.getWebServiceUrl('myOrder1')
		}
		var send2 = {
			url : App.getWebServiceUrl('myOrder2')
		}
		var send3 = {
			url : App.getWebServiceUrl('myOrder3')
		}
		var send4 = {
			url : App.getWebServiceUrl('myOrder4')
		}
		var send5 = {
			url : App.getWebServiceUrl('myOrder5')
		}
		//重新格式化数据
		var formatData = function(data){
			var newdata = [];
			_.map(data,function(item){
				var _item = item;
				var ename = ''; 
				var enums = '';
				if(/赎回/g.test(item.businesstype)){		
					ename = '赎回数量';
					enums = item.entrustnumber+'份';
				}else{
					ename = '申请金额';
					enums = item.entrustmoney+'元';
				}
				newdata.push(_.extend(_item,{
					"ename":ename,
					"enums":enums
				}));	
			});
			return newdata;
		}
		var ajaxSucc1 = function(response) {
			if (response.dbPage) {
				if (response.dbPage.data || response.dbPage.data.length > 0) {
					self.myAssetsBox1.html(_.template(self.myOrderTem.html(), formatData(response.dbPage.data)));
				}
			} else {
				if (self.errFlag) {
					alert(response.errorMessage);
					self.errFlag = false;
				}

			}
		}
		var ajaxSucc2 = function(response) {
			if (response.dbPage) {
				if (response.dbPage.data || response.dbPage.data.length > 0) {
					self.myAssetsBox2.html(_.template(self.myOrderTem.html(), formatData(response.dbPage.data)));
				}
			} else {
				if (self.errFlag) {
					alert(response.errorMessage);
					self.errFlag = false;
				}
			}
		}
		var ajaxSucc3 = function(response) {
			if (response.dbPage) {
				if (response.dbPage.data || response.dbPage.data.length > 0) {
					self.myAssetsBox3.html(_.template(self.myOrderTem.html(), formatData(response.dbPage.data)));
				}
			} else {
				if (self.errFlag) {
					alert(response.errorMessage);
					self.errFlag = false;
				}
			}
		}
		var ajaxSucc4 = function(response) {
			if (response.dbPage) {
				if (response.dbPage.data || response.dbPage.data.length > 0) {
					self.myAssetsBox4.html(_.template(self.myOrderTem.html(), formatData(response.dbPage.data)));
				}
			} else {
				if (self.errFlag) {
					alert(response.errorMessage);
					self.errFlag = false;
				}
			}
		}
		var ajaxSucc5 = function(response) {
			if (response.dbPage) {
				if (response.dbPage.data || response.dbPage.data.length > 0) {
					self.myAssetsBox5.html(_.template(self.myOrderTem.html(), formatData(response.dbPage.data)));
				}
			} else {
				if (self.errFlag) {
					alert(response.errorMessage);
					self.errFlag = false;
				}
			}
		}
		var ajaxError = function(errorType) {
			console.log('获取信息失败！');
		}

		myService.getData(send1, ajaxSucc1, self.ajaxError);
		myService.getData(send2, ajaxSucc2, self.ajaxError);
		myService.getData(send3, ajaxSucc3, self.ajaxError);
		myService.getData(send4, ajaxSucc4, self.ajaxError);
		myService.getData(send5, ajaxSucc5, self.ajaxError);

	}
	//撤单操作
	orderObj.prototype.cancelOrder = function(id) {
		var send = {
			url : App.getWebServiceUrl('cancelOrder'),
			data : {
				"autoId" : id
			}
		};
		var succCallBack = function(response) {
			if (response.state == '0') {
				//撤单成功,删除节点数据
				$('.contact_' + id).remove();
				alert(response.info);
			} else {
				alert(response.info);
			}
		}
		myService.getData(send, succCallBack, this.ajaxError);
	}
	//异常公共处理
	orderObj.prototype.ajaxError = function(data) {
		alert('接口调用异常');
	}
	
	return {
		init : function() {
			var myOrder = new orderObj();
			myOrder.eventFun();
			myOrder.controll();
		}
	}

})
