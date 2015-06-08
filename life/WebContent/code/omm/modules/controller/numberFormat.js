define(function(require,exports,module){
	//数字格式化模块
	
	//将数字转化为三位小数点的形式
	exports.addCommas=function(num){
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
	exports.subCommas=function(nStr){
		return nStr.toString().replace(/^0+/,'').replace(/,/g,'');
	}

	//阿拉伯数字转换为中文大写数字
	exports.chineseNum=function (num) { 
	if (!/^\d*(\.\d*)?$/.test(num)) { alert("Number is wrong!"); return "Number is wrong!"; } 
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



	
})