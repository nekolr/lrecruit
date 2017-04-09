var cvlist = {};
//通用ajax上传
cvlist.ajaxSubmit = function(url,data,type,sucfn,errfn){
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
cvlist.tip = function(){
	var $pop = $(".pop-info");
	var $lock = $(".lock_win");
	$(".pop-info .pop-body .close").click(function(){
		$pop.css("display","none");
		$lock.css("display","none");
	});
	$(".pop-info .pop-body .pop-btn .cancle").click(function(){
		$pop.css("display","none");
		$lock.css("display","none");
	});
	$(".cvlist .cv .box_cv .opt_box .lf_opt p span").click(function(){
		var recordid = $(this).attr("data-recordid");
		switch($(this).attr("data-opt")){
		case "1":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认简历感兴趣<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",3);break;
		case "2":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认发送面试邀请<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",7);break;
		case "4":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认已面试<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",4);break;
		}
	});
	$(".cvlist .cv .box_cv .opt_box .rt_opt p span").click(function(){
		var recordid = $(this).attr("data-recordid");
		switch($(this).attr("data-opt")){
		case "6":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认简历不合适<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",6);break;
		case "4":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认已面试<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",4);break;
		case "5":
			$pop.css("display","block");
			$lock.css("display","block");
			$pop.find(".pop-cont").html("确认已录取<br>确认后系统将自动发送通知给求职者");
			$pop.find(".pop-cont").attr("data-recordid",recordid).attr("data-status",5);break;
		}
	});
	//确认
	$(".pop-info .pop-body .pop-btn .set").click(function(){
		var $cont = $(this).parent().siblings(".pop-cont");
		var recordid = $cont.attr("data-recordid");
		var status = $cont.attr("data-status");
		cvlist.ajaxSubmit("record/ajaxUpdateRecord",{'recordid':recordid,'status':status},"post",function(msg){
			window.location.href = "entpuser/gocvmanager";
		},function(){
			
		});
		$pop.css("display","none");
		$lock.css("display","none");
	});
};
cvlist.binding = function(){
	$(".left .gradeBshort").each(function(){
		$(this).bind("click",function(){
			window.location.href = $(this).attr("data-url");
		});
	});
};
cvlist.commonSearch = function(){
	$("#fm_cv").submit();
};
cvlist.resetPageNum = function(){
	$("#fm_cv #ipt_pageNum").val(1);
};
//筛选条件点击事件
cvlist.filter = function(){
	$("#jobs span i").mousedown(function(){
		if($(this).hasClass("ar-dn")){
			$(this).parent().siblings("ul").css("display","block");
			$("#jobs").addClass("sSelectOn");
			$(this).addClass("ar-up").removeClass("ar-dn");
		}else{
			$(this).parent().siblings("ul").css("display","none");
			$("#jobs").removeClass("sSelectOn");
			$(this).removeClass("ar-up").addClass("ar-dn");
		}
	});
	$("#workYear span i").mousedown(function(){
		if($(this).hasClass("ar-dn")){
			$(this).parent().siblings("ul").css("display","block");
			$("#workYear").addClass("sSelectOn");
			$(this).addClass("ar-up").removeClass("ar-dn");
		}else{
			$(this).parent().siblings("ul").css("display","none");
			$("#workYear").removeClass("sSelectOn");
			$(this).removeClass("ar-up").addClass("ar-dn");
		}
	});
	$("#degree span i").mousedown(function(){
		if($(this).hasClass("ar-dn")){
			$(this).parent().siblings("ul").css("display","block");
			$("#degree").addClass("sSelectOn");
			$(this).addClass("ar-up").removeClass("ar-dn");
		}else{
			$(this).parent().siblings("ul").css("display","none");
			$("#degree").removeClass("sSelectOn");
			$(this).removeClass("ar-up").addClass("ar-dn");
		}
	});
};
//筛选条件选中事件
cvlist.filterIn = function(){
	$("#jobs ul").find("li").on("click",function(){
		cvlist.setHiddenInputVal("jobid",$(this).attr("data-val"));
		cvlist.commonSearch();
	});
	$("#workYear ul").find("li").on("click",function(){
		cvlist.setHiddenInputVal("experience",$(this).attr("data-val"));
		cvlist.commonSearch();
	});
	$("#degree ul").find("li").on("click",function(){
		cvlist.setHiddenInputVal("edu",$(this).attr("data-val"));
		cvlist.commonSearch();
	});
};
//设置隐藏input
cvlist.setHiddenInputVal = function(typeName,val){
	var $hiddendiv = $("#fm_cv");
	switch(typeName){
	case "jobid":
		$hiddendiv.find("#ipt_jobid").val(val);
		cvlist.resetPageNum();
		break;
	case "status":
		$hiddendiv.find("#ipt_status").val(val);
		cvlist.resetPageNum();
		break;
	case "experience":
		$hiddendiv.find("#ipt_experience").val(val);
		cvlist.resetPageNum();
		break;
	case "edu":
		$hiddendiv.find("#ipt_edu").val(val);
		cvlist.resetPageNum();
		break;
	}
};
cvlist.getCount = function(){
	cvlist.ajaxSubmit("record/ajaxGetCount",{},"post",function(msg){
		var count1 = msg.status1;
		var count3 = msg.status3;
		$(".content .left .gradeBshort:eq(0) .cvNum").text(count1);
		$(".content .left .gradeBshort:eq(1) .cvNum").text(count3);
	},function(){
		
	});
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
    //tab切换
    $("#listTab1 span").on("click",function(){
    	$(this).addClass("on");
    	$(this).siblings("span").removeClass("on");
    	cvlist.setHiddenInputVal("status",$(this).attr("data-val"));
    	cvlist.commonSearch();
    });
    
  //点击记录跳到简历详情页
    $(".detail_box").click(function () {
        var $row = $(this).parents(".cv");
        var cvid = $row.attr("data-cvid");
        var jobid = $row.attr("data-jobid");
        var sendtime = $row.attr("data-sendtime");
        var url = $row.attr("data-url");        	
        if(jobid!='' && sendtime !=''){
        	window.open(url+"?cvid="+cvid+"&jobid="+jobid+"&sendtime="+sendtime);     
        }else{
        	window.open(url+"?cvid="+cvid);        	
        }
    });
    cvlist.binding();
    cvlist.filter();
    cvlist.filterIn();
    cvlist.getCount();
    cvlist.tip();
});
