<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
<title>职位搜索</title>
<link rel="stylesheet" href="css/main1.css">
<link rel="stylesheet" href="css/searchResult.css">
<link rel="stylesheet" href="css/selector.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/sou.js"></script>
<script type="text/javascript">
	var tradeid = "${conditionMap.tradeid}";
</script>
<script type="text/javascript">
	$(function() {
		//是否登录
		if ("${cmaccount}" != "") {
			$(".yc_unlogin").css("display", "none");
			$("#cm_yc_logined").css("display", "block");
		}
		if("${entpaccount}" != ""){
			$(".yc_unlogin").css("display", "none");
			$("#qy_yc_logined").css("display", "block");
		}
		//月薪选中样式
		if('${conditionMap.flag}'=="-1"){
			$("#selection .select-type:eq(2)>a .select-all").addClass("on");
			$("#selection .select-type:eq(2) .select-cont .select-l1 a").removeClass("on");
		}
		//公司性质选中样式
		if('${conditionMap.entpnature}'=="-1"){
			$("#selection .select-type:eq(1)>a .select-all").addClass("on");
			$("#selection .select-type:eq(1) .select-cont .select-l1 a").removeClass("on");
		}
		$("#selection .select-type:eq(1) .select-cont .select-l1 a").each(function(){
			if($(this).attr("data-val")=='${conditionMap.entpnature}'){
				$(this).addClass("on");
				$("#selection .select-type:eq(1)>a .select-all").removeClass("on");
			}
		});
		//月薪选中样式
		if('${conditionMap.flag}'=="-1"){
			$("#selection .select-type:eq(2)>a .select-all").addClass("on");
			$("#selection .select-type:eq(2) .select-cont .select-l1 a").removeClass("on");
		}
		$("#selection .select-type:eq(2) .select-cont .select-l1 a").each(function(){
			if($(this).attr("data-val")=='${conditionMap.flag}'){
				$(this).addClass("on");
				$("#selection .select-type:eq(2)>a .select-all").removeClass("on");
			}
		});
		//工作年限选中样式
		$("#workYear ul li").each(function(){
			if('${conditionMap.job.experience}'==$(this).attr("data-val")){
				$(this).addClass("on");
				$(this).parent().siblings("span").html($(this).text()+"<i class='icon-ar ar-dn'></i>");
			}
		});
		//学历选中样式
		$("#degree ul li").each(function(){
			if('${conditionMap.job.edu}'==$(this).attr("data-val")){
				$(this).addClass("on");
				$(this).parent().siblings("span").html($(this).text()+"<i class='icon-ar ar-dn'></i>");
			}
		});
	});
