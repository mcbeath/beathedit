define(function(require, exports, module){
	/**
	 * 专项基金主要逻辑
	 * 包括推荐、各列表页显示等。
	 *  http://localhost:8080/servlet/finance/FundAction.do?function=PlainlicaiInfo&productno=519692
	 * 
	 * 
	 */
	var ng = require('angularjs'),
		app = require('directive/timer'),
		IScroll = require('iscroll');
	
	//加载基本服务接口
	require('models/fundService');
	
	app.controller('SpecialFundListController', ['FundService', '$scope', 'URLS', function(FundService, $scope, urls){
		//初始化iscroll控件
		var scroller1 = new IScroll('#scroller1', { probeType:2, tap: true, click: true });
		var scroller2 = new IScroll('#scroller2', { probeType:2, tap: true, click: true });

		scroller1.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller1.on('scrollEnd', function(){
			_end.call(this);
			scroller1.refresh();
		});

        scroller2.on('scroll', function(){
			_scroll.call(this);
		});

		scroller2.on('scrollEnd', function(){
			_end.call(this);
			scroller2.refresh();
		});
		
		//滚动
		function _scroll(){
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
		}
		
		//结束
		function _end(){
			var self = this;
			
			if(self.y == self.maxScrollY && $scope.fund.loaded == 1 ){
				$scope.$apply(function(){//发起请求，不能重复调用 
					$scope.fund.loaded = 3;
				});
				fund.load();
			}
		}
		
		var fund = {
				//当前页码
				page: 1,
				//总页码
				totalPages: 1,
				//滑动方向
				directive: 0,
				//加载状态,0加载中，1加载完成
				loaded: 0,
				//页面上tab显示状态
				//根据tabs菜单的顺序位置来定
				status: 1,
				//切换菜单动作
				switchTab: function(index){
					var self = this;
					
					//切换时重置
					self.page = 1;
					self.totalPages = 1;
					self.directive = 0;
					self.loaded = 0;
					
					//读取股票型公募基金信息
					if(self.status == 2){
						_queryStockPublicFund($scope, {
							t: 'curSpecialFunds',
							curPage: 1,
                            type: self.status-1
						});
					}
                    else if(self.status == 3){
                        _queryStockPublicFund($scope, {
                            t: 'oldSpecialFunds',
                            curPage: 1,
                            type: self.status-1
                        });
                    }
				},
				//滑动加载更多 
				load: function(){
					var self = this;
					var _t = self.status==2?"curSpecialFunds":"oldSpecialFunds";
					//最后一页
					if(self.page >= self.totalPages){ return; }
					self.page++;
					
					_queryStockPublicFund($scope, {
							t: _t,
							curPage: self.page,
                            type: self.status-1,
							action: 'load'
						});
				},
				//跳转到详情页
				go: function(id){
					window.location.href = urls.SPECIAL_FUND_DETAIL+'?id='+id
				}
		};
		
		$scope.fund = fund;
		
		/**
		 * 加载专项理财基金列表
		 * 
		 * 
		 */
		function _queryStockPublicFund($scope, params){
			
			FundService.getSpecialFundList(params, function(data){
				if(data.resultCode){ alert('系统异常');return; }
				
				if(params.action == 'load'){
						$scope.fund.loaded = 0;
						$scope.fund.directive = 0;
						$scope[params.t] = $scope[params.t].concat(data.dbPage.data || []);
					}else{
						$scope.fund.totalPages = data.dbPage.totalPages;
						$scope[params.t] = data.dbPage.data;
					}
					
					$scope.fund.page = data.dbPage.currentPage;
				
			});
		}
		
	}]);
	
	
	//导出公共方法，启动angular,一个页面启动一次。
	exports.run = function(){
		//启动
		ng.element(window.document).ready(function(){
			ng.bootstrap(document, ['ow'])
		});
	}
	
});