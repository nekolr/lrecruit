$.fn.serializeObject = function(){    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) { 
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日
        "h+": this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
        "H+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
    	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
	    if (new RegExp("(" + k + ")").test(fmt)) {
	    	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    }
    }
    return fmt;
};
var sou = {};
//通用ajax
sou.ajaxSubmit = function(url,data,type,sucfn,errfn){
	var time = new Date().getTime();
	data["time"] = time;	
	$.ajax({
		url:url,
		type:type,
		data:data,
		success:sucfn,
		error:errfn
	});
};
//箭头所在位置计算
sou.markArrow = function(dom,left){
	dom.css({"left":left});
};
//重置pageNum=1
sou.resetPageNum = function(){
	$("#div_hidden").find("#ipt_pageNum").val(1);
};
sou._closeNotTargetDom = function($this,$par,event,fun){
	$(document).on("mousemove",function(e){
		if(!$this.is(e.target) && $this.has(e.target).length === 0){
			if($par){
				if(!$par.is(e.target) && $par.has(e.target).length === 0){
					fun();
				}
			}else{
				fun();
			}
		}
		e.stopPropagation();
	})
}
//设置隐藏input
sou.setHiddenInputVal = function(typeName,val){
	var $hiddendiv = $("#div_hidden");
	switch(typeName){
	case "trade":
		$hiddendiv.find("#ipt_tradeid").val(val);
		sou.resetPageNum();
		break;
	case "entpnature":
		$hiddendiv.find("#ipt_entpnature").val(val);
		sou.resetPageNum();
		break;
	case "salrange":
		$hiddendiv.find("#ipt_flag").val(val);
		sou.resetPageNum();
		if(val=="-1"){
			$hiddendiv.find("#ipt_minsal").removeAttr("value");
			$hiddendiv.find("#ipt_maxsal").removeAttr("value");
		}else{
			var salrange = val.split("-");
			if(salrange.length==1){
				if(salrange[0]=="2000"){
					$hiddendiv.find("#ipt_maxsal").val(val);
					$hiddendiv.find("#ipt_minsal").removeAttr("value");
				}else if(salrange[0]=="50000"){
					$hiddendiv.find("#ipt_minsal").val(val);		
					$hiddendiv.find("#ipt_maxsal").removeAttr("value");
				}
			}else{
				$hiddendiv.find("#ipt_minsal").val(salrange[0]);				
				$hiddendiv.find("#ipt_maxsal").val(salrange[1]);
			}
		}
		
	}
};
//搜索
sou.commonSearch = function(){
	$("#fm_submit").submit();
};
//初始化筛选部件
sou.initSelection = function(){
	var dom = $("#selection")
	var typesDom = dom.find(".select-type")
	var defaultLeft = "";
	$.each(typesDom,function(){
		var typeCont = $(this).find(".select-cont")
		var typeL1 = $(this).find(".select-l1")
		var typeL2 = $(this).find(".select-l2")
		var markChild = typeCont.find(".select-l2 .l2-list a.on").parent()
		var mark = markChild.data("mark")
		markChild.addClass("on")
		markChild.parent().addClass("on")
		var markDom = typeL1.find("[data-val='"+mark+"']");
		if(markDom.length){
			defaultLeft = markDom.offset().left - typeCont.offset().left +markDom.width()/2;
			sou.markArrow(typeL2.find(".select-l2-arrow"),defaultLeft)
		}
		$(this).find("a").on("click",function(){
			var val = $(this).attr("data-val");
			var typeName = $(this).attr("data-type")
			sou.setHiddenInputVal(typeName,val);
			sou.resetPageNum();
			sou.commonSearch();
		})
		typeL1.each(function(){
			$(this).find("a").on("mouseenter",function(e){
				var l2 = $(this).parent().next(".select-l2")
				if(l2){
					typeCont.find(".select-l2:not(.on)").hide()
					typeCont.find(".l2-list").hide()
					l2.show()
					typeL2.find(".l2-list[data-mark='"+$(this).data("val")+"']").show()
					if(!$(this).hasClass("on") && !$(this).parent().next(".select-l2").hasClass("on")){
						typeCont.find(".select-l2.on").show()
						typeCont.find(".l2-list.on").show()
					}
				}
				sou.markArrow($(this).parent().next(".select-l2").find(".select-l2-arrow"),$(this).offset().left - typeCont.offset().left + $(this).width()/2)
			})
		})
		$(typeL1,typeL2).on("mouseout.selection",function(){
			sou._closeNotTargetDom(typeL1,typeL2,".selection",function(){
				typeCont.find(".select-l2:not(.on)").hide()
				typeCont.find(".l2-list").hide()
				typeCont.find(".select-l2.on").show()
				typeCont.find(".l2-list.on").show()
				sou.markArrow(typeL2.find(".select-l2-arrow"),defaultLeft)
			})
		})
	})
};
//加载一级行业
sou.loadFirstTrade = function(){
	sou.ajaxSubmit("trade/loadFirstTradeExist",{},"post"
	,function(msg){
		//成功
		var tradelist = msg;
		var $container_0 = $("#selection .select-type .select-cont .select-l1:eq(0)");
		var $container_1 = $("#selection .select-type .select-cont .select-l1:eq(1)");
		for(var i = 0;i<8;i++){
			$("<a data-val='"+tradelist[i].tradeid+"' data-type='trade' href='javascript:;' rel='nofollow'><dt>"+tradelist[i].tradename+"</dt></a>").appendTo($container_0);
		}
		for(var j = 8;j<tradelist.length;j++){
			$("<a data-val='"+tradelist[j].tradeid+"' data-type='trade' href='javascript:;' rel='nofollow'><dt>"+tradelist[j].tradename+"</dt></a>").appendTo($container_1);
		}
		$("<div class='clear'></div>").appendTo($container_0);
		$("<div class='clear'></div>").appendTo($container_1);
		//筛选器
		sou.initSelection();
		
		//行业选中样式
		if(tradeid=="-1"){
			$("#selection .select-type:eq(0)>a .select-all").addClass("on");
			$("#selection .select-type:eq(0) .select-cont .select-l1 a").removeClass("on");
		}
		$("#selection .select-type:eq(0) .select-cont .select-l1 a").each(function(){
			if($(this).attr("data-val")==tradeid){
				$(this).addClass("on");
				$("#selection .select-type:eq(0)>a .select-all").removeClass("on");
			}
		});
		
	},function(){
		//出错
	});
};
//搜索提示
sou.autocomplete = function($input1,$input2){
	$input1.on("focus keyup",function(){
		if($(this).val()!=''){
			var data = $("#fm_submit").serializeObject();
			clearTimeout(this.keywordtimer);
			if($("#autoComplete")!=undefined){
				$("#autoComplete").remove();
			}
			this.keywordtimer = setTimeout(function(){
				sou.ajaxSubmit("job/ajaxAutoComplete",data,"post",function(msg){
					if(msg!=''){
						var html = "<div id='autoComplete' class='autoCompleteSearch' style='left: 0px; top: 36px; z-index: 100; width: 660px;'><ul>";
						for(var i=0;i<msg.length;i++){
							html+="<li class='trans' data-txt="+msg[i]+"><span>"+msg[i]+"</span></li>"
						}
						html+="</ul></div>";
						var win = $(html).insertAfter($input2);
						
						sou.searchClick(win);
					}
				},function(){
					
				});
			},400);
		}
	});
};
//搜索提示点击
sou.searchClick = function(win){
	var $this = $("#fm_submit .search .wp-input input[type=text]");
	setTimeout(function(){
		win.find("li").on("click",function(){
			$("#fm_submit .search .wp-input input[type=text]").val($(this).attr("data-txt"));
			$(".autoCompleteSearch").remove();
			sou.commonSearch();
		})
//		sou._closeNotTargetDom(win,$this,".autoCompleteSearch",function(){
//			$(".autoCompleteSearch").remove()
//		})
	},500)
};
$(function () {
    //user_info控制
    $("#cm_user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#cm_user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    $("#qy_user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#qy_user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    
    //工作年限筛选
    $("#subSelection .wrap1 .wrap2 .selc-bk #workYear span").click(function(){
    	if($(this).parent().hasClass("sSelectOn")){
    		$(this).parent().removeClass("sSelectOn");
    		$("#subSelection .wrap1 .wrap2 .selc-bk #workYear ul").css("display","none");
    		$(this).children("i").attr("class", "icon-ar ar-dn");
    	}else{
    		$(this).children("i").attr("class", "icon-ar ar-up");
    		$(this).parent().addClass("sSelectOn");
    		$("#subSelection .wrap1 .wrap2 .selc-bk #workYear ul").css("display","block");
    	}
    	
    });
    //工作年限点击
    $("#subSelection .wrap1 .wrap2 .selc-bk #workYear ul").find("li").on("click",function(){
    	$("#div_hidden #ipt_experience").val($(this).attr("data-val"));
    	$(this).parent().css("display","none");
    	$("#workYear").removeClass("sSelectOn");
    	$("#workYear span").html($(this).text()+"<i class='icon-ar ar-dn'></i>");
    	$(this).addClass("on");
    	$(this).siblings("li").removeClass("on");
    	sou.commonSearch();
    });
    //学历筛选
    $("#subSelection .wrap1 .wrap2 .selc-bk #degree span").click(function(){
    	if($(this).parent().hasClass("sSelectOn")){
    		$(this).parent().removeClass("sSelectOn");
    		$("#subSelection .wrap1 .wrap2 .selc-bk #degree ul").css("display","none");
    		$(this).children("i").attr("class", "icon-ar ar-dn");
    	}else{
    		$(this).children("i").attr("class", "icon-ar ar-up");
    		$(this).parent().addClass("sSelectOn");
    		$("#subSelection .wrap1 .wrap2 .selc-bk #degree ul").css("display","block");
    	}
    	
    });
    //学历点击事件
    $("#subSelection .wrap1 .wrap2 .selc-bk #degree ul").find("li").on("click",function(){
    	$("#div_hidden #ipt_edu").val($(this).attr("data-val"));
    	$(this).parent().css("display","none");
    	$("#degree").removeClass("sSelectOn");
    	$("#degree span").html($(this).text()+"<i class='icon-ar ar-dn'></i>");
    	$(this).addClass("on");
    	$(this).siblings("li").removeClass("on");
    	sou.commonSearch();
    });
//    //更新时间筛选
//    $("#subSelection .wrap1 .wrap2 .selc-bk #refTime span").click(function(){
//    	if($(this).parent().hasClass("sSelectOn")){
//    		$(this).parent().removeClass("sSelectOn");
//    		$("#subSelection .wrap1 .wrap2 .selc-bk #refTime ul").css("display","none");
//    		$(this).children("i").attr("class", "icon-ar ar-dn");
//    	}else{
//    		$(this).children("i").attr("class", "icon-ar ar-up");
//    		$(this).parent().addClass("sSelectOn");
//    		$("#subSelection .wrap1 .wrap2 .selc-bk #refTime ul").css("display","block");
//    	}
//    });
//    //更新时间点击事件
//    $("#subSelection .wrap1 .wrap2 .selc-bk #refTime ul").find("li").on("click",function(){
//    	var val = $(this).attr("data-val");
//    	var now = new Date().getTime();
//    	var time = "";
//    	if(val=="-1"){
//    		$("#div_hidden #ipt_posttime").removeAttr("value");
//    	}else{
////    		time = now-1000*60*60*24*parseInt(val);
////    		var date = (new Date(time)).Format("yyyy-MM-dd HH:mm:ss");
//    		$("#div_hidden #ipt_posttime").val(val);
//    	}
//    	$(this).parent().css("display","none");
//    	$("#refTime").removeClass("sSelectOn");
//    	$("#refTime span").html($(this).text()+"<i class='icon-ar ar-dn'></i>");
//    	$(this).addClass("on");
//    	$(this).siblings("li").removeClass("on");
//    });
    $('body').bind('click', function (event){
    	if($("#autoComplete")!=undefined){
    		$("#autoComplete").remove();
    	}
        event.stopPropagation();
    })
    
    $("#fm_submit .search .wp-input input[type=button]").click(function(){
    	sou.commonSearch();
    });
    //加载一级行业
    sou.loadFirstTrade();
    //搜索提示
    sou.autocomplete($("#fm_submit .search .wp-input input[type=text]"),$("#fm_submit .search .wp-input input[type=text]"));
});
