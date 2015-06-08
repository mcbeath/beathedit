define(function(require, exports, module){
	App = require('../common/config');
	function orderService(){}
	//获取数据的过程
	orderService.prototype.getOrderById = function(send,successCall,errCall){
		console.log(send);
		console.log($);
		console.log(App);
		$.ajax({
			url: send.url,
			type: 'GET',
			data: send.data,
			dataType: 'json',
			success: function(result) {
				successCall(result);
			},
			error: function(xhr, type) {
				if (typeof errCall == 'function')
					errCall(xhr, type);
			}
		});
		
	}
	module.exports = orderService;
})