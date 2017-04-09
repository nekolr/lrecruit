var qylogin = {};
qylogin.checkInput = function(){
	if($("#account").val().length<5 || $("#account").val().length>20){
		$("#normal-login .errtip").first().css("display","block");
		return false;
	}else if($("#password").val().length<5 || $("#password").val().length>20){
		
		$("#normal-login .errtip").first().css("display","none");
		
		$("#normal-login .errtip").last().css("display","block");
		return false;
	}
	
	//格式正确隐藏错误提示		
	$("#normal-login .errtip").last().css("display","none");
	return true;
};

$(function(){
	$("#normalLogin").click(function(){
		if(qylogin.checkInput()){
			$("#normal-login").submit();
		}
	});
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			if(qylogin.checkInput()){
				$("#normal-login").submit();
			}
		}
	}
});