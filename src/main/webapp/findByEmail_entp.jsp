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
<script type="text/javascript" src="js/findByEmail.js"></script>
</head>
<body>
	<div class="findPwd">
		<div class="top-pwd">&nbsp;</div>
		<div class="ct-pwd">
			<div class="logo-pwd">
				<h2 class="til-pwd til-success">找回密码</h2>
			</div>
			<!-- 第三步 -->
			<div class="thirdStep-pwd mt30">
				<div class="step-pwd">
					<div class="num-step">
						<div class="step on">1</div>
						<div class="bor-step on">&nbsp;</div>
						<div class="step on">2</div>
						<div class="bor-step on">&nbsp;</div>
						<div class="step on">3</div>
					</div>
					<div class="wz-step">
						<div class="art">输入邮箱</div>
						<div class="art">验证邮箱</div>
						<div class="art on">重置密码</div>
					</div>
				</div>
				<form action="entpuser/resetpwd" method="post" id="form1">
					<input type="hidden" name="entpuserid" value="${entpuserid}" />
					<input type="hidden" name="uuid" value="${uuid}" />
					<div class="box-thirdStep mt10">
						<div class="m6px one-password">
							<input id="secretPWD" name="newpassword" type="password"
								placeholder="输入5～20位新密码" class="txt password-close" />
						</div>
						<div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>请输入正确格式密码！</div>
						<div class="m6px two-password">
							<input id="secretConfPWD" name="confnewpassword" type="password"
								placeholder="再次输入新密码" class="txt password-close" />
						</div>
						<div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>请输入正确格式密码！</div>
						<div id="btn_submit" class="btn-pwd">确 定</div>
					</div>
				</form>
			</div>
		</div>
		<div class="bottom-pwd" id="email_c">&nbsp;</div>
	</div>
</body>
</html>