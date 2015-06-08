define(function(require, exports, module) {
	var $ = require('zepto'), _ = require('underscore'), App = require('../common/config'), Com = require('../common/common'), Nav=require('common/native'), changeNum = require('controller/numberFormat');
	ajaxService = require('../models/ajaxService');
	var myService = new ajaxService();

	//初始化定义一个order方法对象
	function expObj() {
		//参数
		this.id = Com.getParams('id') || '', this.type = Com.getParams('type') || '1';
		//类型，1：基金；2：固收
		//DOM操作
		_.extend(this, {
			proInfoTem : $('#proInfoTem'),
			concessionTem : $('#concessionTem'),
			proInfo : $('#proInfo'),
			total : $('#total'),
			concession : $('#concession'),
			inputMoney : $('#inputMoney'),
			capital : $('#capital'),
			overMax : $('#overMax'),
			yesButton : $('#yesButton'),
			noButton : $('#noButton'),
			check : $('#check'),
			earnings : $('#earnings'),
			earningsTem : $('#earningsTem'),
			earningsWrap : $('#earningsWrap'),
			secrityTmp : $('#secrityTmp'),
			sectionPro : $('#section_pro'),
			proInfoTmp : $('#proInfoTmp'),
			proCont : $('#proCont'),
			totalTem : $('#totalTem'),
			moneyName : $('#moneyName'),
			confirmBuy : $('#confirmBuy')
		});
		//全局变量
		this.status = 4;	//初始化4标识风险匹配，8标识风险不匹配
		this.mediaSource = sessionStorage.getItem('MEDIA_SOURCE_KEY'); 
	}
	

	//存放所有的事件触发
	expObj.prototype.eventFun = function() {
		var self = this;
		//预约金额控制输入
		this.inputMoney.on('input', function() {
			self.checkMoneyInput();
		})

		this.check.on('touchstart', 'i', function() {
			if ($(this).attr('class') == 'icon_enable') {
				$(this).attr('class', 'icon_checked');
			} else {
				$(this).attr('class', 'icon_enable');
			}
			self.checkMoneyInput();
		})
		//提交数据
		this.yesButton.on('touchstart', function() { 
			console.log('touchstart');
			if (self.type == 1) {//购买基金
				self.fundBuy();
			} else {//购买固收
				self.specialBuy();
			}
		})
		//弹出的风险不匹配，是否继续购买
		self.confirmBuy.live('touchstart',function(){
			expObj.status = 8;
			$('#secrityEl').hide();
		});	
	}
	//金额输入校验
	expObj.prototype.checkMoneyInput = function() {
		var numStr = this.inputMoney.val();
		var subNum = changeNum.subCommas(numStr);
		var maxNum = Number(changeNum.subCommas(this.total.text()));
		if (!maxNum) {
			alert('资金帐户余额未查询到');
			return;
		}
		if (isNaN(subNum) || subNum == '') {
			this.inputMoneyError();
			this.yesButton.hide();
		} else if (changeNum.subCommas(numStr) > maxNum) {
			this.overMax.show();
			this.inputMoneyError();
			this.yesButton.hide();
		} else {
			this.inputMoney.val(changeNum.addCommas(numStr));
			this.capital.html(changeNum.chineseNum(subNum));
			if (Number(this.earningsWrap.text()) > 0) {
				this.earnings.text((Number(subNum) * Number(this.earningsWrap.text()) / 10000).toFixed(2)).show();
			}
			this.overMax.hide();
			if ($('.icon_checked').size() > 0) {
				this.yesButton.show();
				this.noButton.hide();
			} else {
				this.yesButton.hide();
				this.noButton.show();
			}
		}
	}
	//错误处理
	expObj.prototype.inputMoneyError = function(obj) {
		if (this.inputMoney.val()) {
			alert('输入有误！');
		}
		this.inputMoney.val('').select();
		this.capital.text('');
		this.earnings.text('');
		this.yesButton.hide();
		this.noButton.show();
	}
	//实现功能逻辑，实现控制功能
	expObj.prototype.controll = function() {
		var self = this;
		if (!self.id) {
			alert('没有获取到产品ID值，请确认参数是否正确');
			return;
		}
		//获取帐户资金余额
		var ajaxSuccessTotal = function(response) {
			self.total.html(_.template(self.totalTem.html(), response.moneyData));
		}
		myService.getData({
			"url" : App.getWebServiceUrl('proTotal')
		}, ajaxSuccessTotal, self.ajaxError);

		//以下针对普通基金和固收做相关的分流处理
		if (self.type == 1) {
			var send = {
				url : App.getWebServiceUrl('proBuy'),
				data : {
					productid : self.id
				}
			}
			//获取产品购买信息
			var ajaxSuccess = function(response) {
				if (response.productData) {
					self.prodRisk = response.productData.prodRisk;
					self.proInfo.html(_.template(self.proInfoTem.html(), response.productData));
				} else {
					alert(response.errorMessage);
					return;
				}
			}
			myService.getData(send, ajaxSuccess, self.ajaxError);
		} else if (self.type == 2) {
			//步骤一:检查用户风险等级是否满足产品购买条件
			self.IsSatisfy();
			//步骤二：获取产品的相关信息进行展示
			self.toGdBuy();
		}
	}
	//检查用户风险等级是否满足产品购买条件
	expObj.prototype.IsSatisfy = function() {
		var self = this;
		var send = {
			url : App.getWebServiceUrl('isSatisfy'),
			data : {
				"productid" : self.id
			}
		}
		myService.getData(send, function(data) {
			var _state = Number(data.state);
			switch(_state) {
				case 0:
					//转入正常的购买流程
					break;
				case -14:
					//弹出风险评测不过的情况
					self.sectionPro.append(_.template(self.secrityTmp.html(), {
						"info" : data.info
					}));
					$('#secrityEl').show();
					break;
				case -13:
					//没有风险测评或者风险测评已经过期,转风险测评
					break;
				default:
					//暂无产品购买信息
					alert(data.info);
					break;
			}
		});
	}
	//查询产品的相关信息
	expObj.prototype.toGdBuy = function(callback) {
		var self = this;
		var send = {
			url : App.getWebServiceUrl('toGdBuy'),
			data : {
				"productid" : self.id
			}
		}
		myService.getData(send, function(data) {
			if (data.productData) {
				var _productData = data.productData;
				var data = {
					"name" : _productData.name,
					"fund_code" : _productData.fund_code
				}
				self.proCont.html(_.template(self.proInfoTmp.html(), data));
				//针对输入具体金额的特殊化操作：如单位显示、增减幅度
				self.moneyName.text(_productData.monenyname);
			}
		});
	}
	//基金购买确认
	expObj.prototype.fundBuy = function() {
		var self = this;
		var url = App.getWebServiceUrl('proBuySub'), mval = changeNum.subCommas(self.inputMoney.val());
		var send = {
			url : url,
			data : {
				productid : self.id,
				buymoney : mval,
				prodRisk : self.prodRisk,
				media_source_type : self.mediaSource
			}
		}
		function ajaxSuccess(response) {
			if (response.returnCode == -999) {
				alert('输入有误！');
			} else {
				if (response.state == 0) {//提交成功，跳转
					var targetUrl = "proBuyComfund.html?id=" + self.id + '&o=' + response.ordersn + '&m=' + mval;
					window.location.href = targetUrl;
				} else {
					alert(response.info);
				}
			}
		}


		myService.getData(send, ajaxSuccess, self.ajaxError);
	}
	//固收的购买流程
	expObj.prototype.specialBuy = function() {
		var self = this, mval = changeNum.subCommas(self.inputMoney.val());
		var send = {
			url : App.getWebServiceUrl('toGdOrder'),
			data : {
				productid : self.id,
				buymoney : mval,
				isCustRiskMatched : self.status,
				media_source_type : self.mediaSource
			}
		}
		var ajaxSuccess = function(data) {
			if (data.state == 0) {//购买成功
				var targetUrl = "proBuyComfund.html?id=" + self.id + '&o=' + data.ordersn + '&m=' + mval;
				window.location.href = targetUrl;
			} else {
				alert(data.info);
			}
		}
		myService.getData(send, ajaxSuccess, self.ajaxError);
	}
	//接口出错，统一处理函数
	expObj.prototype.ajaxError = function(data) {
		console.log(data);
		alert('接口调用异常');
	}

	return {
		init : function() {
			var obj = new expObj();
			obj.controll();
			obj.eventFun();
		}
	}
})
