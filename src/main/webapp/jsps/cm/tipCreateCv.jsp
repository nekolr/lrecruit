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
<title>投递-失败了呐</title>
<link type="text/css" href="css/main1.css" rel="stylesheet" />
<link type="text/css" href="css/findpwd.css" rel="stylesheet" />
<style type="text/css">
.findPwd i.l-icon{ display: inline-block; background: url(images/Error_48.png) no-repeat; vertical-align: middle; margin-top: -3px;cursor: pointer;}
.findPwd i.success-icon {
    width: 48px;
    height: 72px;
}
</style>
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript">
	$(function(){
		$("#btn_see").click(function(){
			window.location.href = "cmuser/gomycv";
		});
	});
</script>
</head>
<body>
<div class="findPwd">
    <div class="top-pwd">&nbsp;</div>
    <div class="ct-pwd">
        <div class="logo-pwd">
            <h2 class="til-pwd til-success">您还没有简历哦</h2>
        </div>
        <!-- 重置密码成功 -->
        <div class="success-pwd">
            <i class="l-icon success-icon"></i>
            <h3>请创建简历!</h3>
            <div id="btn_see" class="btn-success">知道了</div>
        </div>
    </div>
    <div class="bottom-pwd">&nbsp;</div>
</div>
</body>
</html>