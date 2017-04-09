$(function () {
	//通用ajax上传
	function ajaxSubmit(url,data,type,sucfn,errfn){
		var time = new Date().getTime();
		$.ajax({
			url:url,
			type:type,
			data:data+"&time="+time,
			success:sucfn,
			error:errfn
		});
	};
	//计算年龄
	function getAge(birthday){
		var now = new Date().getFullYear();
		var birth = birthday.substring(0,4);
		var age = parseInt(now) - parseInt(birth);
		return age;
		
	};
	//拆解address字符，得到数组(长度为0-3)
	function getAddressArray(address){
		var arr = address.split("/");
		return arr;
	}
	//刷新基本信息(显示界面)
	function flushBase(cv){
		if(cv.realname!=null){
			$("#name-mr .pro-name .wz-name h3").text(cv.realname);//姓名			
		}
		$("#name-mr .pro-name .wz-name p").attr("title",cv.usermark).text(cv.usermark);//简介		
		if(cv.sex!=null){
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(0) em:eq(0)").text(sex[parseInt(cv.sex)]);//性别			
		}
		if(cv.birthday!=null){
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(0) em:eq(1)").text(getAge(cv.birthday));//年龄
		}
		if(cv.height!=null){
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(1) em:eq(0)").text("身高："+cv.height+"cm");//身高
		}
		if(cv.marry!=null){
			$(".inforBase .lfInBase ul li:eq(0) .conInBase p:eq(1) em:eq(1)").text(marry[parseInt(cv.marry)]);//婚否			
		}
		if(cv.topedu!=null){
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(0) em:eq(0)").text(edu[parseInt(cv.topedu)]);//学历			
		}
		if(cv.experience!=null){
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(0) em:eq(1)").text(experience[parseInt(cv.experience)]);//经验			
		}
		if(cv.drivinglicense!=null){
			$(".inforBase .lfInBase ul li:eq(1) .conInBase p:eq(1) em:eq(0)").text("驾照："+drivinglicense[parseInt(cv.drivinglicense)]);//驾照			
		}
		if(cv.nowaddress!=null){
			$(".inforBase .rtInBase ul li:eq(0) .conInBase p:eq(0) em:eq(0)").text(cv.nowaddress);//目前居住地			
		}
		if(cv.phone!=null){
			$(".inforBase .rtInBase ul li:eq(1) .conInBase p:eq(0) em:eq(0)").text(cv.phone);//电话			
		}
		$(".inforBase .rtInBase ul li:eq(2) .conInBase p:eq(0) em:eq(0)").text(cv.email);//邮箱		
		
	};
	//刷新基本信息(修改界面)
	function flushBaseEdit(cv){
		//姓名
		if(cv.realname!=null){
			$("#base-mr .conedBase .edBase01:eq(0) .lfBase01 .inputMr input").val(cv.realname);
		}
		//性别
		if(cv.sex=='1'){
			$("#base-mr .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(0)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(1)").removeClass("checked");
			$("#sexDummy").val(cv.sex);
		}else if(cv.sex=='0'){
			$("#base-mr .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(1)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(0)").removeClass("checked");
			$("#sexDummy").val(cv.sex);
		}
		//出生年月
		$("#base-mr .conedBase .edBase01:eq(1) .lfBase01 .inputMr .ipt-child input").val(cv.birthday);
		//身高
		$("#base-mr .conedBase .edBase01:eq(1) .rtBase01 .inputMr input").val(cv.height);
		//最高学历
		$("#base-mr .conedBase .edBase01:eq(2) .lfBase01 .inputMr #hEducation span").text(edu[parseInt(cv.topedu)]);
		$("#hEducation ul li").each(function(){
			if($(this).attr("value")==cv.topedu){
				$(this).siblings("li").removeClass("on");
				$(this).addClass("on");
			}
		});
		if(cv.topedu!=null){
			$("#hEducationDummy").val(cv.topedu);	
		}
		//婚否
		if(cv.marry=='0'){
			$("#base-mr .conedBase .edBase01:eq(2) .rtBase01 .inputMr a:eq(0)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(2) .rtBase01 .inputMr a:eq(1)").removeClass("checked");
			$("#marriedDummy").val(cv.marry);
		}else if(cv.marry=='1'){
			$("#base-mr .conedBase .edBase01:eq(2) .rtBase01 .inputMr a:eq(1)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(2) .rtBase01 .inputMr a:eq(0)").removeClass("checked");
			$("#marriedDummy").val(cv.marry);
		}
		//目前居住地
		var $citypicker = $("#base-mr .conedBase .edBase01:eq(3) .lfBase01 .inputMr div #city-picker");
		if(cv.nowaddress==null){
			$citypicker.citypicker({
				placeholder:'    省    /   市   /   区   '
			});
		}else{
			var address = getAddressArray(cv.nowaddress);
			$citypicker.citypicker({
				province : address[0],
				city : address[1],
				district : address[2]
			});
		}
		//有无驾照
		if(cv.drivinglicense=='0'){
			$("#base-mr .conedBase .edBase01:eq(3) .rtBase01 .inputMr a:eq(0)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(3) .rtBase01 .inputMr a:eq(1)").removeClass("checked");
			$("#carDummy").val(cv.drivinglicense);
		}else if(cv.drivinglicense=='1'){
			$("#base-mr .conedBase .edBase01:eq(3) .rtBase01 .inputMr a:eq(1)").addClass("checked");
			$("#base-mr .conedBase .edBase01:eq(3) .rtBase01 .inputMr a:eq(0)").removeClass("checked");
			$("#carDummy").val(cv.drivinglicense);
		}
		//工作经验
		$("#base-mr .conedBase .edBase01:eq(4) .lfBase01 .inputMr #hExperience span").text(experience[parseInt(cv.experience)]);
		$("#hExperience ul li").each(function(){
			if($(this).attr("value")==cv.experience){
				$(this).siblings("li").removeClass("on");
				$(this).addClass("on");
			}
		});
		if(cv.experience!=null){
			$("#hExperienceDummy").val(cv.experience);
		}
		//体重
		$("#base-mr .conedBase .edBase01:eq(4) .rtBase01 .inputMr input").val(cv.weight);
		//手机
		$("#base-mr .conedBase .edBase01:eq(5) .lfBase01 .inputMr input").val(cv.phone);
		//电子邮箱
		$("#base-mr .conedBase .edBase01:eq(5) .rtBase01 .inputMr input").val(cv.email);
		//自我介绍
		$("#base-mr .conedBase .edBase01:eq(6) .inputMr textarea").text(cv.usermark);
		
	};
	//刷新更新时间
	function flushTime(uptime){
		$(".date-myResume date-break").text("更新时间："+uptime);
	};
	//刷新求职意向(显示)
	function flushInten(cv){
		//求职性质
		if(cv.jobnature!=null){
			$("#inforIntenDiv .boxInInten01:eq(0) .rtInInten01").text(jobnature[parseInt(cv.jobnature)]);			
		}
		//期望职业
		if(cv.positionid!=null){
			ajaxSubmit("position/findPositionById","positionid="+cv.positionid,"post",function(msg){
				$("#inforIntenDiv .boxInInten01:eq(1) .rtInInten01").text(msg.positionname);
			},function(){
				//
			});
		}
		//期望地点
		$("#inforIntenDiv .boxInInten01:eq(2) .rtInInten01").text(cv.wantaddress);
		//期望公司性质
		if(cv.enterprisenature!=null){
			$("#inforIntenDiv .boxInInten01:eq(3) .rtInInten01").text(entpnature[parseInt(cv.enterprisenature)]);			
		}
		//期望薪水
		if(cv.sal!=null){
			if(cv.negotiable=="1"){
				$("#inforIntenDiv .boxInInten01:eq(4) .rtInInten01").text(cv.sal+"及以上（可面议）");					
			}else if(cv.negotiable=="0"){
				$("#inforIntenDiv .boxInInten01:eq(4) .rtInInten01").text(cv.sal+"及以上");		
			}
		}
		
	};
	//刷新求职意向(修改)
	function flushIntenEdit(cv){
		//期望地址
		$(".editInten .conedBase .edBase01:eq(0) .lfBase01 .inputMr #intenLoc").val(cv.wantaddress);
		//期望工作性质
		if(cv.jobnature=='1'){
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(0)").addClass("checked");
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(0)").siblings("a").removeClass("checked");
		}else if(jobnature=='2'){
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(1)").addClass("checked");
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(1)").siblings("a").removeClass("checked");
		}else if(jobnature=='3'){
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(2)").addClass("checked");
			$(".editInten .conedBase .edBase01:eq(0) .rtBase01 .inputMr a:eq(2)").siblings("a").removeClass("checked");
		}
		//期望工作
		if(cv.positionid!=null){
			ajaxSubmit("position/findPositionById","positionid="+cv.positionid,"post",function(msg){
				$(".editInten .conedBase .edBase01:eq(1) .lfBase01 .inputMr #jobs span input").val(msg.positionname);
				$(".editInten .conedBase .edBase01:eq(1) .lfBase01 .inputMr #jobs span #tradeid_ipt").val(cv.positionid);
			},function(){
				//
			});
		}
		//期望公司性质
		if(cv.enterprisenature!=null){
			$(".editInten .conedBase .edBase01:eq(1) .rtBase01 .inputMr #intenComType span").text(entpnature[parseInt(cv.enterprisenature)]);
			$(".editInten .conedBase .edBase01:eq(1) .rtBase01 .inputMr #intenComType ul li").each(function(){
				if($(this).attr("value")==cv.enterprisenature){
					$(this).siblings("li").removeClass("on");
					$(this).addClass("on");
				}
			});
		}
		//期望工资
		$(".editInten .conedBase .edBase01:eq(2) .lfBase01 .inputMr input").val(cv.sal);
		//可面议
		if(cv.negotiable=='1'){
			$(".editInten .conedBase .edBase01:eq(2) .lfBase01 .inputMr .discuss input")[0].checked=true;			
			$("#negotiationDummy").val(1);			
		}else if(cv.negotiable=='0'){
			$(".editInten .conedBase .edBase01:eq(2) .lfBase01 .inputMr .discuss input")[0].checked=false;			
			$("#negotiationDummy").val(0);			
		}
	};
	//刷新教育经历(显示)
	function flushEdu(cv){
		if(cv.school!=null){
			$(".inforEdu .mods .ctInfor .tilEdit h3").text(cv.school);			
		}
		if(cv.entertime!=null && cv.outertime!=null){
			$(".inforEdu .mods .ctInfor .boxWork01 .conWork .jobTime").text(cv.entertime+"  至  "+cv.outertime);			
		}
		if(cv.major!=null){
			$(".inforEdu .mods .ctInfor .boxWork01 .conWork .conCom p em").text(cv.major);			
		}
		$(".inforEdu .mods .ctInfor .boxWork01 .conWork .conJob").text(cv.schoolexp);			
	};
	//刷新教育经历(编辑)
	function flushEduEdit(cv){
		$(".editEdu .conedBase .edBase01:eq(0) .inputMr .ipt-child:eq(0) input[type=text]").val(cv.entertime);
		$(".editEdu .conedBase .edBase01:eq(0) .inputMr .ipt-child:eq(1) input[type=text]").val(cv.outertime);
		
		$(".editEdu .conedBase .edBase01:eq(1) .lfBase01 .inputMr input[type=text]").val(cv.school);
		$(".editEdu .conedBase .edBase01:eq(1) .rtBase01 .inputMr input[type=text]").val(cv.major);
		
		$(".editEdu .conedBase .edBase01:eq(2) textarea").val(cv.schoolexp);
	};
	function flushMyself(cv){
		$(".inforEvalue .textArea").text(cv.myself);
	};
	function flushMyselfEdit(cv){
		$(".editEvalue .conedBase .edBase01 .inputMr #fm_myself textarea").text(cv.myself);
	};
	//刷新简历
	function flushCv(){
		var data = $("#ipt_cvid").serialize();//cvid
		ajaxSubmit("cv/flushCv",data,"post",function(msg){
			//成功
			var result = msg.result;//结果
			var cv = msg.cv;//cv
			var uptime = msg.uptime;//更新时间
			
			//刷新
			flushBase(cv);
			flushBaseEdit(cv);
			flushInten(cv);
			flushIntenEdit(cv);
			flushEdu(cv);
			flushEduEdit(cv);
			flushMyself(cv);
			flushMyselfEdit(cv);
			flushTime(uptime);
		},function(){
			//出错
		});
	};	
    //修改基本信息的隐藏和显示
    $(".changeBase i").click(function () {
    	flushCv();//执行
        $(".editBase").css("display", "block");
        $(".inforBase").css("display", "none");
    });
    $("#edBase-cancel").click(function () {
        $(".editBase").css("display", "none");
        $(".inforBase").css("display", "block");
    });

    $("#editInten").click(function () {
    	flushCv();//执行
        $(".inforInten").css("display","none");
        $(".editInten").css("display", "block");
    });
    $("#inten-cancel").click(function () {
        $(".inforInten").css("display","block");
        $(".editInten").css("display", "none");
    });
    //已婚、未婚 男、女etc
    $(".inputMr a").click(function () {
        $(this).addClass("checked");
        $(this).parent().siblings("input").val($(this).attr("data-val"));
        $(this).siblings().removeClass("checked");
    });
    //学历
    $("#hEducation").click(function () {
        if($(".sSelectOn ul").css("display")=="block"){
            $(this).parent().removeClass("sSelectOn");
        }else{
            $(this).parent().addClass("sSelectOn");
        }
    });
    
    //学历选中事件
    $("#hEducation ul li").click(function(){
    	//选中标记更改
    	$(this).siblings("li").removeClass("on");
    	$(this).addClass("on");
    	$("#hEducation .ipt-spn").text($(this).text());
    	$("#hEducation").removeClass("sSelectOn");
    	$("#hEducationDummy").val($(this).attr("data-val"));
    });
    
    //经验
    $("#hExperience").click(function () {
        if($(".sSelectOn ul").css("display")=="block"){
            $(this).parent().removeClass("sSelectOn");
        }else{
            $(this).parent().addClass("sSelectOn");
        }
    });
    
  //经验选中事件
    $("#hExperience ul li").click(function(){
    	//选中标记更改
    	$(this).siblings("li").removeClass("on");
    	$(this).addClass("on");
    	$("#hExperience .ipt-spn").text($(this).text());
    	$("#hExperience").removeClass("sSelectOn");
    	$("#hExperienceDummy").val($(this).attr("data-val"));
    });
    
    //期望公司性质点击事件
    $(".inten-mr .editInten .conedBase .edBase01:eq(1) .rtBase01 .inputMr #intenComType span").click(function(){
    	if($(this).siblings("ul").css("display")=="none"){
    		$(this).siblings("ul").css("display","block");	
    	}else{
    		$(this).siblings("ul").css("display","none");	    		
    	}
    });
    
    //期望公司性质点击事件
    $(".inten-mr .editInten .conedBase .edBase01:eq(1) .rtBase01 .inputMr #intenComType ul li").click(function(){
    	$(this).parent().siblings("span").text($(this).text());
    	$("#intenComTypeDummy").val($(this).attr("value"));
    	$(this).parent().css("display","none");
    });
    
    //可面议点击事件
    $(".inten-mr .editInten .conedBase .edBase01:eq(2) .lfBase01 .inputMr .discuss input[type='checkbox']").change(function(){
    	if($(this)[0].checked==true){
    		$("#negotiationDummy").val("1");
    	}else{
    		$("#negotiationDummy").val("0");		
    	}
    });
    
  //user_info控制
    $("#user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    //头像点击事件
    $("#rt_ipt label").click(function(){
    	$("#rt_ipt input").click();
    });
    //头像选择文件后事件
    $("#img_ipt").change(function(){
    	var logo_file = document.getElementById("img_ipt");
    	//预览图片容器
    	var logo_img = document.getElementById("img_head");
    	if(logo_file.files && logo_file.files[0]){//Firefox
    		logo_img.style.display = "block";
    		//logo_img.src = logo_file.file[0].getAsDataURL(); FF7以上版本不支持
    		logo_img.src = window.URL.createObjectURL(logo_file.files[0]);
    	}
    	//预览后提交
    	var $newInput = $("#img_ipt").clone(true);//克隆input，上传完后重新追加到原位置
    	var $form = $("<form id='ajaxForm' method='post'></form>").append($("#img_ipt")).appendTo("body");
    	
    	$("#ajaxForm").bind("submit",function(){
    	    var params = new FormData($("#ajaxForm")[0]);
    	    var xhr = new XMLHttpRequest();
    	    xhr.open("post","cv/ajaxUpdateHead",true);
    	    xhr.onreadystatechange=function(){
	    	    if(xhr.readyState==4&&xhr.status==200){
	    	    	var result = eval('('+xhr.responseText+')');
	    	    	if(result.result=="success"){
	    	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>上传成功</span></div>").appendTo("body");
	    	    	}else if(result.result=="failed"){
	    	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>上传失败</span></div>").appendTo("body");
	    	    	}
	    	    	setTimeout(function(){
    					$(".pop-mid").remove();
    					$(".hide_win").css("display","none");
    				},1000);
	    	    }
    	    }
    	    xhr.send(params);
    	    //发送后即删除form
	    	$("#ajaxForm").remove();
    	    //将input重新追加到原位置
    	    $("#rt_ipt").append($newInput);
    	    return false;
    	});
    	$("#ajaxForm").submit();
    });
    
    //基本信息保存事件
    $("#edBase-submit").click(function(){
    	var s = $("#baseForm").serialize();
    	ajaxSubmit("cv/ajaxUpdateCvbase",s,"post",function(msg){
    		//成功
    		$(".editBase").css("display", "none");
            $(".inforBase").css("display", "block");
            
    		var result = msg;
	    	if(result.result=="success"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存成功</span></div>").appendTo("body");
	    	}else if(result.result=="failed"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存失败</span></div>").appendTo("body");
	    	}
	    	setTimeout(function(){
				$(".pop-mid").remove();
				$(".hide_win").css("display","none");
			},1000);
	    	
	    	//刷新页面
	    	flushCv();
    	},function(request, textStatus, errorThrown){
    		//出错
    	});
    });
    function firstTradeClick(){
    	  //一级行业点击事件
      $("#jobsSelectDiv .jpList .jp-l1.fl li").click(function(){
      	var self = this;
      	//先删除其他兄弟节点的class
      	$(this).siblings('li').removeClass('ant'); 
      	$(this).addClass("ant");
      	//清空二级行业
      	$(".jp-l2 ul").empty();
      	//加载二级行业
      	var $_ul = $("<ul></ul>").appendTo($(".jp-l2"));
      	$.ajax({
      		type:"post",
      		data:"parentid="+this.dataset.id,
      		url:"trade/loadSecondTradeISPN",
      		success:function(msg){
      			for(var i=0;i<msg.length;i++){
      				$("<li data-id='"+msg[i].tradeid+"'>"+msg[i].tradename+"</li>").appendTo($_ul);   				
      			} 			
      			secondTradeClick();
      		}
      	});
      });
    };

    function secondTradeClick (){
    	  $("#jobsSelectDiv .jpList .jp-l2.sublist.fl li").click(function(){
    		$(".popWinSelector").addClass("thr");
    		//删掉上次加载出的position
    		if($(".jp-l3 ul") != undefined){
    			$(".jp-l3 span").remove();
    			$(".jp-l3 ul").remove();
    		}
    		//加载职位
    		var param = this.dataset.id;
    		var time = new Date().getTime();
    		$.ajax({
    			url:"position/loadPosition",
    			data:"tradeid="+param+"&time="+time,
    			type:"post",
    			success:function(msg){
    				$(".jp-l3").css("display","block");
    				var $_ul = $("<ul></ul>").appendTo($(".jp-l3"));
    				for(var i=0;i<msg.length;i++){
    					$("<li data-id='"+msg[i].positionid+"'>"+msg[i].positionname+"</li>").appendTo($_ul);   				
    		  		}
    				positionClick();
    			}
    		});
    	  });
    };

    //职位选择事件
    function positionClick (){
    	$(".jp-l3 ul li").click(function(){
    		var title = $("#jobs span");
    		$("#jobs span input").val($(this).text());
    	  	$("#jobs").removeClass("sSelectOn");
    	  	$("#jobs i").removeClass("ar-up").addClass("ar-dn");
    	  	$("#jobs ul").css("display","none");
    	  	//设置input[type='hidden']的值
      		$("#tradeid_ipt").val(this.dataset.id);
      		$(".jp-l3").css("display","none");//隐藏最右侧的职位选择
      		$(".popWinSelector").removeClass("thr");
      		$("#jobsSelectDiv").remove();
    	});
    };
    
    //职位类别点击事件
    $("#jobs span").click(function(){
    	var container = document.getElementById("jobsSelectDiv");
    	if(container != undefined){
    		container.remove();
    		$("#jobs").removeClass("sSelectOn");
        	$("#jobs i").removeClass("ar-up").addClass("ar-dn");
    	}else{
        	$("#jobs").addClass("sSelectOn");
        	$("#jobs i").removeClass("ar-dn").addClass("ar-up");
        	
        	//点击加载行业div
        	var $_container = $("<div id='jobsSelectDiv' class='popWinSelector inSelect'></div>");
        	$("#jobs").after($_container);
        	var $_multSelect = $("<div class='multSelectWin'></div>").appendTo($_container);
        	//var $_pre = $("<div class='jpTi'><div class='fl'><strong>选择行业类别</strong><span>（最多选择1个）</span></div></div><div style='display: none;' class='jpNn'><div class='fl'></div></div><div class='clear'></div>").appendTo($_multSelect);
        	
        	$("<div class='jpTi'><div class='fl'><strong>选择工作类型</strong><span>（最多选择1个）</span></div></div>").appendTo($_multSelect);;
        	$("<div class='jpNn' style='display: none;'><div class='fl'></div></div>").appendTo($_multSelect);
        	$("<div class='clear'></div>").appendTo($_multSelect);
        	
        	var $_jpList = $("<div class='jpList'></div>").appendTo($_multSelect);
        	var $_jpl1 = $("<ul class='jp-l1 fl'></ul>").appendTo($_jpList);
        	//加载左侧一级行业
        	$.ajax({
        		type:"post",
        		data:"",
        		url:"trade/loadFirstTradeExist",
        		success:function(msg){
        			//默认第一类行业(id=2)为选中状态(class=ant)
        			$("<li class='ant' data-id='"+msg[0].tradeid+"'><strong></strong><span>"+msg[0].tradename+"</span>").appendTo($_jpl1);
        			for(var i=1;i<msg.length;i++){
        				$("<li data-id='"+msg[i].tradeid+"'><strong></strong><span>"+msg[i].tradename+"</span>").appendTo($_jpl1);    				
        			}
        			
        			firstTradeClick();
        		}
        	});
        	var $_jpl3 = $("<div class='jp-l3 sublist fr' style='display:none;'></div>").appendTo($_jpList);
        	
        	var $_jpl2 = $("<div class='jp-l2 sublist fl'>").appendTo($_jpList);
        	//$("<span data-id='2' data-txt='IT/互联网' class='jpcTi'>选择全部一级类</span>").appendTo($_jpl2);      	  	
        	var $_ul = $("<ul></ul>").appendTo($_jpl2);
        	$.ajax({
        		type:"post",
        		data:"parentid=2",//默认2
        		url:"trade/loadSecondTradeISPN",
        		success:function(msg){
        			for(var i=0;i<msg.length;i++){
        				$("<li data-id='"+msg[i].tradeid+"'>"+msg[i].tradename+"</li>").appendTo($_ul);   				
        			}
        			secondTradeClick();
        		}
        	});
        	$("<div class='clear'></div>").appendTo($_jpList);
        	$("<div class='clear'></div>").appendTo($_multSelect);	
    	}
    });
    
    //期望信息保存事件
    $("#inten-submit").click(function(){
    	var s = $("#intenForm").serialize();//cvid
    	ajaxSubmit("cv/ajaxUpdateCvinten",s,"post",function(msg){
    		//成功
    		$(".inforInten").css("display","block");
            $(".editInten").css("display", "none");
            
    		var result = msg;
	    	if(result.result=="success"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存成功</span></div>").appendTo("body");
	    	}else if(result.result=="failed"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存失败</span></div>").appendTo("body");
	    	}
	    	setTimeout(function(){
				$(".pop-mid").remove();
				$(".hide_win").css("display","none");
			},1000);
	    	
	    	//刷新页面
	    	flushCv();
    	},function(request, textStatus, errorThrown){
    		//出错
    	});
    });
    //刷新按钮
    $(".state-myResume .reFresh-myResume").click(function(){
    	flushCv();
    	$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>刷新成功</span></div>").appendTo("body");
    	setTimeout(function(){
			$(".pop-mid").remove();
			$(".hide_win").css("display","none");
		},1000);
    });
    //更多按钮
    $(".top-myResume .state-myResume .more-menu .more-myResume").mousedown(function(){
    	if($(".top-myResume .state-myResume .more-menu .more-menu-list").css("display")=="none"){
    		$(".top-myResume .state-myResume .more-menu .more-myResume").addClass("on");
    		$(".top-myResume .state-myResume .more-menu .i-more").addClass("on");
    		$(".top-myResume .state-myResume .more-menu .more-menu-list").css("display","block");
    	}else{
    		$(".top-myResume .state-myResume .more-menu .more-myResume").removeClass("on");
			$(".top-myResume .state-myResume .more-menu .i-more").removeClass("on");
			$(".top-myResume .state-myResume .more-menu .more-menu-list").css("display","none");
    	}
    });
    $(".top-myResume .state-myResume .more-menu .more-menu-list ul").find("li").click(function(){
    	$(".top-myResume .state-myResume .more-menu .more-myResume").removeClass("on");
		$(".top-myResume .state-myResume .more-menu .i-more").removeClass("on");
		$(".top-myResume .state-myResume .more-menu .more-menu-list").css("display","none");
    	window.open($(this).attr("data-url"));
    });
    
    //教育经历
    $(".inforEdu .mods .ctInfor .btnBar i").click(function(){
    	if($(".editEdu").css("display")=="none"){
        	flushCv();//执行
        	$(".inforEdu").css("display","none");
        	$(".editEdu").css("display","block");
    	}else{
    		$(".inforEdu").css("display","block");
        	$(".editEdu").css("display","none");
    	}
    });
    
    $(".editEdu .cancel").click(function(){
    	if($(".editEdu").css("display")=="none"){
        	$(".inforEdu").css("display","none");
        	$(".editEdu").css("display","block");
    	}else{
    		$(".inforEdu").css("display","block");
        	$(".editEdu").css("display","none");
    	}
    });
    $(".editEdu .save").click(function(){
    	var s = $("#fm_edu").serialize();//cvid
    	ajaxSubmit("cv/ajaxUpdateCvSchool",s,"post",function(msg){
    		//成功
    		$(".inforEdu").css("display","block");
        	$(".editEdu").css("display","none");
            
    		var result = msg;
	    	if(result.result=="success"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存成功</span></div>").appendTo("body");
	    	}else if(result.result=="failed"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存失败</span></div>").appendTo("body");
	    	}
	    	setTimeout(function(){
				$(".pop-mid").remove();
				$(".hide_win").css("display","none");
			},1000);
	    	
	    	//刷新页面
	    	flushCv();
    	},function(request, textStatus, errorThrown){
    		//出错
    	});
    });
    $(".inforEvalue .btnBar i").click(function(){
    	if($(".editEvalue").css("display")=="none"){
    		flushCv();//执行
    		$(".editEvalue").css("display","block");
    		$(".inforEvalue").css("display","none");
    	}else{
    		$(".editEvalue").css("display","none");    		
    		$(".inforEvalue").css("display","block");    		
    	}
    });
    $(".editEvalue .conedBase .wrap-btn .cancel").click(function(){
    	if($(".editEvalue").css("display")=="none"){
    		$(".editEvalue").css("display","block");
    		$(".inforEvalue").css("display","none");
    	}else{
    		$(".editEvalue").css("display","none");    		
    		$(".inforEvalue").css("display","block");    		
    	}
    });
    $(".editEvalue .conedBase .wrap-btn .save").click(function(){
    	var s = $("#fm_myself").serialize();//cvid
    	ajaxSubmit("cv/ajaxUpdateCvmyself",s,"post",function(msg){
    		//成功
    		$(".editEvalue").css("display","none");    		
    		$(".inforEvalue").css("display","block");
            
    		var result = msg;
	    	if(result.result=="success"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存成功</span></div>").appendTo("body");
	    	}else if(result.result=="failed"){
	    		$("<div class='pop-mid'><i class='mid-icon icon-right'></i><span>保存失败</span></div>").appendTo("body");
	    	}
	    	setTimeout(function(){
				$(".pop-mid").remove();
				$(".hide_win").css("display","none");
			},1000);
	    	
	    	//刷新页面
	    	flushCv();
    	},function(request, textStatus, errorThrown){
    		//出错
    	});
    });
});
