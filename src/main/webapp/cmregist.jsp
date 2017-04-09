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
<title>注册</title>
<link href="css/main1.css" rel="stylesheet" type="text/css" />
<link href="css/register.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/register.js"></script>
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
    <div class="wrap-login" style="top:0px;">
        <div class="top-login">
            <img src="images/login_top.png" width="650" height="153"/>
        </div>
        <div class="register">
            <div class="tab-login">
                <form action="cmuser/regist" method="post" autocomplete="off" id="form1">
                	<input id="flag" type="hidden" name="flag" value="1" />
                	<input type="hidden" name="token" value="${token}" />
                    <div class="regis-tab">
                        <div class="m12px regis-title">用户注册</div>
                        <div class="m6px user-com">
                            <input id="account" onblur="register.checkAccount()" class="txt user" name="cmaccount" placeholder="请输入账号" autocomplete="off" type="text" />
                        </div>
                        <div class="errtip" style="display:none"><i class="l-icon err-icon"></i>账号长度必须为5~20位！</div>
                        <div id="tip1" class="errtip" style="display:none"><i class="l-icon err-icon"></i>账号已存在！</div>
                        <div class="m6px password-com">
                            <input id="secretPWD" class="txt password-close" name="cmpassword" placeholder="请设置5-20位密码" autocomplete="off" type="password" style="display: inline;"/>
                            <input id="openPWD" class="txt password-open" name="open_cmpassword" placeholder="请设置5-20位密码" autocomplete="off" type="text" style="display: none;"/>
                            <i id="eye" class="l-icon eyeClose-icon"></i>
                        </div>
                        <div class="errtip" style="display:none"><i class="l-icon err-icon"></i>密码长度必须为5~20位！</div>
                        <div class="m6px img-mo on">
                            <input id="img_txt" class="txt imgCode" name="verifycode" placeholder="请输入验证码" autocomplete="off" type="text"/>
                            <div class="img_btn">
                                <img id="PicValidateCode" class="codeImg" src='<c:url value='cmuser/verifycode'></c:url>'/>
                            </div>
                        </div>
                        <div class="errtip" style="display:none"><i class="l-icon err-icon"></i>请填写图片验证码！</div>
                        <div class="btn">
                            <input id="regisBtn" value="注册" type="button"/>
                        </div>
                        <a class="on-user" href="gocmlogin">已有账号？立即登录</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div style="display: none;" class="hide_win"></div>
</body>
</html>