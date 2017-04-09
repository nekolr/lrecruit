var position = {};
$(function () {
	
	//关闭编辑工作地址
	$(".mapMsgTit em").click(function(){
		$(".lock_win").css("display","none");
		$(".mapMsg").css("display","none");
		$("#address").val("");
		$("#cityClick").val("");//清空表单提交的address
		map.reset();
	});	
	$("#cancelBtn").click(function(){
		$(".lock_win").css("display","none");
		$(".mapMsg").css("display","none");
		$("#address").val("");
		$("#cityClick").val("");//清空表单提交的address
		map.reset();
	});
	
	//保存编辑工作地址
	$("#mapBtn").click(function(){
		$(".lock_win").css("display","none");
		$(".mapMsg").css("display","none");
		$("#cityClick").val($("#address").val());
	});
	
    //user_info控制
    $("#cm_user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#cm_user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    $("#qy_user_info").mouseover(function(){
    	$(this).addClass("active");
    	$(".whitebar").css("display","block");
    	$(".user_info_list").css("display","block");
    });
    $("#qy_user_info").mouseout(function(){
    	$(this).removeClass("active");
    	$(".whitebar").css("display","none");
    	$(".user_info_list").css("display","none");
    });
    
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
        	var $_container = $("<div id='jobsSelectDiv' class='popWinSelector inSelect' style='left: 135px; top: 52px;'></div>");
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
        			
        			position.firstTradeClick();
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
        			position.secondTradeClick();
        		}
        	});
        	$("<div class='clear'></div>").appendTo($_jpList);
        	$("<div class='clear'></div>").appendTo($_multSelect);	
    	}
    });
    
    //工作性质选择
    $(".nature input").click(function(){
    	$(this).siblings("input").removeClass("checked");
    	$(this).addClass("checked");
    	$("#jobnature_ipt").val(this.dataset.val);
    });
    
  //工作经验点击事件
    $("#workYear span").click(function(){
    	if($("#workYear ul").css("display")=="none"){
    		$("#workYear").addClass("sSelectOn");
        	$("#workYear i").removeClass("ar-dn").addClass("ar-up");
        	$("#workYear ul").css("display","block");
    	}else{
    		$("#workYear").removeClass("sSelectOn");
        	$("#workYear i").removeClass("ar-up").addClass("ar-dn");
        	$("#workYear ul").css("display","none");
    	}  	
    });
    
    //工作经验选择
    $("#workYear ul li").click(function(){
    	var title = $("#workYear span");
    	$("#workYear span input").remove();
    	
    	/*$("#SizeCom span").empty().append($(this).text()+"<i class='icon-ar ar-dn'></i>");*/
    	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
    	$("#workYear").removeClass("sSelectOn");
    	$("#workYear i").removeClass("ar-up").addClass("ar-dn");
    	$("#workYear ul").css("display","none");
    	
    	//修改input[type='hidden']的值
    	$("#experience_ipt").val(this.dataset.val);
    });
    
    //学历要求点击
    $("#degree span").click(function(){
    	if($("#degree ul").css("display")=="none"){
    		$("#degree").addClass("sSelectOn");
        	$("#degree i").removeClass("ar-dn").addClass("ar-up");
        	$("#degree ul").css("display","block");
    	}else{
    		$("#degree").removeClass("sSelectOn");
        	$("#degree i").removeClass("ar-up").addClass("ar-dn");
        	$("#degree ul").css("display","none");
    	}  
    });
    //学历选择
    $("#degree ul li").click(function(){
    	var title = $("#degree span");
    	$("#degree span input").remove();
    	
    	/*$("#SizeCom span").empty().append($(this).text()+"<i class='icon-ar ar-dn'></i>");*/
    	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
    	$("#degree").removeClass("sSelectOn");
    	$("#degree i").removeClass("ar-up").addClass("ar-dn");
    	$("#degree ul").css("display","none");
    	
    	//修改input[type='hidden']的值
    	$("#edu_ipt").val(this.dataset.val);
    });
    
    //工作地址点击
    $("#cityClick").click(function(){
    	$(".lock_win").css("display","block");
		$(".mapMsg").css("display","block");
    });
    
    //发布按钮
    $("#subMit").click(function(){
    	$("#form1").submit();
    });
});

position.firstTradeClick = function(){
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
  			position.secondTradeClick();
  		}
  	});
  });
};

position.secondTradeClick = function(){
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
				$("<span data-id="+msg[0].positionid+" data-txt="+msg[0].positionname+" class='jpcTi ant'>选择全部二级类</span>").appendTo($(".jp-l3"));
				var $_ul = $("<ul></ul>").appendTo($(".jp-l3"));
				for(var i=0;i<msg.length;i++){
					$("<li data-id='"+msg[i].positionid+"'>"+msg[i].positionname+"</li>").appendTo($_ul);   				
		  		}
				position.positionClick();
			}
		});
	  });
};

//职位选择事件
position.positionClick = function(){
	$(".jp-l3 ul li").click(function(){
		var title = $("#jobs span");
	  	$("#jobs span input").remove();
	  	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
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
