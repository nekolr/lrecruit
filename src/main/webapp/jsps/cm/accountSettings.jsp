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
<title>账号设置</title>
<link rel="stylesheet" href="css/accountSetting.css">
<link rel="stylesheet" href="css/main1.css">
<link rel="stylesheet" href="css/pop.css">
<link rel="stylesheet" href="css/personal.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/accountSetting.js"></script>
<script type="text/javascript">
	$(function() {
		//是否登录
		if ("${cmaccount}" != "") {
			$(".yc_unlogin").css("display", "none");
			$(".yc_logined").css("display", "block");
		}
	});
</script>
</head>
<body>
	<div id="yc_header" class="yc_header">
		<div id="yc_tnav">
			<div class="page clear_no">
				<div class="logo">
					<a href="#" data-selectid="index"></a>
				</div>
				<ul class="tnav_wrap">
					<li><a href="/LRecruit" id="toIndex" data-selectid="index">首页</a></li>
					<li><a href="job/sou" id="toJob" data-selectid="job" target="_blank">职位</a></li>
				</ul>
				<div class="yc_login">
					<ul class="yc_unlogin clear" style="display: none;">
						<li><a href="gocmlogin" id="personalLogin" rel="nofollow"><i
								class="icon_hf icon_person"></i>求职者登录</a></li>
						<li class="none"><span class="l_line"></span><a href=""
							rel="nofollow"><i class="icon_hf icon_hr"></i>企业用户登录</a></li>
					</ul>
					<ul class="yc_logined" style="display: none;">
						<li class="none" id="cm_user_info" data-tag="user_info"><a
							href="javascript:;"><i class="icon_hf icon_person"></i><span
								id="user_name">${cmaccount}</span><i class="icon_hf icon_down"></i></a>
							<div class="whitebar"></div>
							<ul class="user_info_list pub_list">
								<li class="user_info_show clear">
									<div class="left">
										<img src="images/person.jpg" alt="" /> <span class="user_name">您好，尊敬的招聘网用户</span>
									</div>

									<div class="right">
										<a href="cmuser/loginout">退出</a>
									</div>
								</li>
								<li onClick="window.location.href='cmuser/gomycv'"><i
									class="icon_hf icon_text_red"></i>
									<p>我的简历</p> <span>查看</span></li>
								<li onClick="window.location.href='cmuser/goshowSendRecord'"><i
									class="icon_hf icon_info"></i>
									<p>求职进展</p> <span>查看</span></li>
								<li onClick="window.location.href='cmuser/goaccountSettings'"><i
									class="icon_hf icon_set"></i>
									<p>账号设置</p> <span>修改</span></li>
							</ul></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="main">
		<!-- 个人中心左侧 -->
		<div class="lf-person">
			<div class="item-person myResume">
				<p class='noPointer'>
					<a href="javascript:;"><i class="m-icon i-resume"></i>我的简历</a>
				</p>
				<ul>
					<li id="mys-42bdb0e40bc5a157901571bbj"><a title="我的简历" href="cmuser/gomycv"
						data-src=""> 我的简历 </a></li>
				</ul>
			</div>
			<div class="item-person progress">
				<p class='noPointer'>
					<a href="javascript:;"><i class="m-icon i-progress"></i>求职进展</a>
				</p>
				<ul>
					<li><a href="cmuser/goshowSendRecord" data-src="" data-hash="progress">投递进展</a></li>
				</ul>
			</div>
			<div class="item-person account">
				<p class='tilMR'>
					<a class="choose on" href="cmuser/goaccountSettings" data-src="" data-hash="setting"><i
						class="m-icon i-account"></i>账号设置</a>
				</p>
			</div>
		</div>
		<div class="rt-person">
			<div class="Wouter">
				<div class="title">账号设置</div>
				<div class="settingArea">
					<div class="settingTop">
						<div class="mail">
							<div class="logo"></div>
							<div class="mailNum Num">${cmemail}</div>
							<c:if test="${cmemail==null}">
								<a href="javascript:;" class="operation">绑定邮箱</a>
							</c:if>
							<c:if test="${cmemail!=null}">
								<a href="javascript:;" class="operation">修改</a>
							</c:if>
						</div>
						<div class="pwd">
							<div class="logo"></div>
							<a href="javascript:;" class="operation">修改密码</a>
						</div>
					</div>
					<div class="settingBottom">
	            		<div class="bottomTitle">绑定账号后可使用以下方式快速登录</div>
			            <div class="wechat">
			                <div class="logo"></div>
			                                <div class="wechatNum Num">微信：<span>未绑定</span></div>
			                <a href="javascript:;" class="operation">绑定</a>
			                            </div>
			            <div class="qq">
			                <div class="logo"></div>
			                                <div class="qqNum Num">Q Q：<span>未绑定</span></div>
			                <a href="javascript:;" class="operation">绑定</a>
			                            </div>
			            <div class="weibo">
			                <div class="logo"></div>
			                                <div class="qqNum Num">微博：<span>未绑定</span></div>
			                <a href="javascript:;" class="operation">绑定</a>
			            </div>
        			</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
	</div>
	<div id="yc_footer">
		<div class="page help clear2"></div>
		<div class="page copy">
			<p>Copyright © 鲁临 版权所有</p>
		</div>
	</div>
	<div style="z-index: 1002; display: none; top: 205px; left: 422.5px;"
		class="pop">
		<div class="popTitle">
			<span>修改密码</span><a href="javascript:;" class="cancelBtn">×</a>
		</div>
		<div class="popContent">
			<div style="display: none;" class="msgTitle"></div>
			<div class="popCenterArea">
				<input type="hidden" value="1" id="dyna_flag" />
				<div style="display: none;" class="mail">
					<input id="ipt_email" name="cmemail" type="text" style="color: rgb(153, 153, 153);" class="inputNum"
						placeholder="请输入常用邮箱">
						<div class="tip" style="display:none;">请输入新邮箱</div>
				</div>
				<div style="display: none;" class="pwd">
					<input style="color: rgb(153, 153, 153); display: block;" type="password" id="ipt_currpwd" name="newpassword" class="inputNum" placeholder="请输入新密码">
					<div style="display: block;" class="tip">
						<span style="display: none;">密码错误！</span>
					</div>
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
			<a href="javascript:;" class="confirmBtn">确定</a> <a
				href="javascript:;" class="cancelBtn">取消</a>
		</div>
	</div>
	<div style="display: none;" class="lock_win"></div>
</body>
</html>