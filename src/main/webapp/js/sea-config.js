seajs.config({
		// 基础路径
		base: 'http://localhost:8080/LRecruit/',
		// 路径配置
//		paths: {
//			'js': '../js',
//			'css': '../css'
//		},
		// 别名配置
		alias: {
			'jquery': 'js/jquery.js'
		},
		//预先加载
		// preload: [
		// 	'http://st01.chrstatic.com/themes/pcchinahr/js/jquery',
		// ],

		// 文件编码
		charset: 'utf-8'
	})