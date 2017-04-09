$(function(){
	
	var checkInput = function(){
		if($("#secretPWD").val().length<5 || $("#secretPWD").val().length>20){
			$("#form1 .errtip").first().css("display","block");
			return false;
		}else if($("#secretConfPWD").val().length<5 || $("#secretConfPWD").val().length>20){
			$("#form1 .errtip").first().css("display","none");
			
			$("#form1 .errtip").last().css("display","block");
			return false;
		}else if($("#secretPWD").val()!=$("#secretConfPWD").val()){
			$("#form1 .errtip").last().css("display","none");
			
			$("#form1 .errtip").last().text("两次密码不一致！");
			$("#form1 .errtip").last().css("display","block");
			return false;
		}
		
		$("#form1 .errtip").last().css("display","none");
		return true;
	};
	
	$("#btn_submit").click(function(){
		if(checkInput()){
			$("#form1").submit();	
		}
	});
});
