var qyregist = {};

$(function () {
    $(".btn-eye").click(function () {
        if($(".bcicon-eye").hasClass("on")){
            $(".toogle-eye .close").addClass("on");
            $(".toogle-eye .open").removeClass("on");
            $(".bcicon-eye").removeClass("on");
            $("#open_pwd").val("");//清空明码input
            $("#flag").val("1");//密码
        }else{
            $(".toogle-eye .close").removeClass("on");
            $(".toogle-eye .open").addClass("on");
            $(".bcicon-eye").addClass("on");
            $("#close_pwd").val("");//清空密码input
            $("#flag").val("0");//明码
        }
    });
    
    $("#validateCodeImg").click(function(){
    	this.src = "entpuser/verifycode?time="+new Date().getTime();
    });
    
    document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			if(qyregist.checkInput()){
	    		$("#form1").submit();
	    	}
		}
	}
   $("#registerBtn").click(function(){
    	if(qyregist.checkInput()){
    		$("#form1").submit();
    	}  	
    });
});

qyregist.checkInput = function(){
	if($("#account").val().length<5 || $("#account").val().length>20){
		$("#form1 #tip1").css("display","none");
		$("#form1 .errtip").first().css("display","block");
		return false;
	}else if($("#flag").val()=="1"){
		
    	$("#form1 .errtip").first().css("display","none");
		
		if($("#close_pwd").val().length<5 || $("#close_pwd").val().length>20){
			$($("#form1 .errtip").get(1)).css("display","block");
			return false;
		}
	}else if($("#flag").val()=="0"){
		
    	$("#form1 .errtip").first().css("display","none");
		
		if($("#open_pwd").val().length<5 || $("#open_pwd").val().length>20){
			$($("#form1 .errtip").get(1)).css("display","block");
			return false;
		}
	}
	if($("#img-code").val()==""){
		
		$($("#form1 .errtip").get(1)).css("display","none");
		
		$("#form1 .errtip").last().css("display","block");
		return false;
	}
	
	$("#form1 .errtip").last().css("display","none");
	return true;
};

qyregist.checkAccount = function(){
	var params = $("#account").serialize();
	var time = new Date().getTime();
	$.ajax({
		type:"post",
		url:"entpuser/checkAccount",
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