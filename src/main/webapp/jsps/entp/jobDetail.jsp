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
<link rel="stylesheet" href="css/main3.css">
<link rel="stylesheet" href="css/jobDetail.css">
<script src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/dictionary.js"></script>
<script type="text/javascript">
	$(function() {
		//工作性质
		$(".jobnature").text(jobnature["${job.jobnature}"]);
		//经验要求
		$(".experience").text("经验"+experience["${job.experience}"]);
		//学历要求
		$(".edu").text(edu["${job.edu}"]);
		//公司规模
		$(".entpsize").text(entpsize["${entp.entpsize}"]);
		//公司性质
		$(".entpnature").text(entpnature["${entp.entpnature}"]);
	});
</script>
</head>
<body>
	<div class="header">
		<c:if test="${entpaccount!=null}">
			<div class="rtHeader">
				<div class="comOpts">
					<span><i class="n-icon comIcon"></i><em id="companyName">${entp.entpname}</em><i
						class="minTrigon"></i></span>
					<div class="childOpts">
						<i class="n-icon whiteTri"></i>
						<ul>
							<li><a href="entpuser/goqyaccountSettings"><i class="n-icon acSet"></i>账号设置</a></li>
							<li><a href="entpuser/goqyinfo"><i class="n-icon bsInfor"></i>企业信息</a></li>
							<li><a href="entpuser/loginout"><i class="n-icon exit"></i>退出登录</a></li>
						</ul>
					</div>
				</div>
				<div class="comInfor">
					<a href="" target="_blank"><i class="n-icon bell"></i><i
						class="redCircle"></i>消息</a><a class="comMsg" href="" target="_blank">
						<i class="n-icon yellowTri"></i>
					</a>
				</div>
			</div>
		</c:if>
		<div class="lfHeader">
			<div class="serWrap" title="输入关键字，去简历库搜索心仪简历">
				<input id="cvSearch" name="cvSearch" type="text"
					placeholder="输入关键字，去简历库搜索心仪简历" class="cvSearch" autocomplete="off">
				<span id="submitSer"><i class="n-icon btnSer"></i></span>
			</div>
		</div>
	</div>
	<div class="job-detail  page clear w1024">
		<div class="job-detail-l">
			<!-- 职位简介 -->
			<input type="hidden" id="nowPage" value="joblist">
			<div class="job_profile jpadding">
				<div class="base_info">
					<div>
						<h1>
							<span class="job_name">${job.jobname}</span>
						</h1>
						<span class="part"></span>
					</div>
					<div class="job_require">
						<span class="job_price">${job.minsal} - ${job.maxsal}</span> <i
							class="job_line">|</i><span class="jobnature"></span> <i class="job_line">|</i>
						<span class="edu"></span> <i class="job_line">|</i> <span class="experience"></span>
					</div>
				</div>
			</div>
			<!--职位介绍 -->
			<div class="job_intro jpadding  mt15">
				<div class="title">
					<h3>职位介绍</h3>
				</div>
				<div class="job_intro_wrap">
					<div class="job_intro_info">
					${job.mark}
					</div>
				</div>
			</div>
			<!--公司介绍-->
			<div class="company_intro  jpadding mt15">
				<div class="title">
					<h3>公司介绍</h3>
				</div>
				<h4>
					<a target="_blank" href="entp/qyDetail?entpid=${entp.entpid}">${entp.entpname}</a>
				</h4>
				<div class="compny_tag">
					<span class="job_loc">${entp.entpaddress}</span> <i class="job_line">|</i> <span class="entpnature"></span>
					<i class="job_line">|</i> <span class="entpsize"></span>
				</div>
				<div class="company_service" style="height: 100px;">${entp.entpmark}</div>
			</div>
		</div>
		<div class="job-detail-r">
			<!--右侧公司信息-->
			<div class="job-company jrpadding">
				<div class="company-logo">
					<img src="image/${entp.logo}">
				</div>
				<h4>
					<a target="_blank" href="entp/qyDetail?entpid=${entp.entpid}">${entp.entpname}</a>
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
						<tr>
							<td class="e1">联系人</td>
							<td>${job.contact}</td>
						</tr>
						<tr>
							<td class="e1">邮箱</td>
							<td>${job.email}</td>
						</tr>

						<tr>
							<td class="e1">工作地址</td>
							<td>${job.address}</td>
						</tr>
					</tbody>
				</table>
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