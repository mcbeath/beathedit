/**
 * 实现和客户端之间的相互交互
 */
define(function(require, exports, module) {
	var App = require('common/config'), Com = require('common/common');
	var Nav = new Object;
	var callindex = 0, toString = Object.prototype.toString;

	// 如果fn是一个函数类型, 则调用
	var exec = function(fn) {
		if (toString.call(fn) == '[object Function]') {
			fn();
		}
	}
	/**
	 * 调用一个Native方法
	 * @param {String} name 方法名称
	 */
	Nav.call = function(name) {
		// 获取传递给Native方法的参数
		var args = Array.prototype.slice.call(arguments, 1);
		var callback = '', item = null;
		// 遍历参数
		for (var i = 0, len = args.length; i < len; i++) {
			item = args[i];
			if (item === undefined) {
				item = '';
			}
			// 如果参数是一个Function类型, 则将Function存储到window对象, 并将函数名传递给Native
			if (toString.call(item) == '[object Function]') {
				callback = name + 'Callback' + i;
				window[callback] = item;
				item = callback;
			}
			args[i] = item;
		}

		if (App.IS_ANDROID) {// Android平台
			try {
				for (var i = 0, len = args.length; i < len; i++) {
					// args[i] = '"' + args[i] + '"';
					args[i] = '\'' + args[i] + '\'';
				}
				eval('window.android.' + name + '(' + args.join(',') + ')');
			} catch(e) {
				alert(e);
			}
			eval();
		} else if (App.IS_IOS) {// IOS平台
			if (args.length) {
				args = '|' + args.join('|');
			}
			// IOS通过location.href调用Native方法, _call变量存储一个随机数确保每次调用时URL不一致
			callindex++;
			location.href = '#ios:' + name + args + '|' + callindex;
		}
	}
	/**
	 * 显示alert提示信息
	 * @param {String} text
	 * @param {Function} callback
	 */
	Nav.alert = function(text, callback) {
		Nav.onload();
		if (text) {
			text = text.replace(/<[^>]+>/g, "");
			//去除掉HTML标签
		}
		if (App.IS_NATIVE) {
			Nav.call('alert');
			if (App.IS_IOS) {
				Nav.call('alert', text, callback);
			} else {
				alert(text);
			}
		} else {
			alert(text);
		}
	};

	/**
	 * 显示confirm选择信息
	 * @param {String} text
	 * @param {Function} ok
	 * @param {Function} cancel
	 */
	Nav.confirm = function(text, ok, cancel) {
		Nav.onload();
		if (App.IS_NATIVE) {
			Nav.call('confirm', text, ok, cancel);
		} else {
			if (confirm(text)) {
				exec(ok);
			} else {
				exec(cancel);
			}
		}
	};

	/**
	 * 页面跳转, 如果在终端设备中则重新设置WebView的加载地址
	 * @param {String} url
	 */
	Nav.href = function(url) {
		// 每次跳转之前统一结束提示
		Nav.onload();
		window.location.href = url;
	};

	/**
	 * 通知Native页面加载完成
	 */
	Nav.onload = function() {
		if (App.IS_NATIVE) {
			Nav.call('onload');
		} else {
			Com.loaded();
		}
	};

	/**
	 * 开始加载loading动画
	 * @param {Boolean} notCancel 是否不能取消, 默认能取消
	 */
	Nav.onbegin = function() {
		if (App.IS_NATIVE) {
			Nav.call('loadingBegin');
		} else {
			// 直接用css样式
			Com.loading();
		}
	};
	if(typeof(Zepto)!='undefined') {
		Nav.onbegin();	//页面初始化直接打开
	}
	
	//全局控制loadding的状态打开与关闭
	Nav.onEnd = function(){
		// zepto的公共配置
		if(typeof(Zepto)!='undefined') {
			var num = 0;
		   	$.ajaxSettings.beforeSend = function(){
		   		num++;
		   		Nav.onbegin();
		   	}
		    $.ajaxSettings.complete = function(){
		    	num--;
		    	if(num==0){
		    		Nav.onload();
		    	}
		    };
		    $.ajaxSettings.error = function(jqXHR, textStatus, errorThrown) {
		        if(!window.navigator.onLine || jqXHR.status) {
		            App.alert('网络连接失败, 请稍后重试！');
		        }
		    }
		}
	}
	Nav.onEnd();
	
	Nav.init = function(){
		//媒体来源处理函数
		var getMediaSource = function(){
			return App.IS_WEIXIN?'OMM-WX':(App.IS_IOS?'OMM-IOS':(App.IS_ANDROID?'OMM-ANDROID':'OMM-OTHER'));
		}
		//设置媒体来源
		var mediaSource = getMediaSource();
		sessionStorage.setItem('MEDIA_SOURCE_KEY',mediaSource);
		//提供webtrends的标识cookie设置
		Com.Cookie('MEDIA_SOURCE_NAME', mediaSource,{path:"/", domain:".pingan.com"});
	}
	Nav.init();
		

	module.exports = Nav;
})