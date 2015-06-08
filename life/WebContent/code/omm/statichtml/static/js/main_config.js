 // seajs 的简单配置
seajs.config({
	// Sea.js 的基础路径
	base: "img2/",
	// 路径配置
	paths: {
		'img2': '/demo-seajs/img2'
	},
	// 别名配置
	alias: {			
		'jquery':   'img2/lib/jquery/1.7.2/jquery.min',
		'jqm': 		'img2/lib/js/jquery.mobile-1.4.3.min',
		'swdbase':  'img2/js/Sanweidu.base',
	},
	
})