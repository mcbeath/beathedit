define(function(require, exports, module) {
	var $ = require('zepto'), _ = require('underscore'), App = require('../common/config'), Com = require('../common/common'), Nav=require('common/native'), ajaxService = require('../models/ajaxService');
	var myService = new ajaxService();

	//初始化定义一个order方法对象
	function expObj() {
		//DOM操作
		_.extend(this, {
			totalMoney : $('#totalMoney'),
			totalMoneyTpl : $('#totalMoneyTpl'),
			moneyList : $('#moneyList'),
			moneyListTpl : $('#moneyListTpl'),
			empty : $('#empty'),
			myorder_title : $('.myorder_title_padding')
		})
	}

	//存放所有的事件触发
	expObj.prototype.eventFun = function() {

	}
	//实现功能逻辑，实现控制功能
	expObj.prototype.controll = function() {
		this.showTotal();
		this.showBuyList();
	}
	//显示资产持仓
	expObj.prototype.showTotal = function() {
		var self = this;
		var sendTotal = {
			url : App.getWebServiceUrl('myAssetsTotal')
		}
		var ajaxSuccessTotal = function(response) {
			if(response.assetsData){
				var assetsData = response.assetsData, moneyData = response.moneyData;
				var data = {
					"china_assert_val" : moneyData.china_assert_val, //主帐户资产
					"jhlcVal" : assetsData.jhlcVal, //理财产品市值
					"rmbVal" : assetsData.rmbVal, //股票市值
					"jjVal" : assetsData.jjVal, //基金市值
					"china_balance" : moneyData.china_balance, //资金余额
					"china_available" : moneyData.china_available	//可用余额
				};
				if (assetsData && moneyData) {
					self.totalMoney.html(_.template(self.totalMoneyTpl.html(), data)).show();
				}
			}else{
				Nav.alert(response.errorMessage);
			}
		}
		myService.getData(sendTotal, ajaxSuccessTotal, self.ajaxError);
	}
	//显示我购买的产品
	expObj.prototype.showBuyList = function() {
		var self = this;
		//获取理财产品信息
		var send = {
			url : App.getWebServiceUrl('myAssetsList')
		}
		var ajaxSuccess = function(response) {
			if (response.dbPage && response.dbPage.data.length > 0) {
				self.moneyList.html(_.template(self.moneyListTpl.html(), response.dbPage.data)).show();
				self.empty.hide();
			} else {
				Nav.alert(response.errorMessage);
				self.moneyList.hide();
				self.empty.show();
			}
		}
		myService.getData(send, ajaxSuccess, self.ajaxError);
	}
	//异常处理
	expObj.prototype.ajaxError = function() {
		Nav.alert('数据调用异常');
	}
	
	return {
		init : function() {
			var obj = new expObj();
			obj.controll();
			obj.eventFun();
		}
	}
})
