define(function(require,exports,module){
	var $ = require('js/jquery.js');
	require('js/Date.js')($);
	
	var date = new Date();// 初始化生日
	datepicker({
		ele:"#birthDay",
		num:"0",
		startYear:date.getFullYear() - 15,
		beginY:1949,
		endY:date.getFullYear() - 15,
		startMonth:1,
		cb:function(data){
		}
	});
	datepicker({
		ele:"#getEduStartTime",
		num:"0",
		startYear:date.getFullYear() - 15,
		beginY:1949,
		startMonth:1,
		cb:function(data){
		}
	});
	datepicker({
		ele:"#getEduEndTime",
		num:"0",
		startYear:date.getFullYear() - 15,
		beginY:1949,
		startMonth:1,
		cb:function(data){
		}
	});
	// 初始化日期控件
    function datepicker(obj){
		$(obj.ele).manhuaDate({
			ele:"#birthDay",
			Event : "click",// 可选
			fuhao : "-",// 日期连接符默认为-
			isTime : false,// 是否开启时间值默认为false
			beginY : (obj.beginY)?obj.beginY:1949,// 年份的开始默认为1949
			endY : (obj.endY)?obj.endY:2020,
			suesFun : function(selectedDate,insy){
				if(obj.cb){
					obj.cb(selectedDate);
				}
			},
			isNow:obj.num,
			startYear:obj.startYear,
			startMonth:obj.startMonth
		});
	};
});