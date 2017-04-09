$(function () {
    $('.settingArea .pwd .operation').click(function () { //点击后弹出
    	
    	$(".popCenterArea .pwd .tip").css("display","none");
    	
    	$(".msgTitleMail").remove();
    	$(".inputNum").css("display","block");
		$(".popBtn .confirmBtn").css("display","inline-block");
		$(".popBtn .cancelBtn").css("display","inline-block");
    	
        $(".popTitle span").text("密码修改");
        $(".popContent .msgTitle").css("display","none");//title隐藏
        $(".pop").css("display", "block");
        $(".popCenterArea .pwd").css("display","block");
        $(".lock_win").css("display","block");
        
        $("#dyna_flag").val("0");//0表示密码修改
    });
    $(".cancelBtn").click(function () {
        $(".pop").css("display", "none");
        $(".popCenterArea .mail").css("display","none");
        $(".popCenterArea .pwd").css("display","none");
        $("#ipt_email").val("");
        $("#ipt_currpwd").val("");
        $("#ipt_newpwd").val("");
        $(".lock_win").css("display","none");
        
        $("#dyna_flag").val("1");//id=dyna_flag=1 表示邮箱修改
    });
    $('.settingArea .mail .operation').click(function () { //点击后弹出
    	
    	$(".popCenterArea .mail .tip").css("display","none");
    	
    	$(".msgTitleMail").remove();
    	$(".inputNum").css("display","block");
    	
		$(".popBtn .confirmBtn").css("display","inline-block");
		$(".popBtn .cancelBtn").css("display","inline-block");
    	
        $(".popTitle span").text("邮箱绑定");
        $(".popContent .msgTitle").css("display","block");
        $(".popContent .msgTitle").text("验证邮箱,验证成功后可用此邮箱找回密码");
        $(".pop").css("display", "block");
        $(".popCenterArea .mail").css("display","block");
        $(".lock_win").css("display","block");
    });
    
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
    
    var bindEmail = function(){
    	var time = new Date().getTime();
    	var data = $("#ipt_email").serialize();
    	$.ajax({
			type:"POST",
			url:"cmuser/bindemail",
			data:data+"&time="+time,
			contentType:"application/x-www-form-urlencoded",
			success:function(msg){
				if(msg=="success"){
					var $_div = $("<div class='msgTitleMail'>验证邮件已发送至该邮箱！</div>")
					$(".popCenterArea").prepend($_div);
					$(".popContent .msgTitle").css("display","none");
					$(".inputNum").css("display","none");
					$(".tip").css("display","none");
					$(".popBtn .confirmBtn").css("display","none");
					$(".popBtn .cancelBtn").css("display","none");
				}
			}
		});
    };
    
    var editPwd = function(){
    	var time = new Date().getTime();
    	var data = "cmpassword="+$("#ipt_currpwd").val()+"&newpassword="+$("#ipt_newpwd").val();
    	$.ajax({
			type:"POST",
			url:"cmuser/editpwd",
			data:data+"&time="+time,
			success:function(msg){
				if(msg=="success"){
					var $_div = $("<div class='msgTitleMail'>修改成功！</div>")
					$(".popCenterArea").prepend($_div);
					$(".popContent .msgTitle").css("display","none");
					$(".inputNum").css("display","none");
					$(".tip").css("display","none");
					$(".popBtn .confirmBtn").css("display","none");
					$(".popBtn .cancelBtn").css("display","none");
				}else{
					var $_div = $("<div class='msgTitleMail'>修改失败！</div>")
					$(".popCenterArea").prepend($_div);
					$(".popContent .msgTitle").css("display","none");
					$(".inputNum").css("display","none");
					$(".tip").css("display","none");
					$(".popBtn .confirmBtn").css("display","none");
					$(".popBtn .cancelBtn").css("display","none");
				}
			}
		});
    };
    //验证邮箱
    var checkEmail = function(){
    	if($("#ipt_email").val()==""){
    		$(".popCenterArea .tip").css("display","block");
    		return false;
    	}else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test($("#ipt_email").val())){
    		$(".popCenterArea .tip").text("邮箱格式错误！");
    		$(".popCenterArea .tip").css("display","block");
    		return false;
    	}
    	
    	//格式正确隐藏错误提示
    	$(".popCenterArea .tip").css("display","none");
    	return true;
    };
    
    var checkPwd = function(){
    	if($("#ipt_currpwd").val().length<5 || $("#ipt_currpwd").val().length>20){
    		$(".pwd .tip").first().text("密码长度必须5~20位！");
    		$(".pwd .tip").first().css("display","block");
    		$(".tip span").css("display","inline");
    		return false;
    	}else if($("#ipt_newpwd").val().length<5 || $("#ipt_newpwd").val().length>20){
    		
    		$(".pwd .tip").first().css("display","none");
    		
    		$(".pwd .tip").last().text("密码长度必须5位~20位！");
    		$(".pwd .tip").last().css("display","block");
    		return false;
    	}else if($("#ipt_currpwd").val()!=$("#ipt_newpwd").val()){
    		$(".pwd .tip").last().text("两次密码不一致！");
    		$(".pwd .tip").last().css("display","block");
    		return false;
    	}
    	
    	//格式正确隐藏错误提示
    	
    	$(".pwd .tip").last().css("display","none");
		$(".tip span").css("display","none");
		return true;
    };
    
    //修改或绑定邮箱，修改密码，ajax
    $(".confirmBtn").click(function(){
    	var email = $("#ipt_email");
    	var currpwd = $("#ipt_currpwd");
    	var newpwd = $("#ipt_newpwd");
    	if($("#dyna_flag").val()=="1"){
    		if(checkEmail()){
    			bindEmail();	
    		}
    	}else if($("#dyna_flag").val()=="0"){
    		if(checkPwd()){
    			editPwd();
    		}
    	}
    });
});
