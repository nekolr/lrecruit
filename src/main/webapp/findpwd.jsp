<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>找回密码</title>
<link type="text/css" rel="stylesheet" href="css/main1.css" />
<link type="text/css" rel="stylesheet" href="css/findpwd.css" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/findpwd.js"></script>
<script type="text/javascript">
	$(function(){
		if("${tipMessage}"=="verifyError"){
			$(".hide_win").css("display","block");
			$_div = $("<div class='pop-mid'><i class='mid-icon icon-warning'></i><span>图片验证码错误</span></div>");
			$("body").append($_div);
			
			setTimeout(function(){
				$(".pop-mid").remove();
				$(".hide_win").css("display","none");
			},2000);	
		}
	});
</script>
</head>
<body>
    <div class="findPwd">
        <div class="top-pwd">&nbsp;</div>
        <div class="ct-pwd">
            <div class="logo-pwd">
                <h2 class="til-pwd">找回密码</h2>
            </div>
            <div class="oneStep-pwd mt30">
                <div class="step-pwd">
                    <div class="num-step">
                        <div class="step on">1</div>
                        <div class="bor-step">&nbsp;</div>
                        <div class="step">2</div>
                        <div class="bor-step">&nbsp;</div>
                        <div class="step">3</div>
                    </div>
                    <div class="wz-step">
                        <div class="art on">输入邮箱</div>
                        <div class="art">验证邮箱</div>
                        <div class="art">重置密码</div>
                    </div>
                </div>
                <form action="cmuser/checkEmail" method="post" id="form1">
	                <div class="box-oneStep mt35">
	                    <div class="m6px box-user">
	                        <input id="username" class="txt user" name="cmemail" placeholder="请输入邮箱" type="text"/>
	                    </div>
	                    <div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>请输入邮箱！</div>
	                    <div id="img-mo" class="m6px img-mo on">
	                        <input id="img_txt" class="txt imgCode" name="verifycode" placeholder="请输入验证码" type="text"/>
	                        <div class="img_btn">
	                            <img id="comPicValidateCode" class="codeImg" src='<c:url value="cmuser/verifycode"></c:url>'/>
	                        </div>
	                    </div>
	                    <div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>请填写图片验证码！</div>
	                    <div id="resetOne" class="btn-pwd">找回密码</div>
	                </div>
                </form>
            </div>
        </div>
        <div class="bottom-pwd">&nbsp;</div>
    </div>
    <div style="display: none;" class="hide_win"></div>
</body>
</html>