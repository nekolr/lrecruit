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
<title>企业用户注册</title>
<link type="text/css" rel="stylesheet" href="css/qylogin.css" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/qyregist.js"></script>
<script type="text/javascript">
$(function(){
	if("${tipMessage}"=="verifyError"){
		$("<div id='win_cover_msg' class='modal opacity-1'><div class='modal-msg'><div class='modal-body'>验证码错误</div></div></div>").appendTo($("#panel-login"));
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
				class="nav-title">企业用户注册</span>
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
				<!--reg start-->
				<div class="tab tab-primary" id="tag-reg">
					<div class="tab-contents">
						<div class="tab-content on">
							<form id="form1" method="post" action="entpuser/regist">
							<input id="flag" type="hidden" name="flag" value="1" />
							<input type="hidden" name="token" value="${token}" />
								<div class="form-group">
									<input onblur="qyregist.checkAccount()" type="text" class="form-control" name="entpaccount"
										placeholder="账户名（5-20位）" id="account"
										autocomplete="off" />
								</div>
								<div class="errtip" style="display:none"><i class="l-icon err-icon"></i>账号长度必须为5~20位！</div>
								<div id="tip1" class="errtip" style="display:none"><i class="l-icon err-icon"></i>账号已存在！</div>
								<div class="form-group toogle-eye">
									<input id="close_pwd" type="password" class="form-control close on" name="entppassword"
										placeholder="密码（5-20位）" autocomplete="off" /> <input
										type="text" class="form-control open" id="open_pwd"
										placeholder="密码（5-20位）" name="open_cmpassword" autocomplete="off" />
									<div class="btn-eye">
										<i class="bcicon bcicon-eye"></i>
									</div>
								</div>
								<div class="errtip" style="display:none"><i class="l-icon err-icon"></i>密码长度必须为5~20位！</div>
								<div class="form-field img-code-wrap">
									<div class="col-6">
										<div class="form-group">
											<input type="text" class="form-control" name="verifycode"
												placeholder="图片验证码" id="img-code" autocomplete="off" />
										</div>
									</div>
									<div class="img_btn col-4 t-a-r">
										<img id="validateCodeImg" class="picValidateCode" id="phone-reg-code-img"
											src="entpuser/verifycode">
									</div>
								</div>
								<div class="errtip" style="display:none"><i class="l-icon err-icon"></i>请填写图片验证码！</div>
								<div class="form-field">
									<input id="registerBtn" type="button" class="btn btn-primary btn-block btn-lg btn-submit" value="注册">
								</div>
								<div class="footer">
									<a href="goqylogin" class="go-login" data-tag="login">已有账号？立即登录</a>
								</div>

							</form>
						</div>
						<div class="tab-content"></div>
					</div>
				</div>
				<!--reg end-->
			</div>
			<!-- panel-body end-->
		</div>

		<div class="login-footer">Copyright © 版权所有</div>
	</div>
</body>
</html>