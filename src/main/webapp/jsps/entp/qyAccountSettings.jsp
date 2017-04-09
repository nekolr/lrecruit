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
<title>账号管理基本信息</title>
<link rel="stylesheet" href="css/jobPost.css">
<link rel="stylesheet" href="css/main2.css">
<link rel="stylesheet" href="css/account.css">
<link rel="stylesheet" href="css/pop.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/qyaccountSetting.js"></script>
</head>
<body>
	<div class="yc_header">
		<div class="yc_tnav w1024">
			<div class="logo">
				<a href="#"></a>
			</div>
			<ul class="tnav_wrap">
				<li><a href="#" data-value="index">首页</a></li>
				<li><a href="entpuser/gopositionmanager" data-value="joblist">职位管理</a></li>
				<li><a href="entpuser/gocvmanager" data-value="cvlist"> 简历管理</a></li>
				<li><a href="entpuser/goqyaccountSettings" data-value="account" class="on">账号管理</a></li>
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
	<div class="main">
		<div class="w1024 account clear">
			<input type="hidden" id="nowPage" value="account" />
			<div class="leftCont">
				<ul class="accountNav">
					<li class="on"><a href="entpuser/goqyaccountSettings">基本信息</a></li>
					<li><a href="entpuser/goqyinfo">企业信息管理</a></li>
				</ul>
			</div>
			<div class="rightCont">
				<div class="accountCont">
					<div class="pageCont on">
						<div class="baseInfo">
							<div class="pageTitle">
								<span class="t1">账号信息</span>
							</div>
							<div>
								<p class="companyName">
									<span>${entp.entpname}</span>
									<span class="btn" id="mdPassport">修改密码</span>
								</p>
								<ul class="userInfo clear">
									<li>
										<c:if test="${entpemail!=null}">
											<div class=" mdEmailWrap">
											<i class="icon-ac ac-email"></i><span
												class="curEmail userTxt" title='${entpemail}'>${entpemail}</span><span
												class="btn" id="mdEmail">修改</span>
											</div>	
										</c:if>
										<c:if test="${entpemail==null}">
											<div class=" bindEmailWrap">
											<i class="icon-ac ac-email"></i><span class="userTxt">邮箱未绑定</span><span
												class="btn" id="bindEmail">绑定</span>
											</div>
										</c:if>
									</li>
								</ul>
							</div>
							<div class="space"></div>
							
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="yc_footer" class="yc_footer">
		<div class="w1024 help clear"></div>
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
	<div style="z-index: 1002; display: none; top: 205px; left: 422.5px;" class="pop">
		<div class="popTitle">
			<span>邮箱绑定</span><a href="javascript:;" class="cancelBtn">×</a>
		</div>
		<div class="popContent">
			<div style="display: block;" class="msgTitle">验证邮箱,验证成功后可用此邮箱找回密码</div>
			<div class="popCenterArea">
				<input type="hidden" value="1" id="dyna_flag">
				<div style="display: none;" class="mail">
					<input id="ipt_email" name="entpemail" type="text" style="color: rgb(153, 153, 153); display: block;" class="inputNum" placeholder="请输入常用邮箱">
						<div class="tip" style="display: none;">请输入新邮箱</div>
				</div>
				<div style="display: none;" class="pwd">
					<input style="color: rgb(153, 153, 153); display: block;" type="password" id="ipt_currpwd" name="newpassword" class="inputNum" placeholder="请输入新密码">
					<div style="display: none;" class="tip">密码长度必须5~20位！</div>
					<input style="color: rgb(153, 153, 153); display: block;" type="password" id="ipt_newpwd" name="confnewpassword" class="inputNum" placeholder="请输入确认密码">
					<div style="display: none;" class="tip">请输入位密码！</div>
					<div style="display: none; height: 0px;" class="successArea">
						<div class="sucTitle">
							密码修改成功！(<span>5</span>)
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="popBtn">
			<a href="javascript:;" class="confirmBtn" style="display: inline-block;">确定</a> <a href="javascript:;" class="cancelBtn" style="display: inline-block;">取消</a>
		</div>
	</div>
	<div style="display: none;" class="lock_win"></div>
</body>
</html>