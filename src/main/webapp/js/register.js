var register = {};
$(function () {
	/*密码模式切换*/
    $("#eye").click(function () {
        if ($(this).hasClass("eyeOpen-icon")) {
            $(this).removeClass("eyeOpen-icon");
            $(this).addClass("eyeClose-icon");
            $("#secretPWD").show();
            $("#openPWD").val("");
            $("#openPWD").hide();
            $("#flag").val("1");//密码
        } else {
            $(this).removeClass("eyeClose-icon");
            $(this).addClass("eyeOpen-icon");
            $("#openPWD").show();
            $("#secretPWD").val("");
            $("#secretPWD").hide();
            $("#flag").val("0");//明码
        }
    });
    //点击验证码图片,切换验证码
    $("#PicValidateCode").click(function(){
    	$(this).attr("src","cmuser/verifycode?time="+new Date().getTime());
    });

    document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			if(register.checkInput()){
	    		$("#form1").submit();
	    	}
		}
	}
    
    //表单提交
    $("#regisBtn").click(function(){
    	if(register.checkInput()){
    		$("#form1").submit();
    	}  	
    });
});

register.checkInput = function(){
	if($("#account").val().length<5 || $("#account").val().length>20){		
		$("#form1 #tip1").css("display","none");
		$("#form1 .errtip").first().css("display","block");
		return false;
	}else if($("#flag").val()=="1"){
		
    	$("#form1 .errtip").first().css("display","none");
		
		if($("#secretPWD").val().length<5 || $("#secretPWD").val().length>20){
			$($("#form1 .errtip").get(1)).css("display","block");
			return false;
		}
	}else if($("#flag").val()=="0"){
		
    	$("#form1 .errtip").first().css("display","none");
		
		if($("#openPWD").val().length<5 || $("#openPWD").val().length>20){
			$($("#form1 .errtip").get(1)).css("display","block");
			return false;
		}
	}
	if($("#img_txt").val()==""){
		
		$($("#form1 .errtip").get(1)).css("display","none");
		
		$("#form1 .errtip").last().css("display","block");
		return false;
	}
	
	$("#form1 .errtip").last().css("display","none");
	return true;
};

register.checkAccount = function(){
	var params = $("#account").serialize();
	var time = new Date().getTime();
	$.ajax({
		type:"post",
		url:"cmuser/checkAccount",
		dataType:"json",
		data:params+"&time="+time,
		success:function(msg){
			if(msg.result=="failed"){
				$("#form1 #tip1").css("display","block");
			}else if(msg.result=="success"){
				$("#form1 #tip1").css("display","none");
			}
		}
	});
};