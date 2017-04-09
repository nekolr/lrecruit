$(function(){
	//点击验证码图片，换一张
	$("#comPicValidateCode").click(function(){
		$(this).attr("src","entpuser/verifycode?time="+new Date().getTime());
	});
	
	var checkInput = function(){
		if($("#username").val()==""){
			$(".box-oneStep .errtip").first().text("请输入邮箱！");
			$(".box-oneStep .errtip").first().css("display","block");
			return false;
		}else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test($("#username").val())){
			$(".box-oneStep .errtip").first().text("邮箱格式不正确！");
			$(".box-oneStep .errtip").first().css("display","block");
			return false;
		}else if($("#img_txt").val()==""){
			
			$(".box-oneStep .errtip").first().css("display","none");
			
			$(".box-oneStep .errtip").last().css("display","block");
			return false;
		}
		
		$(".box-oneStep .errtip").last().css("display","none");
		return true;
	};
	
	$("#resetOne").click(function(){
		if(checkInput()){
			$("#form1").submit();
		}
	});
});

