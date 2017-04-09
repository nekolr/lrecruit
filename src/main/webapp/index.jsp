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
<title>招聘网</title>
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<link href="css/main1.css" rel="stylesheet" type="text/css" />
<link href="css/index.css" rel="stylesheet" type="text/css" />
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
	});
</script>
</head>
<body>
	<div id="yc_header" class="yc_header">
		<div id="yc_tnav" class="yc_tnav">
			<div class="page clear_no">
				<div class="logo">
					<a href="#"></a>
				</div>
				<ul class="tnav_wrap">
					<li><a href="/LRecruit">首页</a></li>
					<li><a href="job/sou">职位</a></li>
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
		<div class="content">
			<div class="sideBar">
				<div class="sideNav">
					<div class="sideBox">
						<div class="sideMen">
							<p class="tit">IT/互联网</p>
							<a href="#57">软件工程师</a> <a href="#58">架构师</a> <a href="#130">技术经理</a> <a
								href="#142">游戏策划</a> <i class="index-icon"></i>
						</div>
						<div class="sideMain hide">
							<p class="tit">计算机软件</p>
							<p class="alink">
								<a href="#56">高级软件工程师</a> <a href="#59">系统分析师</a> <a href="#60">需求分析师</a> <a
									href="#61">移动开发工程师</a> <a href="#63">ERP技术开发</a>
							</p>
							<p class="tit">产品/运营</p>
							<p class="alink">
								<a href="#139">产品专员</a> <a href="#144">移动产品经理</a> <a href="#149">内容运营</a> <a
									href="#152">用户运营</a> <a href="#159">营运专员</a>
							</p>
							<p class="tit">互联网研发/测试</p>
							<p class="alink alinkNor">
								<a href="#75">Java</a> <a href="#76">Python</a> <a href="#77">PHP</a> <a
									href="#78">.NET</a> <a href="#80">C++</a> <a href="#85">Ruby</a> <a href="#86">Hadoop</a> 
									<a href="#88">数据挖掘</a> <a href="#93">Go</a> <a href="#92">全栈工程师</a> <a href="#97">HTML5</a>
							</p>
						</div>
					</div>
					<div class="sideBox">
						<div class="sideMen">
							<p class="tit">会计/审计</p>
							<a href="#265">会计</a> <a href="#267">出纳员</a> <a href="#263">财务助理</a> <a
								href="#278">统计员</a> <a href="#294">行长/副行长</a> <i class="index-icon"></i>
						</div>
						<div class="sideMain hide">
							<p class="tit">财务/审计</p>
							<p class="alink">
								<a href="#262">财务顾问</a> <a href="#273">财务分析员</a> <a href="#269">审计专员/助理</a> <a
									href="#275">成本管理员</a> <a href="#277">资产/资金管理</a>
							</p>
							<p class="tit">银行</p>
							<p class="alink">
								<a href="#299">清算人员</a> <a href="#303">信贷管理</a> <a href="#304">银行柜员</a> <a
									href="#307">个人业务客户经理</a> <a href="#312">综合业务专员</a> <a href="#313">信审核查</a>
									 <a href="#297">风险控制</a> <a href="#315">行业研究</a>
							</p>
							<p class="tit">保险</p>
							<p class="alink alinkNor">
								<a href="#318">保险精算师</a> <a href="#324">保险核保</a> <a href="#325">保险理赔</a> <a
									href="#327">保险培训师</a> <a href="#330">再保险</a>
							</p>
						</div>
					</div>
					<div class="sideBox">
						<div class="sideMen">
							<p class="tit">制药/医疗</p>
							<a href="#532">临床研究员</a> <a href="#534">药品注册</a> <a href="#546">医药招商</a> <a
								href="#548">招投标管理</a> <i class="index-icon"></i>
						</div>
						<div class="sideMain hide">
							<p class="tit">生物/制药/医疗器械</p>
							<p class="alink">
								<a href="#533">临床协调员</a> <a href="#539">医药销售代表</a> <a href="#542">化学分析测试员</a> <a
									href="#535">药品生产/质量管理</a> <a href="#549">临床数据分析员</a>
							</p>
							<p class="tit">化工</p>
							<p class="alink alinkNor">
								<a href="#556">配色技术员</a> <a href="#558">化妆品研发</a> <a href="#559">食品/饮料研发</a> <a
									href="#560">造纸研发</a> <a href="#553">化工技术应用/化工工程师</a>
							</p>
						</div>
					</div>
					<div class="sideBox">
						<div class="sideMen">
							<p class="tit">广告/媒体/娱乐/出版</p>
							<a href="#644">文案/策划</a> <a href="#647">美术指导</a> <a href="#659">配音员</a> <a
								href="#658">音效师</a> <i class="index-icon"></i>
						</div>
						<div class="sideMain hide">
							<p class="tit">广告/会展</p>
							<p class="alink">
								<a href="#638">广告客户总监/副总监</a> <a href="#642">广告创意总监</a> <a href="#645">企业/业务发展经理</a> <a
									href="#646">企业策划人员</a> <a href="#640">广告客户专员</a>
							</p>
							<p class="tit">影视/媒体</p>
							<p class="alink">
								<a href="#653">导演/编导</a> <a href="#655">经纪人/星探</a> <a href="#656">演员/模特/主持人</a> <a
									href="#663">放映员</a> <a href="#661">后期制作</a> <a href="#657">摄影师/摄像师</a>
							</p>
							<p class="tit">写作/出版/印刷</p>
							<p class="alink alinkNor">
								<a href="#665">总编/副总编</a> <a href="#666">编辑</a> <a href="#667">记者</a> <a
									href="#669">排版设计</a> <a href="#676">调墨技师</a> <a href="#675">打稿机操作员</a> <a href="#679">电话采编</a>
									 <a href="#672">电分操作员</a> <a href="#670">校对/录入</a>
							</p>
						</div>
					</div>
					<div class="sideBox">
						<div class="sideMen">
							<p class="tit">教育/培训/律师</p>
							<a href="#617">法务专员</a> <a href="#622">合规经理</a> <a
								href="#596">家教</a> <a href="#600">兼职教师</a> <a href="#595">讲师/助教</a> <i class="index-icon"></i>
						</div>
						<div class="sideMain hide">
							<p class="tit">培训</p>
							<p class="alink">
								<a href="#606">培训督导</a> <a href="#607">培训讲师</a> <a href="#609">培训助理</a> <a
									href="#610">培训/课程顾问</a> <a href="#608">培训策划</a>
							</p>
							<p class="tit">翻译</p>
							<p class="alink alinkNor">
								<a href="#625">英语翻译</a> <a href="#626">日语翻译</a> <a href="#627">德语翻译</a> <a
									href="#628">法语翻译</a> <a href="#629">俄语翻译</a> <a href="#632">阿拉伯语翻译</a> 
									<a href="#631">韩语/朝鲜语翻译</a> <a href="#633">意大利语翻译</a> <a href="#635">泰语翻译</a>
							</p>
						</div>
					</div>
					<div class="sideTit">
						<p class="tit">
							<a href="#" target="_blank">全部职位类别</a>
						</p>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="search">
					<form id="form1" action="job/sou">
						<div class="wp-input">
						<input class="ser" name="jobname" placeholder="请输入职位" type="text" autocomplete="off" /> <input class="ser-btn" value="搜索" type="button" />
						</div>
					</form>
				</div>
				<div class="colBanner">
					<div class="listBan left">
						<ul>
							<li><a href="#" rel="nofollow" target="_blank"><img
									src="images/banner/banner01.jpg" /></a></li>
							<li><a href="#" rel="nofollow" target="_blank"><img
									src="images/banner/banner02.jpg" /></a></li>
							<li><a href="#" rel="nofollow" target="_blank"><img
									src="images/banner/banner03.jpg" /></a></li>
							<li><a href="#" rel="nofollow" target="_blank"><img
									src="images/banner/banner04.jpg" /></a></li>
						</ul>
					</div>
					<div class="listTab right">
						<ul>
							<li class="liHov"><img src="images/banner/banner_01.jpg" /></li>
							<li><img src="images/banner/banner_02.jpg" /></li>
							<li><img src="images/banner/banner_03.jpg" /></li>
							<li><img src="images/banner/banner_04.jpg" /></li>
						</ul>
					</div>
				</div>
				<div class="hotEnprise">
					<p class="tit">企业招聘</p>
					<div class="hotList">
						<ul class="bigList">
							<li><img class="lazyload" style="display: block;"
								src="image/1480743638319.png" /> <em>一切由你开始</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=14">新浪</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=14">新浪公司是一家服务于中国及全球华人社群的网络媒体公司。新浪通过门户网站新浪网、移动门户手机新浪网和社交网络服务及微博客服务微博组成的数字媒体网络，帮助广大用户通过互联网和移动设备获得专业媒体和用户自生成的多媒体内容（UGC）并与友人进行兴趣分享。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=14">查看更多职位</a>
								</div></li>
							<li><img class="lazyload" style="display: block;"
								src="image/1480583499014.png" /> <em>一切以用户价值为依归</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=13">腾讯</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=13">深圳市腾讯计算机系统有限公司成立于1998年11月，由马化腾、张志东、许晨晔、陈一丹、曾李青五位创始人共同创立。是中国最大的互联网综合服务提供商之一，也是中国服务用户最多的互联网企业之一。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=13">查看更多职位</a>
								</div></li>
							<li><img class="lazyload" style="display: block;"
								src="image/1480745454305.png" /> <em>让天下没有难做的生意</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=15">阿里巴巴集团</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=15">阿里巴巴网络技术有限公司（简称：阿里巴巴集团）是以曾担任英语教师的马云为首的18人，于1999年在杭州创立，他们相信互联网能够创造公平的竞争环境，让小企业通过创新与科技扩展业务，并在参与国内或全球市场竞争时处于更有利的位置。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=15">查看更多职位</a>
								</div></li>
							<li class="liLast"><img class="lazyload"
								style="display: block;" src="image/1480746183524.png" /> <em>哔哩哔哩 - ( ゜- ゜)つロ 乾杯~</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=16">杭州幻电科技有限公司</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=16">bilibili网站最大的特色是悬浮于视频上方的实时评论功能，爱好者称其为'弹幕'，这种独特的视频体验让基于互联网的即时弹幕能够超越时空限制，构建出一种奇妙的共时性的关系，形成一种虚拟的部落式观影氛围，让bilibili网站成为极具互动分享和二次创造的潮流文化娱乐社区。bilibili网站目前也是众多网络热门词汇的发源地之一。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=16">查看更多职位</a>
								</div></li>
							<li><img class="lazyload" style="display: block;"
								src="image/1480747571585.png" /> <em>百度一下，你就知道</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=17">百度</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=17">百度（Nasdaq：BIDU），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=17">查看更多职位</a>
								</div></li>
							<li><img class="lazyload" style="display: block;"
								src="image/1480749171272.png" /> <em>华为，不仅仅是世界500强</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=19">华为技术有限公司</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=19">华为技术有限公司是一家生产销售通信设备的民营通信科技公司，总部位于中国广东省深圳市龙岗区坂田华为基地。华为的产品主要涉及通信网络中的交换网络、传输网络、无线及有线固定接入网络和数据通信网络及无线终端产品，为世界各地通信运营商及专业网络拥有者提供硬件设备、软件、服务和解决方案。华为于1987年在中国深圳正式注册成立。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=19">查看更多职位</a>
								</div></li>
							<li><img class="lazyload" style="display: block;"
								src="image/1480756691833.png" /> <em>网购上京东，省钱又放心</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=20">京东</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=20">京东（JD）是中国最大的自营式电商企业，2015年第一季度在中国自营式B2C电商市场的占有率为56.3%。目前，京东集团旗下设有京东商城、京东金融、拍拍网、京东智能、O2O及海外事业部。2014年5月，京东在美国纳斯达克证券交易所正式挂牌上市（股票代码：JD），是中国第一个成功赴美上市的大型综合型电商平台，与腾讯、百度等中国互联网巨头共同跻身全球前十大互联网公司排行榜。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=20">查看更多职位</a>
								</div></li>
							<li class="liLast"><img class="lazyload"
								style="display: block;" src="image/1480757498269.png" /> <em>网聚人的力量</em>
								<div class="divMask hide">
									<p class="dmTxt">
										<span><a target="_blank" href="entp/qyDetail?entpid=21">网易公司</a></span> <a
											target="_blank" rel="nofollow" href="entp/qyDetail?entpid=21">网易 (NASDAQ: NTES)是中国领先的互联网公司，利用最先进的互联网技术，加强人与人之间信息的交流和共享，实现“网聚人的力量”。创始人兼CEO是丁磊。</a>
									</p>
									<a class="dmA" target="_blank" rel="nofollow" href="entp/qyDetail?entpid=21">查看更多职位</a>
								</div></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="footer">
		<div class="page copy">
			<p>Copyright © 版权所有</p>
		</div>
	</div>
</body>
</html>