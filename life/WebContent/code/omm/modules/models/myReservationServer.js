define(function(require,exports,module){
	App = require('../common/config');
	function myReservationService(){}
	//获取数据的过程
	myReservationService.prototype.getOrderById = function(send,successCall,errCall){
		
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
	module.exports = myReservationService;
})
