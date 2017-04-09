<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<title>快速发布</title>
<link rel="stylesheet" href="css/main2.css">
<link rel="stylesheet" href="css/jobPost.css">
<link rel="stylesheet" href="css/selector.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/postPosition.js"></script>
</head>
<body>
	<div class="yc_header">
		<div class="yc_tnav w1024">
			<div class="logo">
				<a href=""></a>
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
	<div class="main">
		<div class="bg-jobPost">
			<div class="w1024 jobPost">
				<!-- form start -->
				<form action="job/addJob" method="post" id="form1" autocomplete="off">
					<input type="hidden" name="entpid" value="${entp.entpid}" />
					<!-- 职位信息 -->
					<div class="infor-pos">
						<div class="til-pos">
							<!-- <p><em class="tag">*</em>为必填项</p> -->
							<span class="til-jobPost">职位信息</span>
						</div>
						<div class="con-pos">
							<div class="one-pos">
								<div class="row-pos">
									<p class="caption">
										<em class="tag">*</em>职位名称
									</p>
									<input type="text" id="jobName" name="jobname" placeholder="请填写标准名称，可以提高排名，如大客户销售经理。" data-err="忘记填写职位名称了哦！"
										class="txt" />
								</div>
								<div class="row-pos">
									<p class="caption">
										<em class="tag">*</em>职位类别
									</p>
									<!-- <div id="industry" class="selc-child"> -->
									<div id="jobs" class="selc-child">
										<span><input type="text" placeholder="选择职位类别"
											data-err="忘记选择职位类别了哦！" readonly="readonly" class="txt noBor" /><i
											class="icon-ar ar-dn"></i></span>
									</div>
									<input type="hidden" name="positionid" id="tradeid_ipt" />
								</div>
								<div class="row-pos">
									<p class="caption">所属部门</p>
									<input type="text" id="depmName" name="deptname" placeholder="填写所属部门"
										class="txt noT" />
								</div>
								<div class="row-pos nature">
									<p class="caption"><em class="tag">*</em>工作性质</p>
									<input type="button" data-val="1" value="全职" class="c-icon radio checked"/>
									<input type="button" data-val="2" value="兼职" class="c-icon radio"/> 
									<input type="button" data-val="3" value="实习" class="c-icon radio"/>
									<input type="hidden" name="jobnature" id="jobnature_ipt" value="1" />
								</div>
								<div class="row-pos box-money">
									<p class="caption">
										<em class="tag">*</em>月薪范围
									</p>
									<span class="unit">元/月</span> <span class="unit unit2">元/月</span>
									<input data-err="忘记填写薪资了哦！" id="minSalary" name="minsal" type="text"
										placeholder="最低月薪" maxlength="6" class="txt money" />
									<div class="part"></div>
									<input type="text" data-err="忘记填写薪资了哦！" id="maxSalary" name="maxsal"
										maxlength="6" placeholder="最高月薪" class="txt money" />
								</div>
								<div class="row-pos">
									<p class="caption">
										<em class="tag">*</em>工作经验
									</p>
									<div id="workYear" class="selc-child" data-val="">
										<span><input type="text" readonly="readonly"
											class="txt noBor" placeholder="选择工作经验" data-err="忘记选择工作经验了哦！" /><i
											class="icon-ar ar-dn"></i></span>
											<ul><li data-val="1" value="1">在读生</li><li data-val="2" value="2">应届毕业生</li><li data-val="3" value="3">1年</li><li data-val="4" value="4">2年</li><li data-val="5" value="5">3年</li><li data-val="6" value="6">4年</li><li data-val="7" value="7">5年</li><li data-val="8" value="8">6年</li><li data-val="9" value="9">8年</li><li data-val="10" value="10">10年及以上</li></ul>										
									</div>
									<input type="hidden" name="experience" id="experience_ipt"/>
								</div>
								<div class="row-pos">
									<p class="caption">
										<em class="tag">*</em>学历要求
									</p>
									<div id="degree" class="selc-child" data-val="">
										<span><input type="text" readonly="readonly"
											class="txt noBor" placeholder="选择学历要求" data-err="忘记选择学历要求了哦！" /><i
											class="icon-ar ar-dn"></i></span>
											<ul style="height: 198px; overflow-y: scroll;"><li data-val="1" value="1">博士</li><li data-val="2" value="2">EMBA</li><li data-val="3" value="3">MBA</li><li data-val="4" value="4">硕士</li><li data-val="5" value="5">本科</li><li data-val="6" value="6">大专</li><li data-val="7" value="7">高职</li><li data-val="8" value="8">高中</li><li data-val="9" value="9">职高</li><li data-val="10" value="10">中专</li><li data-val="11" value="11">中职</li><li data-val="12" value="12">中技</li><li data-val="13" value="13">初中</li><li data-val="14" value="14">其他</li></ul>
									</div>
									<input type="hidden" name="edu" id="edu_ipt" />
								</div>
								<div class="row-pos wp-input">
									<p class="caption">
										<em class="tag">*</em>工作区域
									</p>
									<input id="cityClick" readonly="readonly" name="address"
										data-err="忘记填写工作区域了哦！" type="text" placeholder="填写工作区域"
										class="txt address" value="" />
								</div>
								<div class="row-pos describe-pos">
									<p class="caption">
										<em class="tag">*</em>职位介绍
									</p>
									<div class="box-describe">
										<div class="wrap-textarea">
											<div class="bor-describe">
												<textarea name="mark" rows="" cols=""
													placeholder="请填写岗位职责和任职要求，建议分条列出，以方便阅读"
													data-err="忘记填写任职描述了哦！" class="describe" id="jobDesc"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="infor-pub">
						<span class="til-jobPost">发布者信息</span>
						<div class="box-pub">
							<div class="row-pos">
								<p class="caption">
									<em class="tag">*</em>联系人
								</p>
								<input id="contact" name="contact" placeholder="填写联系人姓名"
									data-err="忘记填写联系人姓名了哦！" class="txt" type="text">
							</div>

							<div class="row-pos">
								<p class="caption">
									<em class="tag">*</em>手机
								</p>
								<input maxlength="11" id="mobile" name="phone"
									placeholder="填写11位手机号码" data-err="忘记填写手机号了哦！" class="txt"
									type="text">
							</div>
							<div class="row-pos mail-pub">
								<p class="caption">
									<em class="tag">*</em>联系邮箱
								</p>
								<div class="box-describe">
									<div class="box-mail">
										<input name="email" placeholder="填写公司邮箱更能获得求职者青睐哦！"
											value="" data-err="忘记填写邮箱了哦！" class="txt" type="text">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="height: 100px;"></div>
					<!-- 按钮 -->
					<div class="btn-jobPost">
						<input type="button" id="subMit" value="立即发布" class="btn" />
					</div>
					<input type="hidden" id="nowPage" value="joblist" />
				</form>
				<!-- form end -->
			</div>
		</div>
	</div>
	<div id="yc_footer" class="yc_footer">
		<div class="w1024 help clear">
			<div class="page copy">
				<p>Copyright © 版权所有</p>
			</div>
		</div>
	</div>
	<div class="lock_win" style="display:none;"></div>
	<div class="main mapMsg" style="display:none;">
		<div class="mapNav">
			<span class="mapMsgTit">编辑工作地址<em></em></span>
			<div class="row-pos">
				<p class="caption"><em class="tag">*</em>工作地址</p>
				<div style="position: relative; float: left;">
					<!-- container -->
					<input id="address" type="text" placeholder="填写地址" data-err="忘记填写详细地址了哦！" maxlength="100" class="txt">
				</div>
			</div>
			<div class="row-pos">
				
			</div>
			<div class="row-pos row-map">
				<p class="caption"><em class="tag">*</em>标注地图</p>
				<div id="allmap" style="width: 580px; height: 250px; top: 0px; overflow: hidden; position: relative; z-index: 0; color: rgb(0, 0, 0); text-align: left; background-color: rgb(243, 241, 236);"></div>
				<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=zQsndRYLoyZ8U0yIZjTbB4sQ7fIIUDZi"></script>
				<script type="text/javascript">
					// 百度地图API功能				
					var map = new BMap.Map("allmap");          
					map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
					map.enableScrollWheelZoom(true);
					map.reset();
					var local = new BMap.LocalSearch(map, {
						renderOptions:{map: map}
					});
					
					$("#address").on("focus keyup",function(){
						local.search($(this).val());
						$("#cityClick").val($(this).val());
					});
				</script>
			</div>
			<div class="Btn"><div class="mapBtn" id="mapBtn">保存</div><div class="cancelBtn" id="cancelBtn">取消</div></div>
		</div>
	</div>
</body>
</html>