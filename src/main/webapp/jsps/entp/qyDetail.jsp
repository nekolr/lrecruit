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
<title>公司详情</title>
<link rel="stylesheet" href="css/main4.css">
<link rel="stylesheet" href="css/companyDetail.css">
<link rel="stylesheet" href="css/searchResult.css">
<script type="text/javascript" src="js/dictionary.js"></script>
<script src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript">
	$(function() {
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
	});
</script>
</head>
<body>
	<div class="yc_header">
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
											<c:if test="${head!=null}"><img src="image/${head}" alt="image/${head}"> </c:if>
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
                <a href="" data-selectid="index">招聘网</a>
            </div>
            <ul class="tnav_wrap">
                <li><a href="/LRecruit" data-selectid="index">首页</a></li>
                <li><a href="job/sou" id="toJob" data-selectid="job" target="_blank">职位</a></li>
            </ul>
        </div>
    </div>
	</div>
	<div class="main">
		<!-- 公司基本信息 -->
		<div class="base-company">
			<div class="logo-company">
				<img src="image/${entp.logo}" alt="">
			</div>
			<div class="infor-company ">
				<div class="mc-company">
					<div class="wrap-til">
						<h1>${entp.entpname}</h1>
					</div>
					<div class="wrap-mc">
						<em>${entp.entpaddress}</em> <em> ${trade.tradename} </em> <em class="entpnature"></em> <em
							class="wrap-hasc"><a href="#com-comment">评论(<i>0</i>) 查看
						</a></em>
					</div>

				</div>
				<div class="address-company clear">
					<div class="address">
						<p>
							<i class="icon_hf add"></i>公司地址：${entp.detailaddress}
						</p>
					</div>
					
					<!--  -->
					<div class="map"></div>

				</div>
			</div>
		</div>
		<!-- 公司介绍 -->
		<div class="intro-company">
			<h2 class="h-company">公司介绍</h2>
			<div class="art-company">
				<div class="article"
					style="text-indent: 2em; white-space: pre-wrap; word-wrap: break-word;">${entp.entpmark}</div>
			</div>

		</div>

		<!-- 评论区Start -->
		<div id="com-comment" class="com-comment">
			<div class="title">
				<h3>公司评论</h3>
				<div class="jpage">
					<span class="cpage_pre"><i class="picon picon_left"></i></span> <span
						class="cpage_cur">1</span>/<span class="cpage_total">1</span> <span
						class="cpage_next"><i class="picon  picon_right"></i></span>
				</div>
			</div>
		</div>
		<!-- 评论区End -->

		<!-- 同行业公司相似职位 -->
		<div class="same-jobs jpadding mt15">
			<div class="title">
				<h3>该公司发布职位</h3>
			</div>
			<div class="resultList">
				<c:forEach items="${jobList}" var="item">
					<div class="jobList ">
						<ul>
							<li class="l1"><span class="e1"><a target="_blank" href="job/jobDetailpub?jobid=${item.jobid}">${item.jobname}</a></span>
								<span class="e2"><a href="javascript:;">${item.posttime}</a></span> 
								<span class="e3"><a href="javascript:;">${entp.entpname}</a></span>
							</li>
							<li class="l2">
								<span class="e1"> [${item.address}] </span> 
								<span class="e2">${item.minsal}-${item.maxsal}</span> 
								<span class="e3"> <em>${trade.tradename} </em> <i>|</i> <em class="entpsize"></em></span>
							</li>
						</ul>
					</div>
				</c:forEach>
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