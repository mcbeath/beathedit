define(function(require, exports, module){
	var IScroll = require('iscroll'),
		$ = require('jquery');
	
		var scroller = new IScroll('#scroller', { probeType:2, mouseWheel: true, tap: true });

		scroller.on('scrollEnd', function(){
			var self = this;
			
			$(self.wrapper).find('.pullDownLabel').text('向下拉动加载更多');
			$(self.wrapper).find('.pullUpLabel').text('向上拉动加载更多');
			
			if(self.y == self.maxScrollY){
				var last = $(self.wrapper).find('.last').addClass('hidden');
				
				$($('#item-template').html()).insertBefore(last);
				scroller.refresh();
			}
			
			if(self.y == 0){
				$(self.wrapper).find('.first').addClass('hidden');
			}
		});
		
		scroller.on('scroll', function(){
			var self = this;
			
			if(self.y <= self.maxScrollY){
				$(self.wrapper).find('.last').removeClass('hidden');
				
				if(self.y < self.maxScrollY-50){
					$(self.wrapper).find('.pullUpLabel').text('加载中...');
				}
			}
			
			if(self.y >= 0){
				$(self.wrapper).find('.first').removeClass('hidden');
				
				if(self.y > 10){
					$(self.wrapper).find('.pullDownLabel').text('加载中...');
				}
			}
		});	
		
});