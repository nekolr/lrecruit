<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<title>提交-完成</title>
<link type="text/css" href="css/main1.css" rel="stylesheet" />
<link type="text/css" href="css/findpwd.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/positionComplete.js"></script>
</head>
<body>
<div class="findPwd">
    <div class="top-pwd">&nbsp;</div>
    <div class="ct-pwd">
        <div class="logo-pwd">
            <h2 class="til-pwd til-success">职位信息</h2>
        </div>
        <!-- 重置密码成功 -->
        <div class="success-pwd">
        	<c:if test="${tipMessage=='success'}">
        		<i class="l-icon success-icon"></i>
            	<h3>提交成功!</h3>
            	<div id="btn_see1" class="btn-success">知道了</div>
        	</c:if>
        	<c:if test="${tipMessage=='failed'}">
        		<i class="l-icon success-icon"></i>
            	<h3>提交失败!</h3>
            	<div id="btn_see2" class="btn-success">知道了</div>
        	</c:if>        
        </div>
    </div>
    <div class="bottom-pwd">&nbsp;</div>
</div>
</body>
</html>