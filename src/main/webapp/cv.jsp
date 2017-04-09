<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>简历预览</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<link rel="stylesheet" href="css/resumeView-main.css" />
</head>
<body>
	<!-- 个人中心右侧 -->
	<div class="box-myResume">
		<!-- 简历主体 -->
		<div class="main-myResume">
			<div class="name-mr">
				<div class="bg-name">
					<img
						src="http://st02.chrstatic.com/themes/bchinahr/img/resumeBg_b.jpg">
				</div>
				<div class="pro-name">
					<div class="perPhoto">
						<c:if test="${cv.head!=null}"><img src="image/${cv.head}" /></c:if>
						<c:if test="${cv.head==null}"><img src="images/photo.png"></c:if>
					</div>
					<div class="wz-name">
						<h3>${cv.realname}</h3>
						<p title="${cv.usermark}">${cv.usermark}</p>
					</div>
				</div>
			</div>

			<!-- 基本信息 -->
			<div class="base-mr">
				<!-- 基本信息内容 -->
				<div class="inforBase">
							<div class="lfInBase">
								<ul>
									<li><i class="m-icon i-person"></i>
										<div class="conInBase">
											<p>
												<c:if test="${cv.sex==1}"><em>男</em></c:if><c:if test="${cv.sex==0}"><em>女</em></c:if> <em>${cv.age}</em>
											</p>
											<p>
												<em>身高：${cv.height}cm</em> <c:if test="${cv.marry==1}"><em>已婚</em></c:if><c:if test="${cv.marry==0}"><em>未婚</em></c:if>
											</p>
										</div></li>
									<li><i class="m-icon i-file"></i>
										<div class="conInBase">
											<p>
												<em>${cv.eduname}</em> <em>${cv.experiencename}</em>
											</p>
											<p>
												<c:if test="${cv.drivinglicense==1}"><em>驾照：有</em></c:if><c:if test="${cv.drivinglicense==0}"><em>驾照：无</em></c:if>
											</p>
										</div></li>
								</ul>
							</div>
							<div class="rtInBase">
								<ul>
									<li><i class="m-icon i-target"></i>
										<div class="conInBase">
											<p>
												<em>${cv.nowaddress}</em>
											</p>
											<p></p>
										</div></li>
									<li><i class="m-icon i-phone"></i>
										<div class="conInBase">
											<p>
												<em>${cv.phone}</em>
											</p>
										</div></li>
									<li><i class="m-icon i-mail"></i>
										<div class="conInBase">
											<p>
												<em>${cv.email}</em>
											</p>
										</div></li>
								</ul>
							</div>
						</div>
			</div>


			<!-- 工作经历 -->


			<!-- 教育经历 -->
			<div class="edu-mr">
				<div class="tilPart">
					<div class="dashed"></div>
					<div class="wzPart">
						<span>教育经历</span>
					</div>
				</div>
				<!-- 教育经历信息 -->
				<div class="inforWork">
					<div class="minCir">
						<i class="m-icon i-minCir"></i>
					</div>
					<div class="ctInfor">
						<div class="tilEdit">
							<h3>${cv.school}</h3>
						</div>
						<div class="boxWork01">
							<div class="maxCir">
								<i class="m-icon i-maxCir"></i>
							</div>
							<div class="conWork">
								<!--  <div class="jobTime">2013.07 － </div> -->
								<div class="jobTime">${cv.entertime}</div>
								<div class="conCom">
									<p>
										<em>${cv.eduname}</em> <em>${cv.major}</em>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="minCir">
						<i class="m-icon i-minCir"></i>
					</div>
				</div>
			</div>


			<!-- 求职意向 -->
			<div class="inten-mr">
				<div class="tilPart">
					<div class="dashed"></div>
					<div class="wzPart">
						<span>求职意向</span>
					</div>
				</div>
				<!-- 求职意向信息 -->
				<div class="inforInten">
					<div class="boxInInten01 mods">
						<span>求职性质：</span>
						<c:if test="${cv.jobnature==1}"><div class="rtInInten01">全职</div></c:if>
						<c:if test="${cv.jobnature==2}"><div class="rtInInten01">兼职</div></c:if>
						<c:if test="${cv.jobnature==3}"><div class="rtInInten01">实习</div></c:if>
					</div>
					<div class="boxInInten01 mods">
						<span>期望工作：</span>
						<div class="rtInInten01">${positionname}</div>
					</div>
					<div class="boxInInten01 mods">
						<span>期望地点：</span>
						<div class="rtInInten01">${cv.wantaddress}</div>
					</div>
					<div class="boxInInten01 mods">
						<span>期望公司性质：</span>
						<div class="rtInInten01">${cv.entpnaturename}</div>
					</div>
					<div class="boxInInten01 mods">
						<span>期望薪水：</span>
						<c:if test="${cv.negotiable==1}"><div class="rtInInten01">${cv.sal}及以上（可面议）</div></c:if>
						<c:if test="${cv.negotiable==0}"><div class="rtInInten01">${cv.sal}及以上</div></c:if>
					</div>
				</div>
			</div>
			<!-- 个人评价 -->
			<div class="evalue-mr">
				<div class="tilPart">
					<div class="dashed"></div>
					<div class="wzPart">
						<span>个人评价</span>
					</div>
				</div>
				<!-- 个人评价信息 -->
				<div class="inforEvalue">${cv.myself}</div>
			</div>
		</div>
	</div>
	<!--简历推荐-->
	<div id="feature"></div>
	<div id="yc_footer">
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>

	<div class="mask_op">
		<div class="mark_box">
			<span class="comBtn on"><em class="print" onclick="javascript:window.print();">打印</em> <!-- <em class="sprit">|</em><em class="forward">转发</em> --></span>
			<div class="mark_right">
				<span class="contactName on"><i class="batchIcon cname"></i>鲁临</span>
				<span class="contactPhone"><i class="batchIcon cphone"></i></span> <span
					class="contactMail"><i class="batchIcon cmail"></i></span>
				<!-- <div class="opBtns">
					待筛选
					<span data-val="9" class="green">免费沟通</span> <span data-val="1"
						class="on">联系他</span> <span data-val="2">发送面试邀请</span> <span
						data-val="3">已安排面试</span> <span data-val="4" class="greyBtn">已面试</span>
					<span data-val="5" class="greyBtn">已录取</span> <span data-val="6"
						class="on greyBtn">不合适</span> <span data-val="7">删除</span>
				</div> -->
			</div>
		</div>
	</div>

	<form id="expForm" name="expForm" target="_blank" method="post">
		<input id="batExpParam" name="batExpParam" type="hidden">
	</form>

	<input type="hidden" id="JobSeekerName" value="鲁临" />
	<input type="hidden" id="JobSeekerRealName" value="" />
	<input type="hidden" id="buid" value="20918866852097" />
	<input type="hidden" id="cvid" value="42bdb0e40bc5a157901571bbj" />
	<input type="hidden" id="cuid" value="f938b0e451c4a157ebd4fe48j" />
	<input type="hidden" id="unid" value="21371129064578" />
	<input type="hidden" id="jobid" value="5342109480780033" />
	<input type="hidden" id="type" value="1" />
	<input type="hidden" id="status" value="1" />
	<input type="hidden" id="gtid" name="gtid" value="">
</body>
</html>
