$(function(){
	function commonSearch(){
		$("#fm_send").submit();
	};
	function resetPageNum(){
		$("#fm_send #ipt_pageNum").val(1);
	};
	function setHiddenInputVal(val){
		var $hiddendiv = $("#fm_send");
		$hiddendiv.find("#ipt_status").val(val);
		resetPageNum();
	};
	 //user_info控制
    $("#user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    
    //tab切换
    $(".tab-progress ul li").on("click",function(){
    	$(this).addClass("on");
    	$(this).siblings("li").removeClass("on");
    	setHiddenInputVal($(this).attr("data-status"));
    	commonSearch();
    });
});

