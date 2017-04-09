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
<title>企业用户登录</title>
<link type="text/css" rel="stylesheet" href="css/qylogin.css" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/qylogin.js"></script>
<script type="text/javascript">
	$(function(){
		if("${tipMessage}"=="error"){
			$("<div id='win_cover_msg' class='modal opacity-1'><div class='modal-msg'><div class='modal-body'>用户名或密码错误</div></div></div>").appendTo($("#panel-login"));
			$("<div id='win_cover' class='mask mask-0' style='height: 485px;'></div>").appendTo($("#panel-login"));
			
			setTimeout(function(){
				$("#win_cover").remove();
				$("#win_cover_msg").remove();
			},2000);
		}
	});
</script>
</head>
<body>

	<div class="w-1024">
		<div class="nav-login">
			<a href="#" class="nav-log"><img src="images/logo.png"></a> <span
				class="nav-title">企业用户登录</span>
		</div>
	</div>

	<div class="wrap">

		<div class="slider" id="slider-login">
			<div class="slider-inner">
				<div class="item active">
					<div class="slider-img"></div>
				</div>
				<div class="item">
					<div class="slider-img"></div>
				</div>
				<div class="item">
					<div class="slider-img"></div>
				</div>
			</div>
			<a class="slider-control left" data-slide="pre">&lsaquo;</a> <a
				class="slider-control right" data-slide="next">&rsaquo;</a>
			<ul class="slider-dot">
				<li class="active"></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<div class="panel panel-login-reg" id="panel-login">
			<div class="panel-body">
				<!-- login start -->
				<div class="tab tab-primary" id="tag-login">
					<div class="tab-contents">
						<div class="tab-content on">
							<form id="normal-login" method="post" action="entpuser/login">
								<div class="form-group">
									<input id="account" type="text" class="form-control" name="entpaccount"
										placeholder="账户名" id="username" autocomplete="off" />
								</div>
								<div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>账号长度必须在5~20位！</div>
								<div class="form-group toogle-eye">
									<input id="password" type="password" class="form-control close on" name="entppassword"
										placeholder="密码（5-20位）" autocomplete="off" />
								</div>
								<div class="errtip" style="display:none;"><i class="l-icon err-icon"></i>密码长度必须在5~20位！</div>
								<div class="form-field">
									<div class="col-3 t-a-r">
										<a href="gofindbyemail_entp" class="forget-pass">忘记密码</a>
									</div>
								</div>
								<div class="form-field">
									<input type="button" id="normalLogin" class="btn btn-primary btn-block btn-lg btn-submit" value="登录">
								</div>
								<div class="footer">
									<a href="goqyregist" class="go-reg" data-tag="reg">没有账号？立即注册</a>
								</div>

							</form>

						</div>
						<div class="tab-content"></div>
					</div>
				</div>
				<!-- login end-->

			</div>
			<!-- panel-body end-->
		</div>
		<div class="login-footer">Copyright © 版权所有</div>
	</div>
</body>
</html>