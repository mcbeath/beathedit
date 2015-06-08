define(function(require, exports, module){
	/**
	 * 基金搜索
	 * 
	 * 
	 */
	var ng = require('angularjs'),
//		app = require('common/app'),
        app = require('directive/renderComplate'),
		IScroll = require('iscroll');
	
	//加载基本服务接口
	require('models/fundService');
	
	app.controller('SearchFundController', ['FundService', '$scope', 'URLS', function(FundService, $scope, urls){
		//初始化iscroll控件
		var scroller = new IScroll('#scroller', { probeType:2, tap: true, click: true });
		
		scroller.on('scroll', function(){
			var self = this;
			
			//向下
			if(self.y <= self.maxScrollY){
				if($scope.fund.directive != 1){
					$scope.$apply(function(){
						fund.directive = 1;
					});
				}
				
				if(self.y <= self.maxScrollY-50 && $scope.fund.loaded == 0){
					$scope.$apply(function(){
						$scope.fund.loaded = 1;
					});
				}
			}
			//向上。
//			if(self.y >= 0){
//				$scope.$apply(function(){
//					$scope.fund.directive = -1;
//				});
//				
//				if(self.y > 10){
//					$scope.$apply(function(){
//						$scope.fund.loaded = 1;
//					});
//				}
//			}
		});
		
		scroller.on('scrollEnd', function(){
			var self = this;
			
			if(self.y == self.maxScrollY && $scope.fund.loaded == 1 ){
				$scope.$apply(function(){//发起请求，不能重复调用 
					$scope.fund.loaded = 3;
				});
				fund.load();
			}
			scroller.refresh();
			
//			if(self.y == 0){
//				$scope.$apply(function(){
//					$scope.fund.directive = 0;
//				});
//			}
		});
		
		
//		window.scroller = scroller;
		
		var fund = {
				//当前页码
				page: 1,
				//总页码
				totalPages: 1,
				//当前 搜索的关键字
				key: '',
				//最后一次输入，会在服务器返回后清空
				lastkey: null,
				//滑动方向
				directive: 0,
				//加载状态,0加载中，1加载完成
				loaded: 0, 
				//搜索方法
				search: function(key){
					var self = this,
						page = self.page;
					
					if(!key){return;}
					
					//控制输入频率
					if(self.lastkey){ 
						self.lastkey = key;
						return;
					}
					
					self.key = key;
					self.lastkey = key;
					
					~function _search(key){
						FundService.search({searchKey: encodeURIComponent(key), curPage: self.page}, function(data){
							console.log('search...');
							if(data.resultCode || !data.dbPage){ self.lastkey = null;alert('系统异常');return; }
							
							self.totalPages = data.dbPage.totalPages;
							self.page = data.dbPage.currentPage;
							
							self.results = data.dbPage.data || [];
							
							//搜索的关键字是否与最后一次输入的相同，如不同则再次发起请求
							if(self.lastkey != key){
								_search(self.lastkey);
							}else{
								self.lastkey = null;
							}
						});
					}(key);
				},
				//加载更多
				load: function(){
					var self = this;
					
					if(!self.key){return;}
					//最后一页
					if(self.page >= self.totalPages){ return; };
					
					self.page++;
					
					FundService.search({searchKey: encodeURIComponent(self.key), curPage: self.page}, function(data){
						if(data.resultCode || !data.dbPage){ alert('系统异常');return; }
						self.loaded = 0;
						self.directive = 0;
						self.page = data.dbPage.currentPage;
						
						self.results = self.results.concat(data.dbPage.data || []);
					});
				},
				//跳转
				go: function(id){
					window.location.href = urls.PUBLIC_FUND_DETAIL+'?id='+id
				}
		};

        fund.scroller = scroller;

		$scope.fund = fund;
		
		
	}]);
	
	
	//导出公共方法，启动angular,一个页面启动一次。
	exports.run = function(){
		//启动
		ng.element(window.document).ready(function(){
			ng.bootstrap(document, ['ow'])
		});
	}
	
});