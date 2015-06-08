define(function(require,exports,module) {
	var Core = {};
	var b = navigator.userAgent.toLowerCase();
	browser = {
		safari : /webkit/.test(b),
		opera : /opera/.test(b),
		msie : /msie/.test(b) && !/opera/.test(b),
		mozilla : /mozilla/.test(b) && !/compatible/.test(b)
	};
	
	//获取句柄
	Core.G = function(id){
	    if(typeof id=="string")
	    return document.getElementById(id);
	    else 
	    return id;
	}
	/**
	 * 隐藏
	 */
	Core.hide = function(el, value) {
		var _v = value || "none"
		if (el && el.nodeType == 1) {
			el.style.display = _v;
		} else if ( typeof el == "string")
			G(el).style.display = _v;
		else if (el && el.length > 1) {
			for (var i in el) {
				if (!el[i] || el[i].nodeType != 1)
					continue;
				el[i].style.display = _v;
			}
		}
	
	}
	
	/**
	 * 显示
	 */
	Core.show = function(el, value) {
		var v = value ? value : "block";
		var o = '';
		if ( typeof el == "object")
			o = el
		else
			o = G(el);
		if (!o || o.nodeType != 1)
			return;
		o.style.display = v;
	}
	
	Core.log = function(x) {
		console.log(x)
	}
	
	/**
	 *去掉空空格
	 */
	Core.trim = function(str) {
		if ( typeof str == 'string')
			return str.replace(/(\s*$)/g, '');
		else
			return str;
	}
	
	/*
	 * 给对象组设置属性
	 */
	Core.setAttr = function(list, attr, value) {
		if ( typeof list == 'string')
			list = document.getElementsByTagName(list);
	
		if (!list)
			return;
	
		for ( i = 0, j = list.length; i < j; i++) {
			if (!list[i] || list[i].nodeType != 1)
				continue;
	
			if (value)
				list[i].setAttribute(attr, value);
			else {
				list[i].removeAttribute(attr);
			}
		}
	}
	
	/**
	 * 绑定事件
	 */
	Core.bind = function(list, type, callBck) {
		if ( typeof callBck != "function" || !list || !type)
			return;
		if (list.length > 0) {
			for (var i in list) {
				if (list[i] && typeof list[i] == "object" && list[i].nodeType && list[i].nodeType == 1) {
					_bindEvent(list[i], type, callBck);
				}
			}
		} else if ( typeof list == "object") {
			_bindEvent(list, type, callBck);
		}
	}
	
	/**
	 *绑定事件
	 */
	Core._bindEvent = function(el, type, callBck) {
		if (!el || !el.nodeType)
			return;
		if (browser.safari || browser.opera || browser.mozilla) {
			el.addEventListener(type, callBck, false);
		} else {
			el.attachEvent("on" + type, callBck, false);
		}
	
	}
	
	/**
	 *样式
	 */
	Core.toggleClass = function(el, name) {
		var c = el.className;
		if (c.indexOf(name) > -1) {
			el.className = c.replace(name, "")
		} else {
			el.className = c + " " + name;
		}
	}
	
	/**
	 *切换事件
	 */
	Core.toggleEvent = function(el) {
		_bindEvent(el, 'click', function(e) {
			var div = e.target || e.srcElement;
			if (div == el) {
				var dis = el.className;
				if (dis.oUpperCase() != 'NONE') {
					div.style.display = "none";
				} else {
					div.style.display = "block";
				}
			}
		})
	}
	
	/**
	 *切换显示
	 */
	Core.toggle = function(el, value) {
		if (!el || !el.nodeType)
			return;
		var _val = "block"
		if (value)
			_val = value;
		var dis = el.style.display;
		if (dis.toUpperCase() != 'NONE') {
			el.style.display = "none";
		} else {
			el.style.display = _val;
		}
	}
	
	/**
	 * 删除样式
	 */
	Core.removeClass = function(el, name) {
		if (!el)
			return;
		if (el.nodeType == 1) {
			var cla = el.className;
			if (!cla)
				return;
			if (cla.indexOf(name) > -1) {
				if (name)
					el.className = cla.replace(name, "");
				else
					el.removeAttribute("class");
			}
		} else if (el.length > 1) {
			for (var i = 0, j = el.length; i < j; i++) {
				if (el[i] && el[i].nodeType == 1) {
					var cla = el.className;
					if (!cla)
						continue;
					if (cla.indexOf(name) > -1) {
						if (name)
							el[i].className = cla[i].replace(name, "");
						else
							el[i].removeAttribute("class");
					}
				}
			}
	
		}
	
	}
	
	/**
	 *添加样式
	 */
	Core.addClass = function(el, name) {
		el.className = el.className + " " + name;
	}
	
	/**
	 * 是否有样式名
	 */
	Core.hasClass = function(el, name) {
		if (el && el.className.indexOf(name) > -1)
			return true;
		else
			return false;
	}
	
	/**
	 *删除标签
	 */
	Core.remove = function(el) {
		if (!el || !el.nodeType)
			return;
		if (el.length > 1) {
			for (var i = 0, j = el.length; i < j; i++) {
				var o = el[i];
				o.parentNode.removeChild(o);
			}
		} else {
	
			el.parentNode.removeChild(el);
		}
	}
	
	/**
	 *设置select 选择
	 */
	Core.setSelectVal = function(el, value) {
		if (el && el.options.length > 0) {
			for (var i = 0, j = el.options.length; i < j; i++) {
				el.options[i].removeAttribute("selected");
				if (el.options[i].value == value)
					el.options[i].setAttribute("selected", "selected");
			}
		}
	}
	
	/**
	 *设获取select 选择
	 */
	Core.getSelectVal = function(el, value) {
	
	}
	
	/**
	 *相邻节点
	 */
	Core.prevNode = function(el) {
		if (!el || !el.previousSibling)
			return null;
		var r;
		if (el.previousSibling.nodeType == 1)
			r = el.previousSibling
		else
			r = prevNode(el.previousSibling);
		return r;
	}
	
	/**
	 *相邻节点
	 */
	Core.nextNode = function(el) {
		if (!el || !el.nextSibling)
			return null;
		var r;
		if (el.nextSibling.nodeType == 1)
			r = el.nextSibling
		else
			r = nextNode(el.nextSibling);
		return r;
	}
	
	/**
	 *Ajax
	 *ajax.get(url,data,callback,befault,after)
	 *ajax.post(url,data,callback,befault,after)
	 */
	var ajax = {
		_objPool : [],
		_getInstance : function() {
			for (var i = 0; i < this._objPool.length; i++) {
				if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
					return this._objPool[i];
				}
			}
			this._objPool[this._objPool.length] = this._createObj();
			return this._objPool[this._objPool.length - 1];
		},
		_createObj : function() {
			if (window.XMLHttpRequest) {
				var objXMLHttp = new XMLHttpRequest();
			} else {
				var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
				for (var n = 0; n < MSXML.length; n++) {
					try {
	
						var objXMLHttp = new ActiveXObject(MSXML[n]);
						if (objXMLHttp != undefined)
							break;
					} catch(e) {
					}
				}
			}
			if (objXMLHttp.readyState == null) {
				objXMLHttp.readyState = 0;
				bind(objXMLHttp, 'load', function() {
					objXMLHttp.readyState = 4;
					if ( typeof objXMLHttp.onreadystatechange == "function") {
						objXMLHttp.onreadystatechange();
					}
				}, false)
			}
			return objXMLHttp;
		},
		_sendReq : function(method, url, DataType, data, callback) {
			this.befault();
			var dataType = DataType || 'JSON';
			var objXMLHttp = this._getInstance();
			with (objXMLHttp) {
				try {
					var rand = Math.floor(Math.random() * 10000)
					if (url.indexOf("?") > 0) {
						//url += "&randnum=" + rand;
	
					} else {
						//url += "?randnum=" + rand;
						//	url += "?"
					}
	
					if (method.toUpperCase() == 'GET' && data != null) {
						url = url + '&' + this._parseData(data) + "splitCode=0";
					} else {
						// data = JSON.stringify(data);
						data = this._parseData(data);
					}
					//console.log(objXMLHttp);
					objXMLHttp.open(method, url, true);
					objXMLHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					//objXMLHttp.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
					//objXMLHttp.setRequestHeader('Content-Type', ' application/js');
					objXMLHttp.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
					objXMLHttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					//objXMLHttp.setRequestHeader('Content-Type', 'application/js');
					objXMLHttp.timeout = 600000;
					// objXMLHttp.ontimeout = function() {
					// console.log('request timeout');
					// }
					objXMLHttp.ontimeout = ajax.timeout;
					objXMLHttp.send(data);
					onreadystatechange = function() {
						if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
							ajax.after();
							//alert(dataType.toUpperCase())
							// console.log( objXMLHttp.responseText)
							//console.log(dataType)
							var responseText = objXMLHttp.responseText;
							if (responseText.indexOf("<?xml") > -1) {
								alert(responseText)
							} else if (dataType.toUpperCase() == "JSON") {
								var data = [];
								eval('data=' + responseText)
								callback(data);
							} else if (dataType.toUpperCase() == "TEXT") {
								callback(responseText);
							} else {
								callback(responseText);
							}
	
						}
					}
				} catch(e) {
				}
			}
		},
		get : function(url, data, dataType, callback, befault, after, timeout) {
			if ( typeof befault == 'function')
				this.befault = befault;
			if ( typeof after == 'function')
				this.after = after;
			this._sendReq('get', url, dataType, data, callback, timeout)
		},
		post : function(url, data, dataType, callback, befault, after, timeout) {
			if ( typeof befault == 'function')
				this.befault = befault;
			if ( typeof after == 'function')
				this.after = after;
	
			this._sendReq('post', url, dataType, data, callback, timeout)
	
		},
		befault : function() {
			//console.log('befault')
		},
		after : function() {
			//console.log('after')
	
		},
		_parseData : function(data) {
			var str = '';
			if ( typeof data == "object") {
				for (key in data) {
					if (data[key] == undefined)
						continue;
					if ( typeof data[key] == 'string' || 'number') {
						str += key + "=" + data[key].toString() + "&";
					} else {
						str += this._parseData(data[key]);
					}
	
				}
			}
			//去掉最后一个间隔符号
			str = str.replace(/(&$)/g, '');
			return str;
		}
	};
	
	/**
	 * ajax请求
	 */
	Core.ajax = function(option) {
		//默认
		var o = {
			url : option.url || "",
			data : option.data || [],
			dataType : option.dataType || 'JSON',
			type : option.type || 'post',
			error : option.error ||
			function(msg) {
				alert(msg)
			},
			success : option.success ||
			function() {
			},
			beforeSend : option.beforeSend || this.beforeSend,
			complete : option.complete || this.complete,
			timeout : option.timeout || this.timeout
		};

		if (o.type.toUpperCase() == "POST") {
			ajax.post(o.url, o.data, o.dataType, o.success, o.beforeSend, o.complete, o.timeout);
		} else if (o.type.toUpperCase() == "GET") {
			ajax.get(o.url, o.data, o.dataType, o.success, o.beforeSend, o.complete, o.timeout);
		}
	}
	Core.beforeSend = function() {
		
	}
	Core.complete = function() {
			
	}
	Core.timeout = function() {
				
	}

	module.exports = Core;
	
})








	