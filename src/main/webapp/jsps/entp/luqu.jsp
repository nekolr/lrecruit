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
<title>简历管理</title>
<link rel="stylesheet" href="css/main2.css">
<link rel="stylesheet" href="css/cvlist.css">
<link rel="stylesheet" href="css/selector.css">
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/cvlist.js"></script>
<script type="text/javascript">
	$(function(){
		//职位选中样式
		$("#jobs ul li").each(function(){
			if($(this).attr("data-val")=="${conditionMap.jobid}"){
				var clone = $("#jobs span i").clone(true);
				$(this).addClass("on");
				$(this).siblings("li").removeClass("on");
				if("${conditionMap.jobid}"!="-1"){
					$("#jobs span input").remove();
					$("#jobs span").html($(this).text()).append(clone);	
				}
			}
		});
		
		$("#workYear ul li").each(function(){
			if($(this).attr("data-val")=="${conditionMap.experience}"){
				var clone = $("#workYear span i").clone(true);
				$(this).addClass("on");
				$(this).siblings("li").removeClass("on");
				if("${conditionMap.experience}"!="-1"){
					$("#workYear span input").remove();
					$("#workYear span").html($(this).text()).append(clone);	
				}
			}
		});
		$("#degree ul li").each(function(){
			if($(this).attr("data-val")=="${conditionMap.edu}"){
				var clone = $("#degree span i").clone(true);
				$(this).addClass("on");
				$(this).siblings("li").removeClass("on");
				if("${conditionMap.edu}"!="-1"){
					$("#degree span input").remove();
					$("#degree span").html($(this).text()).append(clone);	
				}
			}
		});
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
				<li><a href="entpuser/gocvmanager" data-value="cvlist" class="on"> 简历管理</a></li>
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
		<div class="content">
			<div class="left">
				<div class="gradeA">应聘的简历</div>
				<div class="gradeB">
					<div id="jobs" class="selc-child">
						<span class="jobs">
							<input type="text" readonly="readonly" class="txt noBor" placeholder="全部职位" data-err="忘记选择职位啦！">
							<i class="icon-ar ar-dn"></i>
						</span>
						<ul>
							<li data-val="-1" value="-1">全部职位</li>
							<c:forEach items="${jobList}" var="item">
								<li data-val="${item.jobid}" value="${item.jobid}">${item.jobname}</li>								
							</c:forEach>
						</ul>
					</div>
				</div>
				<div class="gradeBshort" data-url="entpuser/gocvmanager">待筛选<div class="cvNum seling"></div></div>
				<div class="gradeBshort" data-url="entpuser/gogoutong">待沟通<div class="cvNum contacting"></div></div>
				<div class="gradeBshort" data-url="entpuser/yaoqing">邀请面试</div>
				<div class="gradeBshort" data-url="entpuser/gomianshi">已安排面试</div>
				<div class="gradeBshort on" data-url="entpuser/goluqu">已录取</div>
				<div class="gradeBshort" data-url="entpuser/gonot">不合适简历</div>
			</div>
			<div class="right">
			<form action="entpuser/gonot" id="fm_cv">
				<input type="hidden" name="status" id="ipt_status" value="${conditionMap.status}"/>
				<input type="hidden" name="jobid" id="ipt_jobid" value="${conditionMap.jobid}"/>
				<input type="hidden" name="experience" id="ipt_experience" value="${conditionMap.experience}"/>
				<input type="hidden" name="edu" id="ipt_edu" value="${conditionMap.edu}"/>
				<input type="hidden" name="pageNum" id="ipt_pageNum" value="${conditionMap.pageNum}"/>
			</form>
			<div class="category">			                        
				<div class="total">共计<span id="number" class="redTxt">${pagger.totalRecord}</span>份简历</div>
				<div class="type">待筛选</div>	
			</div>
			
			<div class="crossBar">
				<div id="workYear" class="selc-child">
					<span class="workYear">
						<input type="text" readonly="readonly" class="txt noBor" placeholder="工作经验不限" data-err="请选择工作经验！">
						<i class="icon-ar ar-dn"></i>
					</span>
					<ul>						
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
				<div id="degree" class="selc-child">
					<span class="degree">
						<input type="text" readonly="readonly" class="txt noBor" placeholder="学历不限" data-err="请选择学历！">
						<i class="icon-ar ar-dn"></i>
					</span>
					<ul style="height: 168px; overflow-y: scroll;">
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
			</div>
			<c:if test="${pagger.dataList==null}">
				<div class="noResults">
					<p>暂无简历~</p>
					<p>还有一堆人才等着你呢</p>
				</div>
			</c:if>
			<c:if test="${pagger.dataList!=null}">
				<div class="cvlist">
				<c:forEach items="${pagger.dataList}" var="item">
					<div class="cv" data-cvid="${item.cvid}" data-jobid="${item.jobid}" data-url="gocv">
						<div class="til_cv">
						    <span class="date_til">${item.sendtime}</span>
							<i class="c-icon check"></i>
							<span>应聘：</span>
							<span class="pos_til">${item.jobname}</span>
						</div>
						<div class="box_cv">
							<div class="opt_box">
								<div class="rt_opt">
								    <p>
										<!-- <span data-opt="3">已安排面试</span>
										<span data-opt="4">已面试</span> -->
										<!-- <span data-opt="5" class="on">已录取</span> -->
										<!-- <span data-opt="6">不合适</span> -->
										<span data-opt="7" class="on">删除</span>
									</p>
								</div>
							    <div class="lf_opt">
									<p>
										<em class="email_C" title=""></em>
										<em class="mobile_C"></em>
										<!-- <span data-opt="1" class="on contactU">不合适</span> -->
										<!-- <span data-opt="2">发送面试邀请</span> -->
									</p>
								</div>
							</div>
							<div class="detail_box">
								<div class="noBor">
									<span class="name">${item.cv.realname}</span>
									<c:if test="${item.cv.sex==1}">
										<span class="sex">（男</span>
									</c:if>
									<c:if test="${item.cv.sex==0}">
										<span class="sex">（女</span>
									</c:if>
									
									<span class="age">${item.cv.age}岁</span>
									<span class="work">${item.cv.experiencename}</span>
									<span class="address">${item.cv.nowaddress}）</span>
	                            </div>
								<!-- <div class="bor">
									<i class="c-icon job_icon"></i>
									<span class="job">暂无</span>
									<span class="com">暂无<em></em></span>
								</div> -->
								<div class="bor">
									<i class="c-icon school_icon"></i>				
									<span class="edu">${item.cv.eduname}</span>
									<span class="major" title="${item.cv.major}">${item.cv.major}</span>
								</div>
							</div>
						</div>
					</div>
				</c:forEach>							
			</div>
			<div class="checkAll">
				<div class="che">
					<i class="c-icon check"></i><em>全选</em>
				</div>
				<div class="btns">
					<span data-val="1">查看所选</span>
					<span data-val="2">导出</span>
					<span data-val="3">不合适</span>				
				</div>
			</div>
			<div class="pageList" id="page"></div>
			<script type="text/javascript" src="laypage-v1.3/laypage/laypage.js"></script>
			<script type="text/javascript">
				laypage({
				  cont: 'page',
				  pages: parseInt("${pagger.totalPage}"), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				  curr: parseInt("${pagger.currentPage}"),
				  jump: function(e, first){ //触发分页后的回调
				    if(!first){ //一定要加此判断，否则初始时会无限刷新
				      var fm =  $("#fm_cv").serialize().replace("pageNum=${pagger.currentPage}","pageNum="+e.curr); 
				      location.href = "entpuser/gonot?"+fm;
				    }
				  }
				});
			</script>
			</c:if>
			
			<!-- 子状态下没有简历结束 -->
			<!-- 全部状态下没有简历结束 -->
		</div>
		</div>
	</div>
	<div class="lock_win" style="display: none;"></div>
	<!-- <div class="pop-info normal">
		<div class="pop-body">
			<div class="pop-title">
				<div class="close"><i class="c-icon close-pop"></i></div>
			</div>
			<div class="pop-cont">确认简历不合适<br>确认后系统将自动发送不合适通知给求职者</div>
			<div class="pop-btn">
				<div class="btn0 set">确认</div><div class="btn1 cancle" style="color:#928472;">取消</div>
			</div>
		</div>
	</div> -->
	<div id="yc_footer" class="yc_footer">
		<div class="w1024 help clear"></div>
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
</body>
</html>