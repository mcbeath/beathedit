define(function(require,exports,module){
	App = require('../common/config');
	function myOrderService(){}
	myOrderService.prototype.getData=function(send,succ,err){
		$.ajax({
			url : send.url,
			type : 'GET',
			data : send.data,
			dataType : 'json',
			success : function(result){
				succ(result);
			},
			error: function(xhr, type) {
				if (typeof errCall == 'function')
					errCall(type);
			}
		});
	}
	
	module.exports=myOrderService;
	
})
