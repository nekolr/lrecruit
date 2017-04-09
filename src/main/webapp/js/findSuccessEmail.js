$(function(){
	//提交表单
	
	var checkInput = function(){
		if($("#img_txt").val()==""){			
			$(".twoStep-pwd .errtip").first().css("display","block");
			return false;
		}
		
		$(".twoStep-pwd .errtip").first().css("display","none");
		return true;
	};
	
	$("#resetOne").click(function(){
		if(checkInput()){
			$("#form1").submit();
		}
	});
});

