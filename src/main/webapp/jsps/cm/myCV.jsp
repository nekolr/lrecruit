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
<title>我的简历</title>
<link rel="stylesheet" href="css/selector.css" />
<link rel="stylesheet" href="css/main1.css">
<link rel="stylesheet" href="css/personal.css">
<link rel="stylesheet" href="css/myResume.css">
<style>
.main .selc-child span {
	height: 40px;
	width: 232px;
	line-height: 40px;
	border: 1px solid #ddd;
	font-size: 16px;
	color: #555;
}

.main .selc-child span i {
	top: 17px;
	right: 9px;
}
</style>
<link type="text/css" href="css/city-picker_cv.css" rel="stylesheet">
<script type="text/javascript" src="laydate/laydate.js"></script>
<script type="text/javascript" src="js/dictionary.js"></script>
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/jl.js"></script>
<script src="js/city-picker.data.js"></script>
<script src="js/city-picker.js"></script>
<script type="text/javascript">
	$(function() {
		var $citypicker = $('#city-picker');
		/* $citypicker.citypicker({
			province : '江苏省',
			city : '常州市',
			district : '溧阳市'
		}); */
		/* $citypicker.citypicker({
			placeholder:'    省    /   市   /   区   '
		}); */
		/* $citypicker.citypicker('reset'); */
		//是否登录
		if ("${cmaccount}" != "") {
			$(".yc_unlogin").css("display", "none");
			$(".yc_logined").css("display", "block");
		}
		//计算年龄
		function getAge(birthday) {
			var now = new Date().getFullYear();
			var birth = birthday.substring(0, 4);
			var age = parseInt(now) - parseInt(birth);
			return age;

		}
		;
		//通用ajax上传
		function ajaxSubmit(url, data, type, sucfn, errfn) {
			var time = new Date().getTime();
			$.ajax({
				url : url,
				type : type,
				data : data + "&time=" + time,
				success : sucfn,
				error : errfn
			});
		}
		;

		//初始化基本cv
		if ('${cv.sex}' != '') {
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(0) em:eq(0)")
					.text(sex[parseInt('${cv.sex}')]);//性别		
		}
		if ('${cv.birthday}' != '') {
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(0) em:eq(1)")
					.text(getAge('${cv.birthday}'));//年龄		
		}
		if ('${cv.height}' != '') {
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(1) em:eq(0)")
					.text("身高：" + '${cv.height}' + "cm");//身高			
		}
		if ('${cv.marry}' != '') {
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(1) em:eq(1)")
					.text(marry[parseInt('${cv.marry}')]);//婚否			
		}
		if ('${cv.topedu}' != '') {
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(0) em:eq(0)")
					.text(edu[parseInt('${cv.topedu}')]);//学历			
		}
		if ('${cv.experience}' != '') {
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(0) em:eq(1)")
					.text(experience[parseInt('${cv.experience}')]);//经验
		}
		if ('${cv.drivinglicense}' != '') {
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(1) em:eq(0)")
					.text(
							"驾照："
									+ drivinglicense[parseInt('${cv.drivinglicense}')]);//驾照			
		}
		//期望工作性质
		if ('${cv.jobnature}' != '') {
			$("#inforIntenDiv .boxInInten01:eq(0) .rtInInten01").text(
					jobnature[parseInt('${cv.jobnature}')]);
		}
		//期望职业
		if ('${cv.positionid}' != '') {
			ajaxSubmit("position/findPositionById",
					"positionid=${cv.positionid}", "post", function(msg) {
						$("#inforIntenDiv .boxInInten01:eq(1) .rtInInten01")
								.text(msg.positionname);
					}, function() {
						//
					});
		}
		//期望地点
		$("#inforIntenDiv .boxInInten01:eq(2) .rtInInten01").text(
				'${cv.wantaddress}');
		//期望公司性质
		if ('${cv.enterprisenature}' != '') {
			$("#inforIntenDiv .boxInInten01:eq(3) .rtInInten01").text(
					entpnature[parseInt('${cv.enterprisenature}')]);
		}
		//期望薪水
		if ('${cv.sal}' != '') {
			if ('${cv.negotiable}' == "1") {
				$("#inforIntenDiv .boxInInten01:eq(4) .rtInInten01").text(
						'${cv.sal}' + "及以上（可面议）");
			} else if ('${cv.negotiable}' == "0") {
				$("#inforIntenDiv .boxInInten01:eq(4) .rtInInten01").text(
						'${cv.sal}' + "及以上");
			}
		}
	});
