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
<title>工作详情</title>
<link rel="stylesheet" href="css/main4.css">
<link rel="stylesheet" href="css/jobDetail.css">
<script src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/dictionary.js"></script>
<script type="text/javascript">
	$(function() {
		//工作性质
		$(".jobnature").text(jobnature["${job.jobnature}"]);
		//经验要求
		$(".experience").text("经验" + experience["${job.experience}"]);
		//学历要求
		$(".edu").text(edu["${job.edu}"]);
		//公司规模
		$(".entpsize").text(entpsize["${entp.entpsize}"]);
		//公司性质
		$(".entpnature").text(entpnature["${entp.entpnature}"]);
		
		if("${cmaccount}"!=""){
			$(".yc_logined").css("display","block");
			$(".yc_unlogin").css("display","none");
		}
		if("${entpaccount}"!=""){
			$("#qy_yc_logined").css("display","block");
			$(".yc_unlogin").css("display","none");
		}
		$(".jpadding #sendCv").click(function(){
			$("#fm_send").submit();
		});
	});
</script>
</head>
<body>
	<div id="yc_header" class="yc_header">
		<!--  -->
		<div class="tbar">
			<div class="page clear">
				<div class="tbar_right">
					<div class="yc_login">
						<ul class="yc_unlogin clear">
							<li id="clogin"><a
								href="gocmlogin" id="personalLogin" rel="nofollow"><i
									class="icon_hf icon_person"></i>求职者登录</a></li>
							<li id="blogin" class="none"><span class="l_line"></span><a
								href="goqylogin" rel="nofollow"><i
									class="icon_hf icon_hr"></i>企业用户登录</a></li>
						</ul>
						<ul class="yc_logined" style="display:none;">
							<li id="myCv"><a href="cmuser/gomycv"><i
									class="icon_hf icon_text_white"></i><span>我的简历</span></a></li>
							<li id="job_pro" class="bg_line" data-tag="job_pro"><a
								href="cmuser/goshowSendRecord" class="aaaa"><i
									class="icon_hf icon_info"></i><span>求职进展<em
										class="job_pro_num" style="display: none;"></em></span><i
									class="icon_hf icon_down proDown" style="display: none;"></i></a>
								<div class="whitebar"></div></li>
							<li class="none" id="user_info" data-tag="user_info"><a
								href="javascript:;"><i
									class="icon_hf icon_person"></i><span id="user_name">${cmaccount}</span><i
									class="icon_hf icon_down"></i></a>
								<div class="whitebar"></div>
								<ul class="user_info_list pub_list">
									<li class="user_info_show clear">
										<div class="left">
											<c:if test="${head!=null}"><img src="image/${head}" alt="image/${head}"></c:if>
											<span class="user_name">${cmaccount}</span>
										</div>

										<div class="right">
											<a href="cmuser/loginout"
												class="quit">退出</a>
										</div>
									</li>
									<li
										onclick="window.location.href='cmuser/gomycv'">
										<i class="icon_hf icon_text_red"></i>
										<p>我的简历</p> <span>查看</span>
									</li>
									<li
										onclick="window.location.href='cmuser/goshowSendRecord'">
										<i class="icon_hf icon_info_red"></i>
										<p>求职进展</p> <span>查看</span>
									</li>
									<li
										onclick="window.location.href='cmuser/goaccountSettings'">
										<i class="icon_hf icon_set"></i>
										<p>账号设置</p> <span>修改</span>
									</li>
								</ul></li>
						</ul>
						<ul id="qy_yc_logined" class="yc_logined" style="display: none">
						<li class="none" id="qy_user_info" data-tag="user_info"><a
							href="javascript:;"> <i class="icon_hf icon_person"></i> <span
								id="user_name">${entpaccount}</span> <i class="icon_hf icon_down"></i>
						</a>
							<div class="whitebar"></div>
							<ul class="user_info_list pub_list">
								<li class="user_info_show clear">
									<div class="left">
										<span class="user_name">您好，尊敬的招聘网用户</span>
									</div>

									<div class="right">
										<a href="entpuser/loginout">退出</a>
									</div>
								</li>
								<li onClick="window.location.href='entpuser/gopositionmanager'"><i
									class="icon_hf icon_text_red"></i>
									<p>职位管理</p> <span>查看</span></li>
								<li onClick="window.location.href='entpuser/gocvmanager'"><i
									class="icon_hf icon_info"></i>
									<p>简历管理</p> <span>查看</span></li>
								<li onClick="window.location.href='entpuser/goqyaccountSettings'"><i
									class="icon_hf icon_set"></i>
									<p>账号管理</p> <span>修改</span></li>
							</ul></li>
					</ul>
					</div>
				</div>
			</div>
		</div>
		<div id="yc_tnav">
			<div class="page clear_no">
				<div class="logo">
					<a href="" data-selectid="index" >招聘网</a>
				</div>
				<ul class="tnav_wrap">
					<li><a href="/LRecruit" id="toIndex"
						data-selectid="index">首页</a></li>
					<li><a href="job/sou" id="toJob"
						data-selectid="job"
						target="_blank" class="on">职位</a></li>
				</ul>
			</div>
		</div>
		
	</div>
	<div class="job-detail  page clear">
		<div class="job-detail-l">
			<!-- 职位简介 -->
			<input id="nowPage" type="hidden" value="job">
			<div class="job_profile jpadding">
				<div class="base_info">
					<div>
						<h1>
							<span class="job_name">${job.jobname}</span> <span class="part"></span>
						</h1>

					</div>
					<div class="job_require">
						<span class="job_price">${job.minsal}-${job.maxsal}</span> <i class="job_line">|</i>
						<span class="job_loc">${job.address}</span> <i class="job_line">|</i> <span class="jobnature"></span>
						<i class="job_line">|</i> <span class="edu"></span> <i class="job_line">|</i>
						<span class="experience"></span>
					</div>
				</div>

				<p class="updatetime">${job.posttime}</p>
				<!--投递简历按钮-->
				<c:if test="${entpaccount==null}">
					<c:if test="${cansend}">
						<div class="btnJL submitJL" id="sendCv" style="display: block;">申请职位</div>
						<form action="record/sendcv" id="fm_send">
							<input type="hidden" name="jobid" id="ipt_jobid" value="${job.jobid}"/>
							<input type="hidden" name="entpid" id="ipt_entpid" value="${entp.entpid}"/>
						</form>
					</c:if>
				</c:if>
				<!---->
			</div>
			<div class="job_intro jpadding  mt15">
				<div class="title">
					<h3>职位介绍</h3>
				</div>
				<div class="job_intro_wrap" style="height: 400px;">
					<strong></strong>
					<div class="job_intro_info">
						${job.mark}
					</div>
					<!--  -->
				</div>
			</div>
			<!--公司介绍-->
			<div class="company_intro  jpadding mt15">
				<div class="title">
					<h3>公司介绍</h3>
				</div>
				<h4>
					<a target="_blank"
						href="entp/qyDetail?entpid=${entp.entpid}">${entp.entpname}</a>
				</h4>
				<div class="compny_tag">
					<span class="job_loc">计算机硬件 </span> <i class="job_line">|</i> <span class="entpnature"></span>
					<i class="job_line">|</i> <span class="entpsize"></span>
				</div>
				<div class="company_service"
					style="text-indent: 2em; white-space: pre-wrap; word-wrap: break-word; height: 100px;">${entp.entpmark}</div>
			</div>
		</div>
		<div class="job-detail-r">
			<!--右侧公司信息-->
			<div class="job-company jrpadding">
				<div class="company-logo">
					<img
						src="image/${entp.logo}"
						alt="" >
				</div>
				<h4>
					<a target="_blank"
						href="entp/qyDetail?entpid=${entp.entpid}" >${entp.entpname}</a>
				</h4>
				<table>
					<tbody>
						<tr>
							<td class="e1">行业</td>
							<td>${trade.tradename}</td>
						</tr>
						<tr>
							<td class="e1">规模</td>
							<td class="entpsize"></td>
						</tr>
						<tr>
							<td class="e1">性质</td>
							<td class="entpnature"></td>
						</tr>
					</tbody>
				</table>

			</div>
			<!--右侧公司联系方式和地-->
			<div class="job-company  mt15 jrpadding">
				<table>
					<tbody>
						<!-- 用户登录，且有简历 -->
						<tr>
							<td class="e1">联系人</td>
							<td>${job.contact}</td>
						</tr>
						<tr>
							<td class="e1">手机</td>
							<td>${job.phone}</td>
						</tr>
					</tbody>
				</table>
				<div class="map"></div>
			</div>
			<div id="com-comment" class="com-comment">
				<div class="ctitle">
					<h3>公司评论</h3>
					<div class="jpage">
						<span class="cpage_pre"><i class="picon picon_left"></i></span> <span
							class="cpage_cur">1</span>/<span class="cpage_total">1</span> <span
							class="cpage_next"><i class="picon  picon_right"></i></span>
					</div>
				</div>
				<div class="commentList">
					<ul>
					</ul>
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
</body>
</html>