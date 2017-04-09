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
<title>公司详情</title>
<link rel="stylesheet" href="css/main2.css">
<link rel="stylesheet" href="css/jobPost.css">
<link rel="stylesheet" href="css/selector.css">
<link type="text/css" href="css/city-picker.css" rel="stylesheet">
<script src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/qyinfo.js"></script>
<script type="text/javascript" src="js/dictionary.js"></script>
<script src="js/city-picker.data.js"></script>
<script src="js/city-picker.js"></script>
<script type="text/javascript">
	$(function() {
		//企业地址
		var $citypicker = $('#city-picker');
		var citypickerArr = "${entp.entpaddress}".split("/");
		$citypicker.citypicker({
			province : citypickerArr[0],
			city : citypickerArr[1],
			district : citypickerArr[2]
		});
/* 		$citypicker.citypicker('reset'); */
		//企业性质
		$("#entpnature").val(entpnature["${entp.entpnature}"]);
		$("#entpnature_ipt").val("${entp.entpnature}");
		//公司规模
		$("#entpsize").val(entpsize["${entp.entpsize}"]);
		$("#entpsize_ipt").val("${entp.entpsize}");
		//企业详细地址
		$("#cityClick").val("${entp.detailaddress}");
		//简介
		$("#compDesc").val('${entp.entpmark}');
		//企业行业
		$("#trade").val("${trade.tradename}");
		$("#tradeid_ipt").val("${entp.tradeid}");
	});
</script>
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
		<div class="bg-jobPost">
			<div class="w1024 basic">
				<!-- form start -->
				<form action="entp/updateEntp" method="post" id="form1" autocomplete="off" enctype="multipart/form-data">
					<!-- 公司基本信息 -->
					<input type="hidden" name="entpid" value="${entp.entpid}" />
					<div class="infor-basic">
						<div class="til-pos">
							<p>
								<em class="tag">*</em>为必填项
							</p>
							<span class="til-jobPost">公司基本信息</span>
						</div>
						<div class="con-basic">
							<div class="tip">基本信息帮助求职者了解公司，一定要认真填写哦！</div>
							<div class="row-pos">
								<p class="caption"><em class="tag">*</em>公司简称</p>
								<input name="entpname" type="text" placeholder="填写大家最熟悉的名字哦！填写之后不可修改哦！" class="txt noT" id="brand" value="${entp.entpname}" />				
							</div>
							<div class="row-pos padd5px">
								<p class="caption">公司LOGO</p>
								<div class="logo-basic ml135">
									<em>在这个看脸的时代，用LOGO展示出公司的颜值吧~</em>
									<div class="img-changeCom" id="logo-add">
										<!-- <span>支持JPG，JPEG，GIF<br>格式图片，小于400K<br>最佳尺寸：164*100</span> --> 
										<c:if test="${entp.logo!=null}">
											<img id="logo_img" src="image/${entp.logo}" />										
										</c:if>
										<c:if test="${entp.logo==null}">
											<img id="logo_img" src="" />
										</c:if>
										<i class="c-icon img-close" style="display: none;"></i>
									</div>
									<div class="addProduct changeLogo blue" id="logo_upload">
										<i class="c-icon upload"></i>上传公司LOGO
										<input id="logo_ipt" type="file" name="img"/>
									</div>
								</div>
							</div>

							<div class="row-pos">
								<p class="caption">
									<em class="tag">*</em>公司行业
								</p>
								<!-- 无数据start -->
								<div id="industry" class="selc-child">
									<span><input id="trade" type="text" placeholder="选择公司行业"
										data-err="忘记选择公司行业了哦！" readonly="readonly" class="txt noBor" /><i
										class="icon-ar ar-dn"></i></span>
									<input type="hidden" name="tradeid" id="tradeid_ipt" />
								</div>
								<!-- 无数据end -->
							</div>
							<div class="row-pos">
								<p class="caption">
									<em class="tag">*</em>公司性质
								</p>
								<div id="NatureCom" class="selc-child" data-val="">
									<span><input id="entpnature" type="text" class="txt noBor" readonly="readonly" placeholder="选择公司性质" data-err="忘记选择公司性质了哦！" /><i class="icon-ar ar-dn"></i></span>
										<ul><li data-val="1" value="1">外商独资</li><li data-val="2" value="2">合资</li><li data-val="3" value="3">上市公司</li><li data-val="4" value="4">国企</li><li data-val="5" value="5">国家机关</li><li data-val="6" value="6">事业单位</li><li data-val="7" value="7">民企/私企</li><li data-val="8" value="8">代表处</li><li data-val="9" value="9">非赢利组织</li><li data-val="10" value="10">股份制</li><li data-val="99" value="99">其他</li></ul>
										<input type="hidden" name="entpnature" id="entpnature_ipt" />
								</div>
							</div>
							<div class="row-pos">
								<p class="caption">
									<em class="tag">*</em>公司规模
								</p>
								<div id="SizeCom" class="selc-child" data-val="">
									<span><input id="entpsize" type="text" class="txt noBor"
										readonly="readonly" placeholder="选择公司规模"
										data-err="忘记选择公司规模了哦！" /><i class="icon-ar ar-dn"></i></span>
									<ul><li data-val="1" value="1">20人以下</li><li data-val="2" value="2">21-50人</li><li data-val="3" value="3">51-100人</li><li data-val="4" value="4">101-300人</li><li data-val="5" value="5">301-500人</li><li data-val="6" value="6">500人以上</li></ul>
									<input type="hidden" name="entpsize" id="entpsize_ipt" />
								</div>
							</div>
							<div class="row-pos">
								<!-- container -->
								<p class="caption">
									<em class="tag">*</em>公司地址
								</p>
								<div style="position: relative; float: left;">
									<!-- container -->
									<input id="city-picker" name="entpaddress" readonly type="text" class="city-picker-input">
								</div>
								<div style="float: left; margin-left: 20px;">
									<input name="detailaddress" placeholder="填写详细地址" class="txt" id="cityClick" type="text">
								</div>
							</div>
							<div class="row-pos describe-pos company-pos">
								<p class="caption">
									<em class="tag">*</em>公司介绍
								</p>
								<div class="box-describe">
									<span>狂拽酷炫的公司介绍会帮你赢得求职者青睐哦！</span>
									<div class="wrap-textarea">
										<div class="bor-describe">
											<textarea name="entpmark" rows="" cols="" id="compDesc" placeholder="填写公司介绍"
												class="describe infor-com"></textarea>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<!-- 按钮 -->
					<div class="btn-jobPost">
						<input name="" type="button" value="立即发布" class="btn" id="subMit" />
					</div>

				</form>
				<!-- form end -->
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