define(function(require, exports, module){
	/**
	 * 公募基金主要逻辑
	 * 包括推荐、各列表页显示等。
	 * 
	 * 
	 * 
	 */
	var ng = require('angularjs'),
		app = require('directive/renderComplate'),
		IScroll = require('iscroll');
	
	//加载基本服务接口
	require('models/fundService');
	
	app.controller('PublicFundListController', ['FundService', '$scope', 'URLS','$interval','$filter','$timeout', function(FundService, $scope, urls, $interval, $filter, $timeout){

        var arrPic = document.getElementById('banner').getElementsByTagName('img');
        var arrDot = document.getElementById('dot').getElementsByTagName('span');

        /* 探测浏览器种类 */
        function whichTransitionEvent(){
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };
            for(var t in transitions){
                if( el.style[t] !== undefined ){
                    return transitions[t];
                }
            }
        }
         /**
          *监听变换事件!
          *注意：由于同时有两个图片在移动，所以该方法会触发两次
          * （因为increaseSelection和jump方法里同时修改了两个图片的属性）
          */
        var transitionEvent = whichTransitionEvent();
        var canClear = true;
        for(var e = 0; e < arrPic.length; e++){
            arrPic[e].addEventListener(transitionEvent, function() {
                //由于该事件会触发两次，只需要做一次处理就行
                if(canClear){
                    //如果是点击跳转，则把当前图片（移到左边的动画效果播放完毕后）移到右边
                    if(canJump){
                        clear(arrPic[numOld]);
                        canJump = false;
                    }
                    else{
                        //如果是正常轮播，则把当前图片（移到左边的动画效果播放完毕后）移到右边
                        clear(left);
                    }
                    //提示动画已执行，可以接受点击跳转指令
                    canclick = true;
                }
                canClear = !canClear;
            });
        }

        $scope.selection = 0;

        var left = arrPic[0], right = arrPic[1], next;
        var increaseSelection = function(){
            canclick = false;
            left = arrPic[$scope.selection];
            left.className = 'swipeleft';
            arrDot[$scope.selection].className = '';
            $scope.selection = ($scope.selection+1)%4;
            right = arrPic[$scope.selection];
            right.className = 'swipein';
            arrDot[$scope.selection].className = 'cur';
            //原用于控制下一张即将出现的图片，将其设置为display=block，实现隐藏移动动画的效果，并不可取
//            next = arrPic[($scope.selection+1)%4];
//            next.style.display = 'block';
        };
        var interval = $interval(increaseSelection,3000);

        $scope.saveInterval = function(){
            $interval.cancel(interval);
        };
        $scope.restoreInterval = function(){
            interval= $interval(increaseSelection,3000);
        };

        //将元素隐式移动到右端
        var clear = function(obj){
            obj.style.display = 'none';
            obj.className = 'swiperight';
            function delay(){
                obj.style.display = 'block'
            }
            $timeout(delay ,10);
        };

        var numOld = 0, canJump = false ,canclick = true;
        $scope.jump = function(n){
            //canclick: 如果动画播放完毕，则可点击
            if(canclick){
                canclick = false;
                //numOld: 当前显示的图片的编号
                numOld = $scope.selection;
                if(numOld != n){
                    canJump = true;
                    //n: 选中的图片编号
                    $scope.selection = n;
                    arrPic[numOld].className = 'swipeleft';
                    arrDot[numOld].className = '';
                    arrPic[n].className = 'swipein';
                    arrDot[n].className = 'cur';
                }
            }
        };

		//初始化iscroll控件
		var scroller1 = new IScroll('#scroller1', { probeType:2, tap: true, click: true }),
			scroller2 = new IScroll('#scroller2', { probeType:2, tap: true, click: true }),
			scroller3 = new IScroll('#scroller3', { probeType:2, tap: true, click: true }),
			scroller4 = new IScroll('#scroller4', { probeType:2, tap: true, click: true }),
			scroller5 = new IScroll('#scroller5', { probeType:2, tap: true, click: true });
		
		scroller1.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller1.on('scrollEnd', function(){
			_end.call(this);
		});
		
		scroller2.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller2.on('scrollEnd', function(){
			_end.call(this);
			scroller2.refresh();
		});
		
		scroller3.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller3.on('scrollEnd', function(){
			_end.call(this);
			scroller3.refresh();
		});
		
		scroller4.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller4.on('scrollEnd', function(){
			_end.call(this);
			scroller4.refresh();
		});
		
		scroller5.on('scroll', function(){
			_scroll.call(this);
		});
		
		scroller5.on('scrollEnd', function(){
			_end.call(this);
			scroller5.refresh();
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
		
		
		//tabs对应关系
		var indexes = ['recommend','stockPublicFunds', 'mixedPublicFunds', 'bondPublicFunds', 'newPublicFunds', 'cashPublicFunds'];
		
		
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
					if(self.status > 1 && self.status <= indexes.length){
						
						_queryStockPublicFund($scope, {
							fundType: self.status,
							type: indexes[self.status-1],
							curPage: 1
						});
					}
				},
				//滑动加载更多 
				load: function(){
					var self = this;
					
					//最后一页
					if(self.page >= self.totalPages){ return; };
					self.page++;
					
					_queryStockPublicFund($scope, {
							fundType: self.status,
							type: indexes[self.status-1],
							curPage: self.page,
							action: 'load'
						});
				},
				//跳转到详情页
				go: function(id){
					window.location.href = urls.PUBLIC_FUND_DETAIL+'?id='+id;
				},
				//跳转到货币基金详情页
				goCash: function(id){
					window.location.href = urls.CASH_FUND_DETAIL+'?type=2&id='+id;
				},
				//新发基金
				goNew: function(id){
					window.location.href = urls.SPECIAL_FUND_DETAIL+'?id='+id;
				}
				
		};
		//滚动
		fund.scroller1 = scroller1;
		fund.scroller2 = scroller2;
		fund.scroller3 = scroller3;
		fund.scroller4 = scroller4;
		fund.scroller5 = scroller5;
		
		
		$scope.fund = fund;
        var orderBy = $filter('orderBy');
		
		/**
		 * 加载公募基金列表
		 * 
		 * 
		 */
		function _queryStockPublicFund($scope, params){
			//新发基金
			if(params.type == 'newPublicFunds'){
				FundService.getNewFundList(params, function(data){
					if(data.resultCode){ alert('系统异常');return; }
					
					
					if(params.action == 'load'){
						$scope.fund.loaded = 0;
						$scope.fund.directive = 0;
						$scope[params.type] = $scope[params.type].concat(data.dbPage.data || []);
					}else{
						$scope.fund.totalPages = data.dbPage.totalPages;
						$scope[params.type] = data.dbPage.data;
					}
					
					$scope.fund.page = data.dbPage.currentPage;
				});
			}else{
				FundService.getStockFundList(params, function(data){
					if(data.resultCode){ alert('系统异常');return; }
					
					if(params.action == 'load'){
						$scope.fund.loaded = 0;
						$scope.fund.directive = 0;
						$scope[params.type] = $scope[params.type].concat(data.dbPage.data || []);
					}else{
						$scope.fund.totalPages = data.dbPage.totalPages;
						$scope[params.type] = data.dbPage.data;
					}
					
					$scope.fund.page = data.dbPage.currentPage;
				});
			}

            /* 根据日涨幅进行排序 */
            $scope.order = function(predicate, reverse) {
                for(var i=0;i < $scope[params.type].length &&  typeof $scope[params.type][i].rrinsinglemonth != 'number'; i++ ){
                    if( !$scope[params.type][i].rrinsinglemonth )
                    continue;
                    $scope[params.type][i].rrinsinglemonth = Number($scope[params.type][i].rrinsinglemonth);
                }
                $scope[params.type] = orderBy($scope[params.type], predicate, reverse);
            };
			
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