define(function(require, exports, module){
	/**
	 * 填充器
	 * 将指定值填充到指定位数，可以左向或右向
	 * 场景：时间填充，当时间小于10时填充到两位
	 * 
	 */
	var app = require('common/app');
	
	module.exports = app.filter('pad', function(){
		
		/**
		 * @param value 当前需要进行过虑器处理的值 
		 * @param length 填充的长度
		 * @param  direction 方向，可以支持向左或向右填充-1:向左， 1向右
		 */
		return function(value, length, elem, direction){
			length || (length = 2);
			elem || (elem = '0');
			direction || (direction = -1);
			
			if(value === '' || length <=0 ){return value;}
			value = value+'';
			var len = value.length;
			
			if(len >= length){ return value; }
			
			length = length-len;
			
			while(length--){
				value = direction == -1 ? elem+value : value+elem;
			}
			
			return value;
		}
	});
});