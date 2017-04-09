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
<title>审核中的职位</title>
<link rel="stylesheet" href="css/main2.css">
<link rel="stylesheet" href="css/posManage.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/showPosition.js"></script>
</head>
<body>
	<div class="yc_header">
		<div class="yc_tnav w1024">
			<div class="page clear_no">
				<div class="logo">
					<a href="#"></a>
				</div>
				<ul class="tnav_wrap">
					<li><a href="#" data-value="index">首页</a></li>
					<li><a href="entpuser/gopositionmanager" data-value="joblist" class="on">职位管理</a></li>
					<li><a href="entpuser/gocvmanager" data-value="cvlist"> 简历管理</a></li>
					<li><a href="entpuser/goqyaccountSettings" data-value="account">账号管理</a></li>
				</ul>
				<div class="yc_login">
					<ul class="yc_unlogin clear" style="display: none;">
						<li><a href="gocmlogin" rel="nofollow">求职者登录</a></li>
						<li class="none"><a href="goqylogin">企业用户登录</a></li>
					</ul>
					<ul id="qy_yc_logined" class="yc_logined" style="display: block;">
						<li class="none" id="qy_user_info" data-tag="user_info"><a href="javascript:;"> <i class="icon_hf icon_person"></i> <span id="user_name">${entpaccount}</span> <i class="icon_hf icon_down"></i>
						</a>
							<div style="display: none;" class="whitebar"></div>
							<ul class="user_info_list pub_list" style="display: none;">
								<li class="user_info_show clear">
									<div class="left">
										<span class="user_name">您好，尊敬的招聘网用户</span>
									</div>

									<div class="right">
										<a href="entpuser/loginout">退出</a>
									</div>
								</li>
								<li onclick="window.location.href='entpuser/gopositionmanager'"><i class="icon_hf icon_text_red"></i>
									<p>职位管理</p> <span>查看</span></li>
								<li onclick="window.location.href='entpuser/gocvmanager'"><i class="icon_hf icon_info"></i>
									<p>简历管理</p> <span>查看</span></li>
								<li onclick="window.location.href='entpuser/goqyaccountSettings'"><i class="icon_hf icon_set"></i>
									<p>账号管理</p> <span>修改</span></li>
							</ul></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div class="lf-posManage">
			<div class="new-posManage">
				<a href="job/gopostposition" target="_blank"><i class="c-icon new-add"></i>发布新职位</a>
			</div>
			<ul>
				<li class="onlineJob"><a href="entpuser/gopositionmanager">显示中的职位</a></li>
				<li class="auditJob on"><a href="entpuser/gopositionshenhe">审核中的职位</a></li>
			</ul>
		</div>
		<div class="rt-posManage">
			<div class="til-posManage">
				<div class="search">
					<input type="text" name="" value="" placeholder="输入职位名搜索"
						class="txt" id="search" /> <input type="button" name=""
						value="搜&nbsp;索" class="btn" id="serBtn" />
				</div>
				显示中的职位
			</div>
			<div class="con-posManage">
				<c:forEach items="${jobList}" var="item">
					<div class="item-audit" data-id="${item.jobid}">
	    			<div class="e1">
	    				<p><a href="job/jobDetail?jobid=${item.jobid}" class="name" title="${item.jobname}" target="_blank">${item.jobname}</a><span class="depart">${item.deptname}</span></p>
	    				<p>[${item.address}]  ${item.minsal}-${item.maxsal}元</p>
	    			</div>
	    			<div class="e2">
	    				<p>发布时间：${item.posttime}</p>
	    				<p class="msg">审核中…</p>
	    			</div>
    				</div>
				</c:forEach>	
			<div class="no-record"></div>
		</div>
		<div class="pageList"><span class="disabled">上一页</span><span class="current">1</span><span class="disabled">下一页</span></div>
		</div>
	</div>
	<div id="yc_footer" class="yc_footer">
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
</body>
</html>