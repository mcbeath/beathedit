/*
 * Created with Apatana.
 * 相关表单验证的方法集
 */
define(function(require,exports,module){
	function validate(){}
	/**
	 * 执行正则表达式
	 * @param re 匹配的正则表达式
	 * @para s 匹配的字符串
	 */
	validate.prototype.executeExp = function(re, s){
	    return re.test(s);
	}
	
	/**
	 * 执行正则表达式
	 * @param re 匹配的正则表达式
	 * @para s 匹配的字符串
	 */
	function executeExp(re, s)
	{
	    return re.test(s);
	}
	
	validate.prototype.trim = function(str){
		if ( typeof str == 'string')
			return str.replace(/(\s*$)/g, '');
		else
			return str;
	}
	
	/**
	 * 判断字符串是否为空
	 * @param strValue 字符串
	 */
	validate.prototype.isEmpty = function(strValue){
		strValue = this.trim(strValue);
		if(strValue.length == 0)
			return true;
		else	
			return false;	
	}
	
	/**
	 * 判断是否是正确的日期,正确格式为:yyyy-mm-dd
	 * @param strValue 日期字符串
	 */
	validate.prototype.isDate = function(strValue)
	{
		if(this.isEmpty(strValue))
			return false;
		var r = strValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)
			return false; 
		var d= new Date(r[1], r[3]-1, r[4]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);	
	}
	
	/**
	 * 判断字符串是否为字母或数字
	 * @param strValue 
	 */
	validate.prototype.isAlphaNumeric = function(strValue)
	{
		if(this.isEmpty(strValue))
			return false;
	    // 只能是 A-Z a-z 0-9 之间的字母数字 或者为空
		var pattern = /^[A-Za-z0-9]+$/;
	    return executeExp(pattern, strValue);
	}
	
	/**
	* 判断是否为中文、英文、字母或_
	*/
	validate.prototype.isCnAndEnNumeric = function(strValue)
	{
		var  pattern = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;  
		return executeExp(pattern, strValue);
	}
	
	/**
		判断是否为中文
	**/
	validate.prototype.isCnAndEn = function(strValue)
	{
		if (this.isEmpty(strValue))
			return false;
		
		var pattern = /^[u4E00-u9FA5]+$/;
		
		return executeExp(pattern, strValue);
	}
	
	/**
	 * 判断是否是正确的Email
	 * @param strValue
	 */
	validate.prototype.isEmail = function(strValue)
	{
		if(this.isEmpty(strValue))
			return false;
	    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	    return executeExp(pattern, strValue);
	}
	
	/**
	 * 判断是否是货币
	 * @param strValue
	 */
	validate.prototype.isMoney = function(strValue)
	{
		if(this.isEmpty(strValue))
			return false;
		var pattern = /^[+-]?\d+(,\d{3})*(\.\d+)?$/;
	    return executeExp(pattern, strValue);
	}
	
	/**
	 * 判断是否为数字
	 * @param strValue
	 */
	validate.prototype.isNumeric = function(strValue)
	{
		if (this.isEmpty(strValue))
			return false;
		var pattern = /^[0-9]*$/;
	    return executeExp(pattern, strValue);
	}
	
	/**
	 * 判断是否为浮点数（不带正负号）
	 * @param strValue
	 */
	validate.prototype.isNumberFloat = function(strValue)
	{
		if (this.isEmpty(strValue)) 
			return false;
		var pattern = /^\d+(\.\d+)?$/;
	    return executeExp(pattern, strValue);
	}
	
	/***
	 * 是否为价格
	 * @param {Object} strValue
	 * @return {TypeName} 
	 */
	validate.prototype.isPirce = function(strValue){
		var p =/^[1-9](\d+(\.\d{1,2})?)?$/; 
		var p1=/^[0-9](\.\d{1,2})?$/;
		return p.test(strValue) || p1.test(strValue);
	}
	/**
	 * 判断是否为手机号码
	 * @param strValue
	 */
	validate.prototype.isMobile = function(strValue)
	{
		if (this.isEmpty(strValue))
			return false;
		var pattern = /^(13|14|15|18)[0-9]{9}$/;
	
	    return executeExp(pattern, strValue);
	}
	
	
	/**
	 * 判断是否为电话
	 * @param strValue
	 */
	validate.prototype.isPhone = function(strValue)
	{
		if (this.isEmpty(strValue)) 
			return false;
		var pattern = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-?\d+$)|(^(1)[0-9]{10}$)/;
	    return executeExp(pattern, strValue );
	}
	
	/**
	 * 判断是否为固话
	 * @param strValue
	 */
	validate.prototype.isTel = function(strValue)
	{
		if (this.isEmpty(strValue)) 
			return false;
		var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{6,8})(-(\d{3,}))?$/;
	    return executeExp(pattern, strValue );
	}
	
	/**
	 * 判断是否为邮政编码
	 * @param strValue
	 */
	validate.prototype.isPostalCode = function(strValue)
	{
		if (this.isEmpty(strValue)) 
			return false;
		var pattern = /(^\d{6}$)/;
	   	return executeExp(pattern, strValue)
	}
	
	/**
	 * 判断是否是证券股东帐号
	 * type:股东帐号类型；sza：深A；szb：深B；sha：沪A；shb：沪B；shl:沪基金;
	 */
	validate.prototype.isStockAccount = function(strValue,type){
		if(this.isEmpty(strValue) || strValue.length<10){
			return false;
		}
		if(!type || type.length<1){
			type = "sha";
		}
		var flag = false;
		if(type=="sha"){
			flag = isShA(strValue);
		}else if(type=="shb"){
			flag = isShB(strValue);
		}else if(type=="sza"){
			flag = isSzA(strValue);
		}else if(type=="szb"){
			flag = isSzB(strValue);
		}else if(type=="shl"){
			flag = isShL(strValue);
		}
		return flag;
	}
	
	/**
	 * 是否沪A帐号
	 */
	validate.prototype.isShA = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		var firstChar = account.substr(0,1)+"";
		var afterChar = account.substr(1)+"";
		if(firstChar.toLowerCase()=="a"){
			if(afterChar.length==9 && /^\d+$/.test(afterChar)){
				flag = true;
			}
		}
		return flag;
	}
	
	/**
	 * 是否沪基金
	 */
	validate.prototype.isShL = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		var firstChar = account.substr(0,1)+"";
		var afterChar = account.substr(1)+"";
		if(firstChar.toLowerCase()=="f"){
			if(afterChar.length==9 && /^\d+$/.test(afterChar)){
				flag = true;
			}
		}
		return flag;
	}
	
	/**
	 * 是否沪A帐号
	 */
	validate.prototype.isShA = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		var firstChar = account.substr(0,1)+"";
		var afterChar = account.substr(1)+"";
		if(firstChar.toLowerCase()=="a"){
			if(afterChar.length==9 && /^\d+$/.test(afterChar)){
				flag = true;
			}
		}
		return flag;
	}
	
	/**
	 * 是否沪B帐号
	 */
	validate.prototype.isShB = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		var firstChar = account.substr(0,1)+"";
		var afterChar = account.substr(1)+"";
		if(firstChar.toLowerCase()=="c"){
			if(afterChar.length==9 && /^\d+$/.test(afterChar)){
				flag = true;
			}
		}
		return flag;
	}
	
	/**
	 * 是否深A帐号
	 */
	validate.prototype.isSzA = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		if(account.length==10 && /^\d+$/.test(account)){
			flag = true;
		}
		return flag;
	}
	
	/**
	 * 是否深B帐号
	 */
	validate.prototype.isSzB = function(account){
		if(this.isEmpty(account) || account.length<10){
			return false;
		}
		var flag = false;
		if(account.length==10 && /^\d+$/.test(account)){
			flag = true;
		}
		return flag;
	}
	
	/**
	 * 判断是否为合法的URL
	 * @param strValue
	 */
	validate.prototype.isURL = function(strValue)
	{
		if (this.isEmpty(strValue)) 
			return false;
	    var pattern = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/;
	    return executeExp(pattern, strValue);
	}
	
	/**
	 * 验证身份证的有效性
	 * @param objName 身份证ID
	 */
	validate.prototype.isCardID = function(strValue)
	{
		
		if(this.isEmpty(strValue))
		{
			return false;	
		}
	
		//如果身份证的长度不合法，15位或18位
		if(!((strValue.length == 15) || (strValue.length == 18)))
		{
			//strMsg = "【身份证】 长度错误，请输入15位或者18位有效位数！\n";
			return false;
		}
		else
		{
			var year;
			if(strValue.length == 15)
			{
				year = parseInt(strValue.substr(6,2)) + 1900;
			}
			else if(strValue.length == 18)
			{
				year = parseInt(strValue.substr(6,4))
			}
			else
			{
				year = 0;
			}
			if((year < 1900) || (year > (new Date()).getFullYear() ))
			{			
				//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
				return false;
			}
			else
			{
				var month = 0;			
				if(strValue.length == 15) month = strValue.substr(8,2);
				if(strValue.length == 18) month = strValue.substr(10,2);
				if((month < 1)||(month > 12))
				{					
					//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
					return false;
				}
				else
				{
					var day = 0;
					if(strValue.length == 15) day = strValue.substr(10,2);
					if(strValue.length == 18) day = strValue.substr(12,2);
					if((day < 1)||(day > 31))
					{				
						//strMsg = "【身份证】 出生日期非法，请输入正确的日期！\n";
						return false;
					}
				}
			}
		}
		return true;
	}
	
	module.exports = new validate();
})