</script>
</head>
<body>
	<div id="yc_header" class="yc_header">
		<div id="yc_tnav">
			<div class="page clear_no">
				<div class="logo">
					<a href="javascript:;" data-selectid="index"></a>
				</div>
				<ul class="tnav_wrap">
					<li><a href="/LRecruit" id="toIndex" data-selectid="index">首页</a></li>
					<li><a href="job/sou" id="toJob" data-selectid="job">职位</a></li>
				</ul>
				<div class="yc_login">
					<ul class="yc_unlogin clear" style="display: block">
						<li><a href="gocmlogin" rel="nofollow">求职者登录</a></li>
						<li class="none"><a href="goqylogin">企业用户登录</a></li>
					</ul>
					<ul id="cm_yc_logined" class="yc_logined" style="display: none">
						<li class="none" id="cm_user_info" data-tag="user_info"><a
							href="javascript:;"> <i class="icon_hf icon_person"></i> <span
								id="user_name">${cmaccount}</span> <i class="icon_hf icon_down"></i>
						</a>
							<div class="whitebar"></div>
							<ul class="user_info_list pub_list" style="display: none;">
								<li class="user_info_show clear">
									<div class="left">
										<c:if test="${head!=null}"><img src="image/${head}" alt="image/${head}" /></c:if>
										<c:if test="${head==null}"><img src="images/person.jpg" alt="" /></c:if> 
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
					<ul id="qy_yc_logined" class="yc_logined" style="display: none">
						<li class="none" id="qy_user_info" data-tag="user_info"><a
							href="javascript:;"> <i class="icon_hf icon_person"></i> <span
								id="user_name">${entpaccount}</span> <i class="icon_hf icon_down"></i>
						</a>
							<div class="whitebar"></div>
							<ul class="user_info_list pub_list" style="display: none;">
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
		<div class="main">
		<!-- 搜索区块 -->
		<form id="fm_submit" action="job/sou">
			<div class="search">
				<div class="wp-input">
					<input type="text" class="ser" name="jobname" placeholder="请输入职位" value="${conditionMap.job.jobname}" autocomplete="off" /> <input
						type="button" value="搜索" class="ser-btn" />
				</div>
			</div>
			<!-- 相似词 -->
			<div class="cline"></div>
	
			<div id="div_hidden">
				<input type="hidden" name="tradeid" id="ipt_tradeid" value="${conditionMap.tradeid}"/>
				<input type="hidden" name="entpnature" id="ipt_entpnature" value="${conditionMap.entpnature}"/>
				<input type="hidden" name="minsal" id="ipt_minsal" value="${conditionMap.job.minsal}"/>
				<input type="hidden" name="maxsal" id="ipt_maxsal" value="${conditionMap.job.maxsal}"/>
				<input type="hidden" name="experience" id="ipt_experience" value="${conditionMap.job.experience}"/>
				<input type="hidden" name="edu" id="ipt_edu" value="${conditionMap.job.edu}"/>
				<input type="hidden" name="pageNum" id="ipt_pageNum" value="${pagger.currentPage}"/>
				<input type="hidden" name="flag" id="ipt_flag" value="${conditionMap.flag}"/>
			</div>
		</form>
		<div class="cline"></div>

		<!-- 筛选栏Start -->
		<section id="selection">
			<div class="cline"></div>
			<div class="select-type" data-type="industry">
				<div class="select-title">行业</div>
				<a data-val="-1" data-type="trade" href="javascript:;" rel="nofollow">
					<div class="select-all on">全部</div>
				</a>
				<div class="select-cont">
					<dl class="select-l1"></dl>
					<dl class="select-l2">
						<div class="select-l2-arrow"></div>
						<c:forEach items="${trademap}" var="trade" begin="0" end="7">
							<div class="l2-list" data-mark="${trade.key}">
								<c:forEach var="item" items="${trade.value}">
									<c:if test="${conditionMap.tradeid==item.tradeid}">
										<a data-val="${item.tradeid}" data-type="trade" href="javascript:;" class="on" rel="nofollow"><dt>${item.tradename}</dt></a>
									</c:if>
									<c:if test="${conditionMap.tradeid!=item.tradeid}">
										<a data-val="${item.tradeid}" data-type="trade" href="javascript:;" rel="nofollow"><dt>${item.tradename}</dt></a>
									</c:if>
								</c:forEach>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</dl>
					<dl class="select-l1 pt5"></dl>
					<dl class="select-l2">
						<div class="select-l2-arrow"></div>
						<c:forEach items="${trademap}" var="trade" begin="8" end="${fn:length(trademap)}">
							<div class="l2-list" data-mark="${trade.key}">
								<c:forEach var="item" items="${trade.value}">
									<c:if test="${conditionMap.tradeid==item.tradeid}">
										<a data-val="${item.tradeid}" data-type="trade" href="javascript:;" class="on" rel="nofollow"><dt>${item.tradename}</dt></a>
									</c:if>
									<c:if test="${conditionMap.tradeid!=item.tradeid}">
										<a data-val="${item.tradeid}" data-type="trade" href="javascript:;" rel="nofollow"><dt>${item.tradename}</dt></a>
									</c:if>								
								</c:forEach>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</dl>
				</div>
			</div>
			<div class="cline"></div>
			<div class="select-type" data-type="companyType">
				<div class="select-title">公司性质</div>
				<a href="javascript:;" class="on" rel="nofollow" data-type="entpnature" data-val="-1"><div class="select-all on" rel="nofollow">全部</div></a>
				<div class="select-cont">
					<dl class="select-l1">
						<a href="javascript:;" data-type="entpnature" data-val="1" rel="nofollow"><dt>外商独资</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="2" rel="nofollow"><dt>合资</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="3" rel="nofollow"><dt>上市公司</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="4" rel="nofollow"><dt>国企</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="5" rel="nofollow"><dt>国家机关</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="6" rel="nofollow"><dt>事业单位</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="7" rel="nofollow"><dt>民营/私企</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="8" rel="nofollow"><dt>代表处</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="9" rel="nofollow"><dt>非营利性组织</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="10" rel="nofollow"><dt>股份制</dt></a>
						<a href="javascript:;" data-type="entpnature" data-val="99" rel="nofollow"><dt>其他</dt></a>
					</dl>
				</div>
			</div>
			<div class="cline"></div>
			<div class="select-type" data-type="salary">
				<div class="select-title">月薪</div>
				<a href="javascript:;" data-val="-1" data-type="salrange" class="on" rel="nofollow"><div class="select-all on">全部</div></a>
				<div class="select-cont s">
					<dl class="select-l1">
						<a href="javascript:;" data-type="salrange" data-val="2000" rel="nofollow"><dt>2000以下</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="2000-4000" rel="nofollow"><dt>2000-4000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="4000-6000" rel="nofollow"><dt>4000-6000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="6000-8000" rel="nofollow"><dt>6000-8000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="8000-10000" rel="nofollow"><dt>8000-10000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="10000-15000" rel="nofollow"><dt>10000-15000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="15000-20000" rel="nofollow"><dt>15000-20000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="20000-30000" rel="nofollow"><dt>20000-30000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="30000-40000" rel="nofollow"><dt>30000-40000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="40000-50000" rel="nofollow"><dt>40000-50000</dt></a>
						<a href="javascript:;" data-type="salrange" data-val="50000" rel="nofollow"><dt>50000以上</dt></a>
					</dl>
				</div>
			</div>
			<div class="clear"></div>
		</section>
		<!-- 筛选栏End -->

		<div class="cline"></div>

		<!-- 搜索结果列表Start -->
		<div id="searchList">
			<div id="subSelection">
				<div class="wrap1">
					<div class="wrap2">
						<div class="totalResult cutWord">
							为你找到了<span>${pagger.totalRecord}</span>个职位
						</div>

						<div class="selc-bk">
							<div id="workYear" class="selc-child" data-val="-1">
								<span>不限经验<i class="icon-ar ar-dn"></i></span>
								<ul style="display:none;">
									<li data-val="-1" value="-1">不限经验</li>
									<li data-val="1" value="1">在读生</li>
									<li data-val="2" value="2">应届毕业生</li>
									<li data-val="3" value="3">1年</li>
									<li data-val="4" value="4">2年</li>
									<li data-val="5" value="5">3年</li>
									<li data-val="6" value="6">4年</li>
									<li data-val="7" value="7">5年</li>
									<li data-val="8" value="8">6年</li>
									<li data-val="9" value="9">8年</li>
									<li data-val="10" value="10">10年及以上</li>
								</ul>
							</div>
							<div id="degree" class="selc-child" data-val="-1">
								<span>不限学历<i class="icon-ar ar-dn"></i></span>
								<ul style="height: 198px; overflow-y: scroll;display:none;">
									<li data-val="-1" value="-1">不限学历</li>
									<li data-val="1" value="1">博士</li>
									<li data-val="2" value="2">EMBA</li>
									<li data-val="3" value="3">MBA</li>
									<li data-val="4" value="4">硕士</li>
									<li data-val="5" value="5">本科</li>
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
<!-- 							<div id="refTime" class="selc-child" data-val="-1">
								<span>更新时间<i class="icon-ar ar-dn"></i></span>
								<ul style="display:none;">
									<li data-val="-1" value="-1">不限</li>
									<li data-val="0" value="0">今天</li>
									<li data-val="3" value="3">3天内</li>
									<li data-val="7" value="7">1周内</li>
									<li data-val="14" value="14">2周内</li>
									<li data-val="30" value="30">1个月内</li>
									<li data-val="60" value="60">2个月内</li>
								</ul>
							</div> -->
						</div>
						<div class="quickPage">
							<c:if test="${pagger.totalRecord!=0}">
								<span><i>${pagger.currentPage}</i>&nbsp;/&nbsp;${pagger.totalPage}</span>
								<a href="javascript:;"></a>
							</c:if>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
			<div class="resultList">
				<c:forEach items="${pagger.dataList}" var="item">
					<div class="jobList" data-url="job/jobDetailpub?jobid=${item.jobid}">
						<ul>
							<li class="l1"><span class="e1" title="${item.jobname}"><a class="ur"
									href="job/jobDetailpub?jobid=${item.jobid}" target="_blank">${item.jobname}<i></i></a></span>
								<span class="e2">${item.posttime}</span> <span class="e3 cutWord"> <a
									data-url="entp/qyDetail?entpid=${item.entpid}"
									href="entp/qyDetail?entpid=${item.entpid}"
									target="_blank">${item.entpname}</a>
							</span></li>
							<li class="l2"><span class="e1" title="${item.address}">
									[${item.address}] ${item.eduname}</span> <span class="e2">${item.minsal}-${item.maxsal}</span> <span
								class="e3"> <em>${item.tradename}</em> <i>|</i> <em>${item.entpnature}</em> <i>|</i>
									<em>${item.entpsize}</em>
							</span></li>
						</ul>
					</div>
				</c:forEach>
		</div>
		<div id="page" style="margin-top:15px; text-align:center;"></div>
		<script type="text/javascript" src="laypage-v1.3/laypage/laypage.js"></script>
		<script type="text/javascript">
			laypage({
			  cont: 'page',
			  pages: parseInt("${pagger.totalPage}"), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			  curr: parseInt("${pagger.currentPage}"),
			  jump: function(e, first){ //触发分页后的回调
			    if(!first){ //一定要加此判断，否则初始时会无限刷新
			      var fm =  $("#fm_submit").serialize().replace("pageNum=${pagger.currentPage}","pageNum="+e.curr); 
			      location.href = "job/sou?"+fm;
			    }
			  }
			});
		</script>
		<!-- 搜索结果列表End -->
		<div class="cline"></div>

		<!-- 面包屑Start -->
		<!-- 面包屑End -->
	</div>
	<div id="yc_footer">
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
</body>
</html>