seajs.config({
	//基础路径配置
    base: "./modules/",
//    base : "/webRoot/mobile/modules/",
    //plugins: ['shim'],
    //别名
    alias: {
	     "jquery": "lib/jquery/jquery.1.11.2",
	     "angularjs": "lib/angular/angular",
	     "angular-touch":"lib/angular/angular-touch",
	     "zepto": "lib/zepto/zepto",
	     "underscore":"lib/underscore/underscore",
	     "echart":"lib/echart/echarts",
	     "iscroll": 'lib/iscroll/iscroll-probe',
	     "ccsk": 'lib/ccsk/cc-sk-2.3.4-zepto'
	},
    //路径配置
    paths:{},
    //变量配置
    vars:{	
    	'product':'u.pingan.com',
    	'stg':'dmzstg1.pa18.com'
    },
    //预加载项
    preload:[
    	
    ],
    //映射配置
    map:[
    	//[/^(.*\.(?:css|js))(.*)$/i, '$1?_='+Math.random()]		  //去除缓存
    ],
    //调试模式
    debug:true,
    //文件编码
    charset:'utf-8'
});

// 将 jQuery 暴露到全局
//seajs.modify('jquery', function(require, exports) {
//  window.jQuery = window.$ = exports;
//});
//seajs.modify('ccsk', function(require, exports, module) {
//  module.exports = $.getCCSKeyPad;
//});