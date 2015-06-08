define(function(require, exports, module) {
	var $ = require('zepto'), _ = require('underscore'), App = require('../common/config'), Com = require('../common/common'), Nav=require('common/native'), ajaxService = require('../models/ajaxService');
	var myService = new ajaxService();

	//初始化定义一个order方法对象
	function expObj() {
		this.productNo = Com.getParams('productNo') || '';
		_.extend(this,{
			headerRight : $("#headerRight"),
			section_pro : $("#section_pro"),
			product_succ : $("#product_succ"),
			headerLeft : $("#headerLeft"),
			page : $('#page'),
			proRed : $('#proRed'),
			proRedTem : $('#proRedTem'),
			radiobox : '#radiobox',
			getAllMoney : '#getAllMoney',
			moneyRed : '#moneyRed',
			capital : '#capital',
			moneyError : '#moneyError',
			buttonYes : '#buttonYes',
			buttonNo : '#buttonNo',
			redButton : $('#redButton')
		});
		this.send = {
			url : App.getWebServiceUrl('redSub')
		};
	}

	//存放所有的事件触发
	expObj.prototype.eventFun = function() {
		var self = this;
		//选择全部赎回
		this.page.on('touchstart', this.radiobox, function() {
			if ($(this).attr('class') == 'icon_enable') {
				$(this).attr('class', 'icon_checked');
				$(self.moneyRed).val($(self.getAllMoney).text());
				$(self.moneyError).hide();
			} else {
				$(this).attr('class', 'icon_enable');
				$(self.moneyRed).val('');
			}
			self.countMarket();
		})
		//输入份额
		this.page.on('input', this.moneyRed, function() {
			var subNum = Com.subCommas($.trim($(this).val()));
			var maxNum = Number(Com.subCommas($(self.getAllMoney).text()));
			if (_.isEmpty(subNum) || isNaN(subNum)) {
				$(this).val('');
				$(self.moneyError).hide();
			} else {
				if (subNum > maxNum) {
					$(self.moneyError).show();
					$(this).val('');
				} else if (subNum == maxNum) {
					$(self.radiobox).attr('class', 'icon_checked');
					$(this).val(Com.addCommas($(this).val()));
					$(self.moneyError).hide();
				} else {
					$(self.radiobox).attr('class', 'icon_enable');
					$(this).val(Com.addCommas($(this).val()));
					$(self.moneyError).hide();
				}
			}
			self.countMarket();
		})
		//顺延赎回，取消赎回。
		this.redButton.on('touchstart', 'p', function() {
			$(this).addClass('open').siblings().removeClass('open');
			$(this).parent().attr('data-choose', $(this).attr('data-value'));
		})
	}
	//实现功能逻辑，实现控制功能
	expObj.prototype.controll = function() {
		var self = this;

		var ajaxSuccess = function(response) {
			if (response.state == 0) {
				self.section_pro.hide();
				self.headerLeft.hide();
				self.product_succ.show();
				self.headerRight.show();
			} else {
				Nav.alert(response.info);
			}
		}
		var ajaxError = function(type) {
			console.log(type);
		}

		this.page.on('touchstart', this.buttonYes, function() {
			self.send.data.order_vol = Com.subCommas($(self.moneyRed).val());
			myService.getData(self.send, ajaxSuccess, ajaxError);
		})
	}

	expObj.prototype.init = function() {
		var self = this;
		if (_.isEmpty(self.productNo)) {
			Nav.alert('没有获取到产品ID值，请确认参数是否正确');
			return;
		}
		myService.getData({
			url : App.getWebServiceUrl('proAsset'),
			data : {
				productno : self.productNo
			}//"519656"
		}, function(response) {
			if (response.returnCode == "901") {
				Nav.alert(response.errorMessage);
			} else {
				if(parseFloat(response.assetDetail.fund_avl)==0){
					Nav.alert("无可用赎回份额！");
					return;
				}
				self.send.data = {
					ta_code : response.assetDetail.ta_code,
					fund_intl : response.assetDetail.fund_intl,
					fund_code : response.assetDetail.fund_code,
					redeem_flag : self.redButton.attr('data-choose'),
					ta_acct : response.assetDetail.ta_acct,
					trans_acct : response.assetDetail.trans_acct,
					iss_code : response.assetDetail.iss_code,
					fund_resource : response.assetDetail.fund_resource
				};
				self.proRed.html(_.template(self.proRedTem.html(), {
					fund_code : response.assetDetail.fund_code,
					fund_name : response.assetDetail.fund_name
				}));
				$(self.getAllMoney).text(Com.addCommas(response.assetDetail.fund_avl));
				$(self.moneyRed).attr("placeholder", "请输入" + response.assetDetail.fund_avl + "以内赎回份额");
			}
		}, function(info) {
			Nav.alert(info);
		});
	}
	//计算市值
	expObj.prototype.countMarket = function() {
		var subNum = Com.subCommas($(self.moneyRed).val());
		if ($(self.moneyRed).val()) {
			$(self.capital).text(Com.chineseNum(subNum));
			$(self.buttonYes).show();
			$(self.buttonNo).hide();
		} else {
			$(self.capital).text('');
			$(self.buttonYes).hide();
			$(self.buttonNo).show();
		}
	}
	
	//赎回成功
	Com.complete = function(){
		//window.location.href = 'myAssets.html';
	}

	return {
		init : function() {
			var obj = new expObj();
			obj.init();
			obj.controll();
			obj.eventFun();
		}
	}
})
