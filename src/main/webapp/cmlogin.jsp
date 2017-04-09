<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<title>登录</title>
<link rel="stylesheet" type="text/css" href="css/main1.css" />
<link rel="stylesheet" type="text/css" href="css/login.css" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<script type="text/javascript">
	$(function(){
		if("${tipMessage}"=="error"){
			$(".hide_win").css("display","block");
			$_div = $("<div class='pop-mid'><i class='mid-icon icon-warning'></i><span>账户名或密码错误</span></div>");
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
    <div class="wrap-login" style="top: 0px;">
        <div class="top-login">
            <img src="images/login_top.png" width="650" height="153" />
        </div>
        <div class="login">
            <div style="height:50px;"></div>
            <div class="tab-login">
                <div id="common" class="com-tab tab_con">
                    <form action="cmuser/login" method="post" id="form1">
                        <div class="m6px user-com">
                            <input id="account" class="txt user" name="cmaccount" placeholder="请输入账号" type="text" />
                        </div>
                        <div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>账号长度必须在5~20位！</div>
                        <div class="m6px password-com">
                            <input id="secretPWD" class="txt password-close" name="cmpassword" placeholder="请输入密码" style="display: block;" type="password"/>
                        </div>
                        <div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>密码长度必须在5~20位！</div>
                        <div class="forget">
                            <a href="gofindbyemail">忘记密码</a>
                        </div>
                        <div class="btn">
                            <input id="normalLogin" value="登录" type="button"/>
                        </div>
                    </form>
                    <a class="on-user" href="gocmregist">没有账号？立即注册</a>
                </div>
            </div>
        </div>
    </div>
    <div style="display: none;" class="hide_win"></div>
</body>
</html>