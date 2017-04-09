define(function(require, exports, module) {
	var $ = require("jquery");
	require("css/Date.css");
	$.fn.manhuaDate = function(options) {
		var todyobj = new Date();
		var defaults = {
			Event: "click", //插件绑定的响应事件
			Left: 0, //弹出时间停靠的左边位置
			Top: 42, //弹出时间停靠的上边位置
			fuhao: "-", //日期之间的连接符号
			isTime: false, //是否开启时间值默认为false
			beginY: 1949, //年份的开始默认为1949
			beginM: 1,
			endY: 2049, //年份的结束默认为2049
			endM:11,
			suesFun: function() {},
			range: false,
			fromDate:'',
			dateRange:'',
			rangeMark:'~',
			startYear: todyobj.getFullYear(),
			startMonth: todyobj.getMonth() + 1,
			endYear:todyobj.getFullYear()+1,
            endMonth:todyobj.getMonth() + 1
		}
		var options = $.extend(defaults, options);
		var bindEle = this;
		var temY = parseInt(options.startYear);
		var nowY = parseInt(options.startYear);
		var fromStartYear = options.startYear;
		var fromstartMonth = options.startMonth;
		var endstartYear = options.endYear;

		var Dates = {
			init: function() {
				var self = this;
				self.run();
			},
			run: function() {
				var self = this;
				bindEle.on(options.Event, function(e) {
					if (bindEle[0].isOpen) {
						if ($(".calender")) {
							self.close()
						}
					} else {
						bindEle[0].isOpen = true;
					}
					self.createDate();
					e.stopPropagation();
				});
			},
			closeNotTargetDom: function($this, $par, event, fun) {
				$(document).off("mouseup" + event)
				$(document).on("mouseup" + event, function(e) {
					if (!$this.is(e.target) && $this.has(e.target).length === 0) {
						if ($par) {
							if (!$par.is(e.target) && $par.has(e.target).length === 0) {
								fun();
							}
						} else {
							fun();
						}
					}
					e.stopPropagation();
				})
			},
			bindEvent: function(opt) {
				var self = this;
				var $calender = $(".calender." + opt.calenderType);
				//点击时间列表事件
				$("#" + opt.monthListId).off().on("click","td:not(.noClick)", function(e) {
					var y = parseInt($calender.find(".yearSelect").text());
					var m = $(this).data("num");
					var str = "" + y + options.fuhao + m;
					$("#" + opt.monthListId + " td").removeClass('hover');
					$(this).addClass('hover');
					switch(opt.calenderType){
						case 'from':
							options.fromDate = str;
							fromstartMonth = m;
							if(y == endstartYear){
								var lastMonth = $("#calender_to").find("td:not('.un.noClick'):last");
								$(lastMonth).parent().prev('tr').find("td").removeClass('hover un noClick')
								$(lastMonth).prevAll().removeClass('hover un noClick')
								$("#calender_to").find("td:lt("+(m - 1)+")").addClass('un noClick')
							}
							break;
						case 'to':
							if(!options.fromDate){
								options.fromDate = options.startYear + options.fuhao + options.startMonth;
							}
							str = options.fromDate + options.rangeMark + str;
							options.suesFun(str);
							bindEle.val(str);
							self.close()
							break;
						default:
							options.suesFun(str);
							bindEle.val(str);
							self.close()
							break;
					}
					e.stopPropagation();
				});

				$calender.find(".other:not(.range)").off().on("click", function(e) {
					$("#" + opt.monthListId + " td").removeClass('hover');
					var str = $(this).text();
					switch(opt.calenderType){
						case 'from':
							options.fromDate = str;
							break;
						case 'to':
							if(!options.fromDate){
								options.fromDate = options.startYear + options.fuhao + options.startMonth;
							}
							str = options.fromDate + options.rangeMark + str;
							options.suesFun(str);
							bindEle.val(str);
							self.close()
							break;
						default:
							options.suesFun(str);
							bindEle.val(str);
							self.close()
							break;
					}
					e.stopPropagation();
				})

				$calender.find(".yearSelect").off().on("click", function(e) {
					$calender.find(".calender_ys").toggleClass("on");
					var yy = parseInt($(this).text());
					var $arrow = $(this).find(".icon-ar");
					if ($arrow.hasClass("ar-dn")) {
						$arrow.removeClass("ar-dn").addClass("ar-up");
					} else {
						$arrow.removeClass("ar-up").addClass("ar-dn");
					}
					self.domYear(yy, opt.calenderType);
					e.stopPropagation();
				})
				$calender.find(".calender_ys_pre").off().on("click", function() {
					temY = temY - 10;
					self.domYear(temY, opt.calenderType);
				})
				$calender.find(".calender_ys_next").off().on("click", function() {
					temY = temY + 10;
					self.domYear(temY, opt.calenderType);
				})

				var selfDom = (options.range)?$(".calenderRangeMod"):$calender;
				this.closeNotTargetDom(selfDom, bindEle, '.calender', function() {
					self.close()
				})

			},
			createDate: function() {
				var self = this;
				if ($(".calender").length > 0) {
					self.close()
				}

				if (bindEle.val()) {
					if (bindEle.val() == "暂无工作经验" || bindEle.val() == "至今") {
						var startYear = options.startYear;
						var startMonth = options.startMonth;
					} else {
						if(options.range){
							var rangeArr = bindEle.val().split(options.rangeMark);
							var startDate = rangeArr[0];
							var endDate = rangeArr[1];
							var startArr = startDate.split(options.fuhao);
							var startYear = startArr[0];
							var startMonth = startArr[1];
							var endArr = endDate.split(options.fuhao);
							if(endArr == "暂无工作经验" || endArr == "至今"){
								var nowDate = new Date();
								options.endYear = nowDate.getFullYear();
								options.endMonth = nowDate.getMonth() + 1;
							}else{
								options.endYear = endArr[0];
								options.endMonth = endArr[1];
							}
						}else{
							var arry = bindEle.val().split(options.fuhao);
							var startYear = arry[0];
							var startMonth = arry[1];
						}
					}

				} else {
					var startYear = options.startYear;
					var startMonth = options.startMonth;
				}

				self.randerDom(startYear, startMonth);
			},
			randerDom: function(y, m) {
				var typeArr = [];
				var self = this;
				if (!options.range) {
					typeArr = ["defaultCalender"];
				} else {
					typeArr = ['from', 'to']
				}

				var $calenderDom = "";
				var $rangeDom = $('<div class="calenderRangeMod"></div>');

				$.each(typeArr, function(i, v) {
					var type = v;
					var typeMark = "_" + v;
					var yearListId = "laydate_ys_list" + typeMark;
					var monthListId = "calender" + typeMark;
					var other = "";
					var rangeTxt = '开始';
					if (options.isNow == "1") {
						other = "<div class='other'>暂无工作经验</div>";
					} else if (options.isNow == "2") {
						other = "<div class='other'>至今</div>";
					}
					if(type == 'from'){
						other = "<div class='other range'>&nbsp;</div>";
					}
					if(type == 'to'){
						y = options.endYear;
						m = options.endMonth;
						rangeTxt = '结束';
					}
					var $calender = $("<div class='calender " + type + "'></div>");
					var html = "<div class='calenderContent'><div class='calenderTable'>" +
						"<div class='getyear'><div class='yearSelectWrap'>" +
						"<span class='yearSelect'>" + y  + (options.range?rangeTxt:'') + "<i class='icon-ar ar-dn'></i></span>" +
						"<div class='calender_ys'>" +
						"<div class='calender_ys_pre'><i class='icon-ar ar-left'></i></div>" +
						"<ul id='" + yearListId + "' class='laydate_ys_list clear'></ul>" +
						"<div class='calender_ys_next'><i class='icon-ar ar-right'></i></div>" +
						"</div></div></div></div>" +
						"<div class='tablebg'><table id='" + monthListId + "' class='calendertb' cellpadding='0' cellspacing='1'><tr><td data-num='1'>一月</td><td data-num='2'>二月</td><td data-num='3'>三月</td><td data-num='4'>四月</td></tr><tr><td data-num='5'>五月</td><td data-num='6'>六月</td><td data-num='7'>七月</td><td data-num='8'>八月</td></tr><tr><td data-num='9'>九月</td><td data-num='10'>十月</td><td data-num='11'>十一月</td><td data-num='12'>十二月</td></tr></table>" +
						other +
						"</div></div></div>";
					$calender.html(html);
					$calender.find("td").removeClass('hover');
					$calender.find("td").eq(m - 1).addClass('hover');
					if(y == options.endY){
						$calender.find("td:gt("+options.endM+")").addClass('un noClick')
					}
					if(y == options.beginY){
						$calender.find("td:lt("+options.beginM+")").addClass('un noClick')
					}
					if(type == 'to' && y == fromStartYear){
						$calender.find("td:lt("+(options.startMonth - 1)+")").addClass('un noClick')
					}
					$calenderDom = $calender;
					if(options.range){
						$rangeDom.append($calenderDom)
						if(type=="from"){
							$rangeDom.append('<div class="dateTo"><p>至</p></div>')
						}
					}

				})
				if(options.range){
					$rangeDom.append('<div class="clear"></div>')
					$finalDom = $rangeDom;
				}else{
					$finalDom = $calenderDom;
				}
				bindEle.parent().append($finalDom);
				var fixHeight = 0;
				if(document.documentElement.clientHeight < 700){
					fixHeight = -100;
				}
				if(options.range){
					$finalDom.css({
						"left": -100,
						"top": options.Top+fixHeight
					});
					$finalDom.find('.calender').show();
				}else{
					$finalDom.css({
						"left": 0,
						"top": options.Top+fixHeight
					});
					$finalDom.show();
				}

				$.each(typeArr, function(i, v) {
					var type = v;
					var typeMark = "_" + v;
					var yearListId = "laydate_ys_list" + typeMark;
					var monthListId = "calender" + typeMark;
					self.bindEvent({
						calenderType: type,
						yearListId: yearListId,
						monthListId: monthListId
					});
				})
			},
			domYear: function(YY, type) {
				var self = this;
				var $listWrap = $("#laydate_ys_list_" + type);
				var $calender = $(".calender." + type)
				var str = '';
				var curY = parseInt($calender.find(".yearSelect").text());
				for (var i = 0; i < 10; i++) {
					var voidClass = "";
					if (i === 5) {
						voidClass = self.checkVoid(YY,type);
						str += '<li y="' + YY + '" class="' + voidClass + (curY === YY ? ' on' : '') + '">' + YY + '年</li>';
					} else {
						voidClass = self.checkVoid(YY - 5 + i,type);
						str += '<li class="' + voidClass + '" y="' + (YY - 5 + i) + '">' + (YY - 5 + i) + '年</li>';
					}
				}
				$listWrap.html(str);
				$listWrap.off().on("click", "li", function() {
					if ($(this).hasClass("un")) return;
					$calender.find(".calender_ys").removeClass("on");
					var rangeTxt = "";
					if(options.range){
						if(type == "to"){
							rangeTxt = "结束"
						}else{
							rangeTxt = "开始"
						}
					}
					$calender.find(".yearSelect").html($(this).attr("y") + rangeTxt + '<i class="icon-ar ar-dn"></i>');
					temY = parseInt($(this).attr("y"));
					nowY = temY;
					if(type == 'from'){
						var $calender_to = $("#calender_to");
						fromStartYear = nowY;
						$("#calender_to").find("td").removeClass('un noClick')
						if(nowY != options.startYear){
							$("#calender_from").find("td").removeClass('hover')
						}else{
							$("#calender_from").find("td:eq("+(fromstartMonth - 1)+")").addClass('hover')
						}
						if(nowY > endstartYear){
							endstartYear = nowY;
							$('.calender.to').find(".yearSelect").html(nowY + '<i class="icon-ar ar-dn"></i>');
							$calender_to.find("td:lt("+fromstartMonth+")").removeClass('hover un noClick')
							$calender_to.find("td:lt("+(fromstartMonth - 1)+")").addClass('un noClick')
						}else if(nowY <= endstartYear){
							$calender_to.find("td:lt("+(fromstartMonth - 1)+")").removeClass('un noClick')
						}
						if(endstartYear == options.endY){
							$calender_to.find("td:gt("+options.endM+")").removeClass('hover').addClass('un noClick')
						}
					}else if (type == "to"){
						endstartYear = nowY;
						if(temY == fromStartYear){
							$calender.find("td:lt("+(fromstartMonth - 1)+")").addClass('un noClick')
							$calender.find("td:gt("+options.endM+")").addClass('un noClick')
						}
					}
					if(nowY == options.endY){
						$calender.find("td:gt("+options.endM+")").removeClass('hover').addClass('un noClick')
					}
					if(nowY == options.beginY){
						$calender.find("td:lt("+options.beginM+")").removeClass('hover').addClass('un noClick')
					}
					if(nowY != options.endY &&　nowY　!= options.beginY){
						$calender.find('td').removeClass('un noClick')
					}
				})
			},
			checkVoid: function(yy,type) {
				if(type=='from'){
					if(yy < options.beginY || yy > options.endY) return "un";
				}else if(type=='to'){
					if(yy < fromStartYear || yy > options.endY) return "un";
				}else{
					if(yy < options.beginY || yy > options.endY) return "un";
				}
				return "";
			},
			close:function(){
				$(".calender").remove()
				$(".calenderRangeMod").remove()
				bindEle[0].isOpen = false;
			}
		};
		Dates.init();

	}
	return function($) {
		// $;
	}

});