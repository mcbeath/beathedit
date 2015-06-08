define(function(require,exports,module) {
	require('common/init_sdc_m');
	var Com = {};
	/**
	 * 获取URL参数
	 * @return {String} name
	 */
	Com.getParams = function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if(r) {
	        return decodeURI(r[2]);
	    }
	    return null;
	}
	
	/**
	 * Cookie操作
	 */
	 Com.Cookie = function(key, value, options) {
	    if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
	        options = options || {};
	        if(value === null || value === undefined) {
	            options.expires = -1;
	        }
	        if( typeof options.expires === 'number') {
	            var days = options.expires, t = options.expires = new Date();
	            t.setDate(t.getDate() + days);
	        }
	        value = String(value);
	
	        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
	    }
	    options = value || {};
	    var decode = options.raw ? function(s) {
	        return s;
	    } : decodeURIComponent;
	    var pairs = document.cookie.split('; ');
	    for(var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
	        if(decode(pair[0]) === key)
	            return decode(pair[1] || '');
	    }
	    return null;
	}
	
	//阿拉伯数字转换为中文大写数字
	Com.chineseNum=function (num) { 
		if (!/^\d*(\.\d*)?$/.test(num)) { return 0; } 
		var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); 
		var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", ""); 
		var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = ""; 
		for (var i = a[0].length - 1; i >= 0; i--) { 
			switch (k) { 
				case 0: re = BB[7] + re; break; 
				case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) 
				re = BB[4] + re; break; 
				case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break; 
			} 
			if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re; 
			if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++; 
		} 

		if (a.length > 1) //加上小数部分(如果有小数部分) 
		{ 
			re += BB[6]; 
			for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]; 
		} 
		return re; 
	} 
	
	//将数字转化为三位小数点的形式
	Com.addCommas=function(num){
		if(isNaN(this.subCommas(num))){
			return false;
		}else{
			var numStr=this.subCommas(num).toString();
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(numStr)) {
				numStr = numStr.replace(rgx, '$1' + ',' + '$2');
			}
			return numStr;
		}
	}

	//去除数字字符串中的前导'0'及','
	Com.subCommas=function(nStr){
		return nStr.toString().replace(/^0+/,'').replace(/,/g,'');
	}
	
    /**
     * 提示网络错误,提交失败
     */
    Com.networkFail = function(){
        var check = document.getElementsByClassName('product_money_box');
        if(check.length==0){
            var box = document.createElement('div');
            box.className="product_money_box";
            var div1 = document.createElement('div');
            div1.className = "product_bbox";
            var div2 = document.createElement('div');
            div2.className = "product_mbox";
            var img = document.createElement('img');
            img.src = "static/images/pro/connection_disable.png";
            img.style.height = "140px";
            var p1 = document.createElement('p');
            p1.innerText = "哎哟，网络不给力";
            var p2 = document.createElement('p');
            p2.innerText = "网络问题提交不成功,请稍后再试";
            p2.className = "product_money_txt";
            var p3 = document.createElement('p');
            var a = document.createElement('a');
            a.text = "好的";
            a.className = "product_box_btn";
            a.addEventListener("click",function(){box.style.display= "none"});
            div2.appendChild(img);
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3).appendChild(a);
            box.appendChild(div1);
            box.appendChild(div2);
            document.body.appendChild(box);
       }
        else{
           check[0].style.display ="block";
       }
    };

    /**
     * 提示加载中
     */
    Com.loading = function(){
        var check = document.getElementsByClassName('login_loading');
        if(check.length==0){
            var box = document.createElement('article');
            var div1 = document.createElement('div');
            div1.className = "login_loading";
            var div2 = document.createElement('div');
            div2.className = "loading";
            div1.appendChild(div2);
            box.appendChild(div1);
            document.body.appendChild(box);
        }
        else{
            check[0].style.display ="block";
        }
    };

    /**
     * 加载完毕
     */
    Com.loaded = function(){
        document.getElementsByClassName('login_loading')[0].style.display ="none";
    };
    
	/**
	 * header中的返回按钮
	 */
	Com.back = function(){
		var f = Com.getParams('f') || null;
		if(f){
			window.history.go(-2);
		}else{
			window.history.go(-1);
		}
	}
	
	/**
	 * header中的完成按钮 
	 * 实际的页面中需要重写方法
	 */
	Com.complete = function(){
		
	}
	//公共触发事件
	
	if(typeof(Zepto)!='undefined'){
		$('#headerLeft').on('touchstart',function(){
			Com.back();
		});
		
		$('#headerRight').on('touchstart',function(){
			Com.complete();
		});
	}
	
	module.exports = Com;
})