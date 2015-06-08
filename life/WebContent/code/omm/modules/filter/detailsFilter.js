'use strict';

define(function(require,exports,module){
	var app = require('common/app');
    //报表的数据格式过滤
    app.filter('chart',function(){
    	return function(input){
    		if(input.length == 0){
    			return false;
    		}
			var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:[input.navResult[0].name,input.navResult[1].name]
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : input.navDate
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:input.navResult[0].name,
			            type:'line',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:input.navResult[0].data
			        },
			        {
			            name:input.navResult[1].name,
			            type:'line',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:input.navResult[1].data
			        }
			    ]
			};               	
			return option;	
    	}
    	
    });
    
    //货币基金的图形配置
    app.filter('chart2',function(){
    	return function(input){
    		var option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:[input.navResult[0].name]
				    },
				    toolbox: {
				        show : false,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : input.navDate
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:input.navResult[0].name,
				            type:'line',
				            stack: '总量',
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data:input.navResult[0].data
				        }
				    ]
				};
	       return option;
    	}
    });
    app.filter('chart3',function(){
    	return function(input){
    		if(input.length == 0){
    			return false;
    		}
    		//重组数据
    		var xAxisData = [],seriesData = [];
    		for(var i = 0; i< input.length; i++){
    			var _item = input[i];
    			xAxisData.push(_item.infopubldate);
    			seriesData.push(_item.dailyprofit);
    		}
    		var option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['万份收益（元）']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				            restore : {show: true},
				            saveAsImage : {show: false}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : xAxisData 		//['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'万份收益（元）',
				            type:'line',
				            stack: '总量',
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data: seriesData 		//[120, 132, 101, 134, 90, 230, 210]
				        }
				    ]
				};
    		return option;
    	}
    });
    
    //一个测试的过滤器,针对测试环境上面 “专项理财净值型” 
    app.filter('test',function(){
    	return function(){
    		var option = {"tooltip":{"trigger":"axis"},"legend":{"data":["沪深300指数","交银成长基金收益百分比"]},"toolbox":{"show":false,"feature":{"mark":{"show":true},"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar","stack","tiled"]},"restore":{"show":true},"saveAsImage":{"show":true}}},"calculable":true,"xAxis":[{"type":"category","boundaryGap":false,"data":["2015-04-08","2015-04-09","2015-04-10","2015-04-11","2015-04-12","2015-04-13","2015-04-14"]}],"yAxis":[{"type":"value"}],"series":[{"name":"沪深300指数","type":"line","stack":"总量","itemStyle":{"normal":{"areaStyle":{"type":"default"}}},"data":[0,-0.06,0.04,-1.61,-1.72,-1.86,-3.44]},{"name":"交银成长基金收益百分比","type":"line","stack":"总量","itemStyle":{"normal":{"areaStyle":{"type":"default"}}},"data":[0,0.94,1.05,-1.18,0.38,1.12,-1.89]}]}; 
    		return option;	
    	};
    });
    
    app.filter('%',function(){
    	return function(str){
    		return str+'%';
    	}
    });
    
    app.filter('nColor',function(){
    	return function(num){
    		return num;
    		/*
    		if(num){
    			var isHave = false;
    			if(num.toString().indexOf('%') != -1){
	    			num = num.replace(/%/,'');
	    			isHave = true;
	    		}
	    		if(Number(num) < 0){
	    			if(isHave){
	    				return '<span style="color:blue">num%</span>';
	    			}else{
	    				return '<span style="color:blue">num</span>';
	    			}
	    		}else{
	    			return num;
	    		}
    		}
    		*/
    	}
    })
    
	module.exports = app;
})