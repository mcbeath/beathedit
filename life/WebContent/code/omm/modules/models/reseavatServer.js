define(function(require,exports,module){
	App = require('../common/config');
	function reseavatService(){}
	//获取数据的过程
	reseavatService.prototype.getOrderById = function(send,successCall,errCall){
		
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
	module.exports = reseavatService;
})
