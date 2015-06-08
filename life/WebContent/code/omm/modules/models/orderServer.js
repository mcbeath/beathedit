define(function(require, exports, module){
	function orderService(){}
	//获取数据的过程
	orderService.prototype.getOrderById = function(send,successCall,errCall){
		$.ajax({
			url:send.url,
			type:'POST',
			data:send.data,
			success:function(){
				successCall
			},
			error:function(){
				errCall();
			}
		})
		
	}
	module.exports = orderService;
})