seajs.use('./modules/controller/fund/publicFundList', function(fund){
	/**
	 * 公募基金列表页
	 * 调用定义的基金controller
	 * 一个页面引入一个文件，所有相关逻辑存放在fund文件夹中如services, director等。
	 * 
	 * 
	 */
	fund.run();
});