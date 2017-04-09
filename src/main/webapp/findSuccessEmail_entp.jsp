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
<title>找回密码</title>
<link type="text/css" href="css/main1.css" rel="stylesheet" />
<link type="text/css" href="css/findpwd.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/findSuccessEmail.js"></script>
</head>
<body>
	<div class="findPwd">
		<div class="top-pwd">&nbsp;</div>
		<div class="ct-pwd">
			<div class="logo-pwd">
				<h2 class="til-pwd">找回密码</h2>
			</div>
			<form action="entpuser/findpwd" method="post" id="form1">
				<input type="hidden" name="entpemail" value="${entpemail}" />
				<div class="twoStep-pwd mt30">
					<div class="step-pwd">
						<div class="num-step">
							<div class="step on">1</div>
							<div class="bor-step on">&nbsp;</div>
							<div class="step on">2</div>
							<div class="bor-step">&nbsp;</div>
							<div class="step">3</div>
						</div>
						<div class="wz-step">
							<div class="art">输入邮箱</div>
							<div class="art on">验证邮箱</div>
							<div class="art">重置密码</div>
						</div>
					</div>
					<div class="box-twoStep mt35">
						<!-- 邮箱重置密码 -->
						<div class="email-twoStep">
							<p>
								验证码已发送至邮箱：<span id="resEmail">${entpemail}</span>
							</p>
						</div>
					</div>
					<div class="box-oneStep mt35">
						<div id="img-mo" class="m6px img-mo on">
							<input id="img_txt" class="txt imgCode" name="verifycode"
								placeholder="请输入验证码" type="text">
						</div>
						<div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>请输入验证码！</div>
						<div id="resetOne" class="btn-pwd">找回密码</div>
					</div>
					
				</div>
			</form>
		</div>
		<div class="bottom-pwd">&nbsp;</div>
	</div>
</body>
</html>