</script>
</head>
<body>
	<div id="header" class="header">
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
						<li class="none"><span class="l_line"></span><a href="#"
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
					<li><a title="我的简历"
						href="cmuser/gomycv" class="choose"> 我的简历 </a></li>
				</ul>
			</div>
			<div class="item-person progress">
				<p class='noPointer'>
					<a href="javascript:;"><i class="m-icon i-progress"></i>求职进展</a>
				</p>
				<ul>
					<li><a href="cmuser/goshowSendRecord">投递进展</a></li>
				</ul>
			</div>
			<div class="item-person account">
				<p class='tilMR'>
					<a href="cmuser/goaccountSettings"><i class="m-icon i-account"></i>账号设置</a>
				</p>
			</div>
		</div>

		<div class="rt-person">
			<!-- 个人中心右侧 -->
			<div class="box-myResume">
				<div class="top-myResume">
					<div class="bar-myResume">
						<div class="lf-bar">
							<div class="til-myResume">
								<em class="name-myResume">我的简历</em>
							</div>
							<div class="line-myResume"></div>
							<div class="date-myResume">
								<em class="date-break">更新时间：${uptime}</em>
							</div>
						</div>
					</div>
					<div class="state-myResume">
						<div class="more-menu">
							<div class="more-myResume">
								<i class="m-icon i-more"></i>更多
							</div>
							<div class="more-menu-list" style="display: none;">
								<div class="trTop"></div>
								<ul>
									<li data-url="gocv?cvid=${cv.cvid}"><i class="m-icon i-view"></i>预览</li>
									<li><i data-url="download?cvid=${cvid}" class="m-icon i-download"></i>下载</li>
								</ul>
							</div>
						</div>
						<div class="reFresh-myResume">
							<i class="m-icon i-reFresh"></i>刷新
						</div>
						<div class="degree-myResume">
							<div class="percent"></div>
							<div class="msg-audit">
								<p class="msg"></p>
								<p>跟您竞争的求职者中有90%都填写了工作经历哦</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 简历主体 -->
				<div class="main-myResume">
					<div id="name-mr" class="name-mr">
						<div class="bg-name">
							<img src="images/resumeBg.jpg">
						</div>
						<div class="pro-name">
							<div class="perPhoto webuploader-container">
								<div class="webuploader-pick">
									<i class="camera"></i>
									<c:if test="${cv.head==null}">
										<img id="img_head" src="images/photo.png">
									</c:if>
									<c:if test="${cv.head!=null}">
										<img id="img_head" src="image/${cv.head}">
									</c:if>
									<div class="default">
										<div>头像最大400K,支持jpg,jpeg格式。</div>
									</div>
								</div>
								<div id="rt_ipt"
									style="position: absolute; top: 0px; left: 0px; width: 138px; height: 138px; overflow: hidden; bottom: auto; right: auto;">
									<input type="file" id="img_ipt" name="head"
										class="webuploader-element-invisible" multiple="multiple"
										accept="image/jpg,image/jpeg"> <label
										style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
								</div>
							</div>
							<div class="wz-name">
								<h3>${cv.realname}</h3>
								<p title="${cv.usermark}">${cv.usermark}</p>
							</div>
						</div>
					</div>
					<!-- 基本信息 -->


					<div id="base-mr" class="base-mr">
						<form id="baseForm">
							<input id="ipt_cvid" type="hidden" name="cvid" value="${cv.cvid}" />
							<!-- 基本信息编辑 -->
							<div class="editBase">
								<div class="triangle"></div>
								<div class="conedBase">
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>姓名
											</div>
											<div class="inputMr">
												<input name="realname" class="txt must formTerms"
													type="text" value="${cv.realname}">
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em>*</em>性别
											</div>
											<div class="inputMr iptrio" data-type="sex" data-val="1">
												<a href="javascript:;" data-val="1"
													class="iptRadio boy checked"><i class="m-icon i-boy"></i>男</a>
												<a href="javascript:;" data-val="0" class="iptRadio girl"><i
													class="m-icon i-girl"></i>女</a>
											</div>
											<input id="sexDummy" class="formTerms" name="sex" value="1"
												type="hidden">
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>出生日期
											</div>
											<div class="inputMr">
												<div class="ipt-child">
													<input id="birthDay" class="txt must formTerms"
														name="birthday" readonly="readonly" type="text"
														value="${cv.birthday}"> <i
														class="m-icon i-dn ico-intxt"></i>
												</div>
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>身高
											</div>
											<div class="inputMr">
												<input id="height" data-regexp="num" name="height"
													data-num="3" class="txt formTerms" value="${cv.height}"
													type="text"> <i class="iptLast">CM</i>
											</div>
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>最高学历
											</div>
											<div class="inputMr">
												<div id="hEducation" data-val="5"
													class="ipt-child selc-child">
													<span class="ipt-spn" data-type="degree">本科<i
														class="icon-ar ar-dn"></i></span>
													<ul style="height: 210px; overflow-y: scroll;">
														<li data-val="1" value="1">博士</li>
														<li data-val="2" value="2">EMBA</li>
														<li data-val="3" value="3">MBA</li>
														<li data-val="4" value="4">硕士</li>
														<li class="on" data-val="5" value="5">本科</li>
														<li data-val="6" value="6">大专</li>
														<li data-val="7" value="7">高职</li>
														<li data-val="8" value="8">高中</li>
														<li data-val="9" value="9">职高</li>
														<li data-val="10" value="10">中专</li>
														<li data-val="11" value="11">中职</li>
														<li data-val="12" value="12">中技</li>
														<li data-val="13" value="13">初中</li>
														<li data-val="14" value="14">其他</li>
													</ul>
												</div>
												<input id="hEducationDummy" class="formTerms option"
													name="topedu" value="5" type="hidden">
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>婚姻状况
											</div>
											<div class="inputMr iptrio" data-type="married" data-val="1">
												<a href="javascript:;" data-val="0" class="iptRadio checked">未婚</a>
												<a href="javascript:;" data-val="1" class="iptRadio">已婚</a>
											</div>
											<input id="marriedDummy" class="formTerms" name="marry"
												value="0" type="hidden">
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>目前居住地
											</div>

											<div class="inputMr">
												<div style="position: relative; float: left;">
													<!-- container -->
													<input id="city-picker" name="nowaddress" readonly
														type="text" class="city-picker-input txt">
												</div>
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>驾驶证
											</div>
											<div class="inputMr iptrio" data-type="abroadExp"
												data-val="2">
												<a href="javascript:;" data-val="0" class="iptRadio checked">无</a>
												<a href="javascript:;" data-val="1" class="iptRadio">有</a>
											</div>
											<input id="carDummy" class="formTerms" name="drivinglicense"
												value="0" type="hidden">
										</div>
									</div>

									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>工作经验
											</div>
											<div class="inputMr">
												<div id="hExperience" class="ipt-child selc-child">
													<span class="ipt-spn">1年<i class="icon-ar ar-dn"></i></span>
													<ul>
														<li data-val="1" value="1">在读生</li>
														<li data-val="2" value="2">应届毕业生</li>
														<li class="on" data-val="3" value="3">1年</li>
														<li data-val="4" value="4">2年</li>
														<li data-val="5" value="5">3年</li>
														<li data-val="6" value="6">4年</li>
														<li data-val="7" value="7">5年</li>
														<li data-val="8" value="8">6年</li>
														<li data-val="9" value="9">8年</li>
														<li data-val="10" value="10">10年及以上</li>
													</ul>
												</div>
											</div>
											<input id="hExperienceDummy" class="formTerms option"
												name="experience" value="3" type="hidden">
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>体重
											</div>
											<div class="inputMr">
												<input id="weight" data-regexp="num" name="weight"
													data-num="" class="txt formTerms" type="text"
													value="${cv.weight}"> <i class="iptLast">KG</i>
											</div>
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>手机
											</div>
											<div class="inputMr">
												<input name="phone" data-regexp="mobile"
													class="txt must formTerms" type="text" value="${cv.phone}">
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em>*</em>电子邮箱
											</div>
											<div class="inputMr">
												<input name="email" data-regexp="email"
													class="txt formTerms" type="text" value="${cv.email}">
											</div>
										</div>
									</div>
									<div class="edBase01">
										<div class="wordMr">
											<em></em>一句话自我介绍
										</div>
										<div class="inputMr ta">
											<!-- 										<div class="num">
											<em>0</em>/50
										</div> -->
											<textarea class="formTerms" data-num="50" name="usermark"
												cols="" rows="">${cv.usermark}</textarea>
										</div>
									</div>
									<div class="wrap-btn">
										<input value="保存" class="btn" id="edBase-submit" type="button">
										<input value="取消" class="btn white" id="edBase-cancel"
											type="button">
									</div>
								</div>
							</div>
						</form>
						<!-- 基本信息内容 -->
						<div class="inforBase">
							<div class="changeBase">
								<i class="m-icon i-pen"></i>
							</div>
							<div class="lfInBase">
								<ul>
									<li><i class="m-icon i-person"></i>
										<div class="conInBase">
											<p>
												<em></em> <em></em>
											</p>
											<p>
												<em></em> <em></em>
											</p>
										</div></li>
									<li><i class="m-icon i-file"></i>
										<div class="conInBase">
											<p>
												<em></em> <em></em>
											</p>
											<p>
												<em></em>
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


					<div class="edu-mr">
						<div class="tilPart">
							<div class="dashed"></div>
							<div class="wzPart">
								<span>教育经历</span>
							</div>
						</div>
						<div class="addInfor addModBtn" style="display: block;"></div>
						<!-- 教育经历编辑 -->
						<form id="fm_edu">
						<input type="hidden" name="cvid" value="${cv.cvid}" />
						<div class="editEdu" style="display: none;">
							<div class="triangle"></div>
							<div class="conedBase">
								<div class="edBase01">
									<div class="wordMr">
										<em>*</em>时间
									</div>
									<div class="inputMr inputTime">
										<div class="ipt-child">
											<input id="getEduStartTime" name="entertime" type="text"
												readonly="readonly" value="" class="txt formTerms must">
										</div>
										<div class="oneWord">至</div>
										<div class="ipt-child">
											<input id="getEduEndTime" name="outertime" type="text"
												readonly="readonly" value="" class="txt formTerms must">
										</div>
									</div>
								</div>
								<div class="edBase01">
									<div class="lfBase01">
										<div class="wordMr">
											<em>*</em>学校
										</div>
										<div class="inputMr">
											<input name="school" type="text" value=""
												class="txt formTerms must">
										</div>
									</div>
									<div class="rtBase01">
										<div class="wordMr">
											<em>*</em>专业
										</div>
										<div class="inputMr">
											<input name="major" type="text" value=""
												class="txt formTerms must">
										</div>
									</div>
								</div>
								<div class="edBase01">
									<div class="wordMr">
										<em></em>在校经历
									</div>
									<div class="inputMr ta">
										<textarea name="schoolexp" cols="" rows=""
											class="formTerms" data-num="1500"></textarea>
									</div>
								</div>
								<div class="wrap-btn">
									<input type="button" value="保存" class="btn save"> <input
										type="button" value="取消" class="btn white cancel">
								</div>
							</div>
						</div>
						</form>
						<!-- 教育经历信息 -->
						<div class="inforEdu canAdd" data-for="addEdu" data-mult="10">
							<div class="minCir">
								<i class="m-icon i-minCir"></i>
							</div>
							<div class="mods">
								<div class="ctInfor">
									<div class="btnBar">
										<i data-mod="edu" class="m-icon i-pen editBtn"></i>
									</div>
									<div class="tilEdit">
										<h3>${cv.school}</h3>
									</div>
									<div class="boxWork01">
										<div class="maxCir">
											<i class="m-icon i-maxCir"></i>
										</div>
										<div class="conWork">
											<c:if test="${cv.entertime!=null}">
												<div class="jobTime">${cv.entertime}  至  ${cv.outertime}</div>
											</c:if>
											<c:if test="${cv.entertime==null}">
												<div class="jobTime"></div>
											</c:if>
											<div class="conCom">
												<p>
													<em>${cv.major}</em>
												</p>
											</div>
											<div class="conJob">${cv.schoolexp}</div>
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
						<div class="addInfor addModBtn">
							<span id="editInten" class="addBtn" data-mod="inten"><i
								class="m-icon i-bluePen"></i><em>编辑</em></span>
						</div>
						<!-- 求职意向编辑 -->
						<form id="intenForm">
							<input type="hidden" name="cvid" value="${cv.cvid}" />
							<div class="editInten">
								<div class="triangle"></div>
								<div class="conedBase">
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>期望地点
											</div>
											<div class="inputMr">
												<div class="ipt-child">
													<input id="intenLoc" placeholder="不要乱填哦" class="txt"
														type="text" name="wantaddress">
												</div>
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>求职性质
											</div>
											<div class="inputMr iptrio" data-type="expJobType"
												data-val="1">
												<a href="javascript:;" data-val="1"
													class="iptRadio fullTime checked">全职</a> <a
													href="javascript:;" data-val="2" class="iptRadio partTime">兼职</a>
												<a href="javascript:;" data-val="3"
													class="iptRadio internShip">实习</a>
											</div>
											<input id="expJobTypeDummy" class="formTerms checkbox"
												name="jobnature" value="1" type="hidden">
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>期望工作
											</div>
											<div class="inputMr">
												<div class="ipt-child" id="jobs">
													<span><input placeholder="选择职位类别"
														data-err="忘记选择职位类别了哦！" readonly="readonly"
														class="txt noBor" type="text"><i
														class="icon-ar ar-dn"></i></span>
												</div>
												<input type="hidden" name="positionid" value=""
													id="tradeid_ipt" />
											</div>
										</div>
										<div class="rtBase01">
											<div class="wordMr">
												<em></em>期望公司性质
											</div>
											<div class="inputMr">
												<div id="intenComType" data-val="3"
													class="ipt-child selc-child">
													<span class="ipt-spn" data-type="natureCom">上市公司<i
														class="icon-ar ar-dn"></i></span>
													<ul>
														<li data-val="1" value="1">外商独资</li>
														<li data-val="2" value="2">合资</li>
														<li class="on" data-val="3" value="3">上市公司</li>
														<li data-val="4" value="4">国企</li>
														<li data-val="5" value="5">国家机关</li>
														<li data-val="6" value="6">事业单位</li>
														<li data-val="7" value="7">民企/私企</li>
														<li data-val="8" value="8">代表处</li>
														<li data-val="9" value="9">非赢利组织</li>
														<li data-val="10" value="10">股份制</li>
														<li data-val="99" value="99">其他</li>
													</ul>
												</div>
												<input id="intenComTypeDummy" class="formTerms option"
													name="enterprisenature" value="3" type="hidden">
											</div>
										</div>
									</div>
									<div class="edBase01">
										<div class="lfBase01">
											<div class="wordMr">
												<em>*</em>期望薪资
											</div>
											<div class="inputMr xl">
												<input name="sal" class="txt must formTerms" type="text">
												<i class="iptLast">及以上</i>
												<div class="discuss">
													<input type="checkbox" />可面议
												</div>
												<input id="negotiationDummy" name="negotiable" value="0"
													class="txt formTerms" type="hidden">
											</div>
										</div>
									</div>
									<div class="wrap-btn">
										<input value="保存" id="inten-submit" class="btn save"
											type="button"> <input value="取消"
											class="btn white cancel" id="inten-cancel" type="button">
									</div>

								</div>
							</div>
						</form>
						<!-- 求职意向信息 -->
						<div id="inforIntenDiv" class="inforInten canAdd"
							data-for="addInten">
							<div class="boxInInten01 mods">
								<span>求职性质：</span>
								<div class="rtInInten01"></div>
							</div>
							<div class="boxInInten01 mods">
								<span>期望工作：</span>
								<div class="rtInInten01"></div>
							</div>
							<div class="boxInInten01 mods">
								<span>期望地点：</span>
								<div class="rtInInten01"></div>
							</div>
							<div class="boxInInten01 mods">
								<span>期望公司性质：</span>
								<div class="rtInInten01"></div>
							</div>
							<div class="boxInInten01 mods">
								<span>期望薪水：</span>
								<div class="rtInInten01"></div>
							</div>
						</div>

						<div class="evalue-mr" style="display: block;">
							<div class="tilPart">
								<div class="dashed"></div>
								<div class="wzPart">
									<span>自我评价</span>
								</div>
							</div>
							<!-- 首次添加个人评价 -->
							<div id="addSelfEval" class="firstAdd" style="display: none;">
								<div id="addEval" class="btnFAdd">
									<i class="m-icon i-plusBlue"></i><span>添加自我评价</span>
								</div>
							</div>
							<!-- 个人评价编辑 -->
							<div class="editEvalue" style="display: none;">
								<div class="triangle"></div>
								<div class="conedBase">
									<div class="edBase01">
										<div class="wordMr">
											<em></em>自我描述
										</div>
										<div class="inputMr ta">
											<form id="fm_myself">
												<input name="cvid" value="${cv.cvid}" type="hidden" />
												<textarea class="formTerms must" data-num="500"
													name="myself" cols="" rows=""></textarea>
											</form>
										</div>
									</div>
									<div class="wrap-btn">
										<input type="button" value="保存" class="btn save"> <input
											type="button" value="取消" class="btn white cancel">
									</div>
								</div>
							</div>
							<!-- 个人评价信息 -->
							<div class="inforEvalue canAdd" data-am="evalue"
								data-for="addSelfEval" style="display: block;">
								<div class="btnBar">
									<i class="m-icon i-pen editBtn"></i>
								</div>
								<div class="textArea mods">${cv.myself}</div>
							</div>
						</div>
					</div>
					<!-- 添加更多 -->
					<div class="addMore-mr">
						<div class="tilPart">
							<div class="dashed"></div>
							<div class="wzPart">
								<span>添加附件</span>
							</div>
						</div>
						<div class="itemAddMore">
							<ul>
								<li id="project-addMore" data-for="project"><i
									class="m-icon i-dashed">附件</i><i class="m-icon i-addRed"></i></li>
							</ul>
						</div>
					</div>

					<div style="height: 100px"></div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
	</div>

	<!-- 语言技能E -->
	<!-- 模板End -->
	<div id="footer">
		<div class="page help clear2"></div>
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
	<script src="js/sea.js"></script>
	<script type="text/javascript" src="js/sea-config.js"></script>
	<script type="text/javascript">
		seajs.use("js/EditCv.js");
	</script>
</body>
</html>