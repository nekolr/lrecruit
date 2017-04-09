$(function(){
	var checkInput = function(){
		if($("#account").val().length<5 || $("#account").val().length>20){
			$("#form1 .errtip").first().css("display","block");
			return false;
		}else if($("#secretPWD").val().length<5 || $("#secretPWD").val().length>20){
			
			$("#form1 .errtip").first().css("display","none");
			
			$("#form1 .errtip").last().css("display","block");
			return false;
		}
		
		//格式正确隐藏错误提示		
		$("#form1 .errtip").last().css("display","none");
		return true;
	};
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			if(checkInput()){
				$("#form1").submit();
			}
		}
	}
	$("#normalLogin").click(function(){
		if(checkInput()){
			$("#form1").submit();
		}
	});
});

