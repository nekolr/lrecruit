<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<title>求职进展-投递进展</title>
<link rel="stylesheet" href="css/main1.css">
<link rel="stylesheet" href="css/jobProgress.css">
<link rel="stylesheet" href="css/personal.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/showSendRecord.js"></script>
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
					<li><a href="job/sou" id="toJob" data-selectid="job"
						target="_blank">职位</a></li>
				</ul>
				<div class="yc_login">
					<ul class="yc_unlogin clear" style="display: none;">
						<li><a href="#" id="personalLogin" rel="nofollow"><i
								class="icon_hf icon_person"></i>求职者登录</a></li>
						<li class="none"><span class="l_line"></span><a href=""
							rel="nofollow"><i class="icon_hf icon_hr"></i>企业用户登录</a></li>
					</ul>
					<ul class="yc_logined" style="display: none;">
						<li class="none" id="user_info" data-tag="user_info"><a
							href="javascript:;"><i class="icon_hf icon_person"></i><span
								id="user_name">${cmaccount}</span><i class="icon_hf icon_down"></i></a>
							<div class="whitebar"></div>
							<ul class="user_info_list pub_list">
								<li class="user_info_show clear">
									<div class="left">
										<c:if test="${head!=null}">
											<img src="image/${head}" alt="image/${head}" />
										</c:if>
										<c:if test="${head==null}">
											<img src="images/person.jpg" alt="" />
										</c:if>
										<span class="user_name">您好，尊敬的招聘网用户</span>
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
					<li id="mys-42bdb0e40bc5a157901571bbj"><a title="我的简历"
						href="cmuser/gomycv" data-src=""> 我的简历 </a></li>
				</ul>
			</div>
			<div class="item-person progress">
				<p class='noPointer'>
					<a href="javascript:;"><i class="m-icon i-progress"></i>求职进展</a>
				</p>
				<ul>
					<li><a class="choose on" href="cmuser/goshowSendRecord"
						data-src="" data-hash="progress">投递进展</a></li>
				</ul>
			</div>
			<div class="item-person account">
				<p class='tilMR'>
					<a href="cmuser/goaccountSettings" data-src="" data-hash="setting"><i
						class="m-icon i-account"></i>账号设置</a>
				</p>
			</div>
		</div>
		<div class="rt-person">
			<div class="box-progress">
				<form action="cmuser/goshowSendRecord" id="fm_send">
					<input id="ipt_status" type="hidden" name="status" value="${status}"/>
					<input id="ipt_pageNum" type="hidden" name="pageNum" value="${pageNum}"/>
				</form>
				<div class="til-progress">投递进展</div>
				<div class="tab-progress">
					<ul>
						<c:if test="${status==1}">
							<li class="tilSuccess on" data-status="1">投递成功</li>
							<li class="tilSee" data-status="2">已查看</li>
							<li class="tilInterest" data-status="3">感兴趣</li>
							<li class="tilInterest" data-status="7">面试邀请</li>
							<li class="tilNo" data-status="6">不合适</li>
						</c:if>
						<c:if test="${status==2}">
							<li class="tilSuccess" data-status="1">投递成功</li>
							<li class="tilSee on" data-status="2">已查看</li>
							<li class="tilInterest" data-status="3">感兴趣</li>
							<li class="tilInterest" data-status="7">面试邀请</li>
							<li class="tilNo" data-status="6">不合适</li>
						</c:if>
						<c:if test="${status==3}">
							<li class="tilSuccess" data-status="1">投递成功</li>
							<li class="tilSee" data-status="2">已查看</li>
							<li class="tilInterest on" data-status="3">感兴趣</li>
							<li class="tilInterest" data-status="7">面试邀请</li>
							<li class="tilNo" data-status="6">不合适</li>
						</c:if>
						<c:if test="${status==6}">
							<li class="tilSuccess" data-status="1">投递成功</li>
							<li class="tilSee" data-status="2">已查看</li>
							<li class="tilInterest" data-status="3">感兴趣</li>
							<li class="tilInterest" data-status="7">面试邀请</li>
							<li class="tilNo on" data-status="6">不合适</li>
						</c:if>
						<c:if test="${status==7}">
							<li class="tilSuccess" data-status="1">投递成功</li>
							<li class="tilSee" data-status="2">已查看</li>
							<li class="tilInterest" data-status="3">感兴趣</li>
							<li class="tilInterest on" data-status="7">面试邀请</li>
							<li class="tilNo" data-status="6">不合适</li>
						</c:if>
					</ul>
				</div>
				<div class="con-progress">
					<c:if test="${status==1}">
						<div class="itemPro conSuccess on">
							<div class="box-item">
								<c:forEach items="${pagger.dataList}" var="item">
									<div class="itemDev">
										<div class="lf-all">
											<p class="name">
												<a href="job/jobDetailpub?jobid=${item.job.jobid}" target="_blank">${item.job.jobname}</a><span>（${item.job.minsal}-${item.job.maxsal}元/月）</span>
											</p>
											<p class="detail">
												<em>[${item.job.address}]</em><em>${item.job.experiencename}/${item.job.eduname}</em>
											</p>
										</div>
										<div class="ct-all">
											<p class="name">
												<a href="entp/qyDetail?entpid=${item.entpid}" target="_blank">${item.job.entpname}</a>
											</p>
										</div>
										<div class="rt-all">
											<span class="time">${item.changetime}</span><span class="state">投递成功</span>
										</div>
									</div>
								</c:forEach>
							</div>
							<c:if test="${pagger.dataList==null}">
								<div class="noItem" style="display: block;">
								<img src="images/progress.png">
								<p>暂无符合条件的投递记录！</p>
								</div>
							</c:if>
						</div>	
					</c:if>
					<c:if test="${status==2}">
						<div class="itemPro conSee on">
							<div class="box-item">
								<c:forEach items="${pagger.dataList}" var="item">
									<div class="itemDev">
										<div class="lf-all">
											<p class="name">
												<a href="job/jobDetailpub?jobid=${item.job.jobid}" target="_blank">${item.job.jobname}</a><span>（${item.job.minsal}-${item.job.maxsal}元/月）</span>
											</p>
											<p class="detail">
												<em>[${item.job.address}]</em><em>${item.job.experiencename}/${item.job.eduname}</em>
											</p>
										</div>
										<div class="ct-all">
											<p class="name">
												<a href="entp/qyDetail?entpid=${item.entpid}" target="_blank">${item.job.entpname}</a>
											</p>
										</div>
										<div class="rt-all">
											<span class="time">${item.changetime}</span><span class="state">已查看</span>
										</div>
									</div>
								</c:forEach>
							</div>
							<c:if test="${pagger.dataList==null}">
								<div class="noItem" style="display: block;">
								<img src="images/progress.png">
								<p>暂无符合条件的投递记录！</p>
								</div>
							</c:if>
						</div>
					</c:if>
					<c:if test="${status==3}">
						<div class="itemPro conInterest on">
							<div class="box-item">
								<c:forEach items="${pagger.dataList}" var="item">
									<div class="itemDev">
										<div class="lf-all">
											<p class="name">
												<a href="job/jobDetailpub?jobid=${item.job.jobid}" target="_blank">${item.job.jobname}</a><span>（${item.job.minsal}-${item.job.maxsal}元/月）</span>
											</p>
											<p class="detail">
												<em>[${item.job.address}]</em><em>${item.job.experiencename}/${item.job.eduname}</em>
											</p>
										</div>
										<div class="ct-all">
											<p class="name">
												<a href="entp/qyDetail?entpid=${item.entpid}" target="_blank">${item.job.entpname}</a>
											</p>
										</div>
										<div class="rt-all">
											<span class="time">${item.changetime}</span><span class="state">感兴趣</span>
										</div>
									</div>
								</c:forEach>
							</div>
							<c:if test="${pagger.dataList==null}">
								<div class="noItem" style="display: block;">
								<img src="images/progress.png">
								<p>暂无符合条件的投递记录！</p>
								</div>
							</c:if>
						</div>
					</c:if>
					<c:if test="${status==6}">
						<div class="itemPro conNo on">
							<div class="box-item">
								<c:forEach items="${pagger.dataList}" var="item">
									<div class="itemDev">
										<div class="lf-all">
											<p class="name">
												<a href="job/jobDetailpub?jobid=${item.job.jobid}" target="_blank">${item.job.jobname}</a><span>（${item.job.minsal}-${item.job.maxsal}元/月）</span>
											</p>
											<p class="detail">
												<em>[${item.job.address}]</em><em>${item.job.experiencename}/${item.job.eduname}</em>
											</p>
										</div>
										<div class="ct-all">
											<p class="name">
												<a href="entp/qyDetail?entpid=${item.entpid}" target="_blank">${item.job.entpname}</a>
											</p>
										</div>
										<div class="rt-all">
											<span class="time">${item.changetime}</span><span class="state">不合适</span>
										</div>
									</div>
								</c:forEach>
							</div>
							<c:if test="${pagger.dataList==null}">
								<div class="noItem" style="display: block;">
								<img src="images/progress.png">
								<p>暂无符合条件的投递记录！</p>
								</div>
							</c:if>
						</div>
					</c:if>
					<c:if test="${status==7}">
						<div class="itemPro conInterest on">
							<div class="box-item">
								<c:forEach items="${pagger.dataList}" var="item">
									<div class="itemDev">
										<div class="lf-all">
											<p class="name">
												<a href="job/jobDetailpub?jobid=${item.job.jobid}" target="_blank">${item.job.jobname}</a><span>（${item.job.minsal}-${item.job.maxsal}元/月）</span>
											</p>
											<p class="detail">
												<em>[${item.job.address}]</em><em>${item.job.experiencename}/${item.job.eduname}</em>
											</p>
										</div>
										<div class="ct-all">
											<p class="name">
												<a href="entp/qyDetail?entpid=${item.entpid}" target="_blank">${item.job.entpname}</a>
											</p>
										</div>
										<div class="rt-all">
											<span class="time">${item.changetime}</span><span class="state">已发送面试邀请</span>
										</div>
									</div>
								</c:forEach>
							</div>
							<c:if test="${pagger.dataList==null}">
								<div class="noItem" style="display: block;">
								<img src="images/progress.png">
								<p>暂无符合条件的投递记录！</p>
								</div>
							</c:if>
						</div>
					</c:if>
				</div>
				<!-- 分页 -->
				<div class="pageList" id="page"></div>
				<script type="text/javascript" src="laypage-v1.3/laypage/laypage.js"></script>
				<script type="text/javascript">
					laypage({
					  cont: 'page',
					  pages: parseInt("${pagger.totalPage}"), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
					  curr: parseInt("${pagger.currentPage}"),
					  jump: function(e, first){ //触发分页后的回调
					    if(!first){ //一定要加此判断，否则初始时会无限刷新
					      var fm =  $("#fm_send").serialize().replace("pageNum=${pagger.currentPage}","pageNum="+e.curr); 
					      location.href = "cmuser/goshowSendRecord?"+fm;
					    }
					  }
					});
				</script>
			</div>
		</div>
		<div class="clear"></div>
	</div>
	<div id="yc_footer">
		<div class="page help clear2"></div>
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
</body>
</html>