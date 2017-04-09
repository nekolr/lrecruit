var qyinfo = {};
$(function () {
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
    
    //发布按钮
    $("#subMit").click(function(){
    	$("#form1").submit();
    });
    
    //上传logo点击事件
//    $("#logo_upload").click(function(){
//    	var logo_file = document.getElementById("logo_ipt");
//    	logo_file.click();
//    });
    //上传图片input的内容改变，触发预览
    $("#logo_ipt").change(function(){
    	var logo_file = document.getElementById("logo_ipt");
    	//预览图片容器
    	var logo_img = document.getElementById("logo_img");
    	if(logo_file.files && logo_file.files[0]){//Firefox
    		logo_img.style.display = "block";
    		//logo_img.src = logo_file.file[0].getAsDataURL(); FF7以上版本不支持
    		logo_img.src = window.URL.createObjectURL(logo_file.files[0]);
    	}else{//IE 使用滤镜
    		logo_file.select();
    		var imgSrc = document.selection.createRange().text;
    		var img_changeCom = document.getElementById("logo-add");//外部容器，支撑img显示预览
    		//必须设置初始大小
    		img_changeCom.style.width = "100px";
    		img_changeCom.style.height = "100px";//根据情况决定大小
    		//图片异常捕捉，防止用户修改后缀来伪造图片
    		try{
    			img_changeCom.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
    			img_changeCom.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
    		}catch(e){
    			alert("您上传的图片格式不正确");
    		}
    		logo_img.style.display = "none";
    		document.selection.empty();
    	}
    });
    //企业规模点击事件
    $("#SizeCom span").click(function(){
    	if($("#SizeCom ul").css("display")=="none"){
    		$("#SizeCom").addClass("sSelectOn");
        	$("#SizeCom i").removeClass("ar-dn").addClass("ar-up");
        	$("#SizeCom ul").css("display","block");
    	}else{
    		$("#SizeCom").removeClass("sSelectOn");
        	$("#SizeCom i").removeClass("ar-up").addClass("ar-dn");
        	$("#SizeCom ul").css("display","none");
    	}
    	
    });
    //企业规模选择事件
    $("#SizeCom ul li").click(function(){
    	var title = $("#SizeCom span");
    	$("#SizeCom span input").remove();
    	
    	/*$("#SizeCom span").empty().append($(this).text()+"<i class='icon-ar ar-dn'></i>");*/
    	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
    	$("#SizeCom").removeClass("sSelectOn");
    	$("#SizeCom i").removeClass("ar-up").addClass("ar-dn");
    	$("#SizeCom ul").css("display","none");
    	
    	//修改input[type='hidden']的值
    	$("#entpsize_ipt").val(this.dataset.val);
    });
    
    //企业性质点击事件
    $("#NatureCom span").click(function(){
    	if($("#NatureCom ul").css("display")=="none"){
    		$("#NatureCom").addClass("sSelectOn");
        	$("#NatureCom i").removeClass("ar-dn").addClass("ar-up");
        	$("#NatureCom ul").css("display","block");
    	}else{
    		$("#NatureCom").removeClass("sSelectOn");
        	$("#NatureCom i").removeClass("ar-up").addClass("ar-dn");
        	$("#NatureCom ul").css("display","none");
    	}
    	
    });
    
    //企业性质选择事件
    $("#NatureCom ul li").click(function(){
    	var title = $("#NatureCom span");
    	$("#NatureCom span input").remove();
    	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
    	$("#NatureCom").removeClass("sSelectOn");
    	$("#NatureCom i").removeClass("ar-up").addClass("ar-dn");
    	$("#NatureCom ul").css("display","none");
    	
    	//修改input[type='hidden']的值
    	$("#entpnature_ipt").val(this.dataset.val);
    });
    
    //企业行业点击事件
    $("#industry span").click(function(){
    	var container = document.getElementById("industrySelectDiv");
    	if(container != undefined){
    		container.remove();
    		$("#industry").removeClass("sSelectOn");
        	$("#industry i").removeClass("ar-up").addClass("ar-dn");
    	}else{
        	$("#industry").addClass("sSelectOn");
        	$("#industry i").removeClass("ar-dn").addClass("ar-up");
        	
        	//点击加载行业div
        	var $_container = $("<div style='left:135px;top:52px;' id='industrySelectDiv' class='popWinSelector inSelect'></div>");
        	$("#industry").after($_container);
        	var $_multSelect = $("<div class='multSelectWin'></div>").appendTo($_container);
        	//var $_pre = $("<div class='jpTi'><div class='fl'><strong>选择行业类别</strong><span>（最多选择1个）</span></div></div><div style='display: none;' class='jpNn'><div class='fl'></div></div><div class='clear'></div>").appendTo($_multSelect);
        	
        	var $_jpList = $("<div class='jpList'></div>").appendTo($_multSelect);
        	var $_jpl1 = $("<ul class='jp-l1 fl'></ul>").appendTo($_jpList);
        	//加载左侧一级行业
        	$.ajax({
        		type:"post",
        		data:"",
        		url:"trade/loadFirstTrade",
        		success:function(msg){
        			//默认第一类行业(id=2)为选中状态(class=ant)
        			$("<li class='ant' data-id='"+msg[0].tradeid+"'><strong></strong><span>"+msg[0].tradename+"</span>").appendTo($_jpl1);
        			for(var i=1;i<msg.length;i++){
        				$("<li data-id='"+msg[i].tradeid+"'><strong></strong><span>"+msg[i].tradename+"</span>").appendTo($_jpl1);    				
        			}
        			
        			qyinfo.firstTradeClick();
        		}
        	});
        	var $_jpl2 = $("<div class='jp-l2 sublist fl'></div>").appendTo($_jpList);
        	//$("<span data-id='2' data-txt='IT/互联网' class='jpcTi'>选择全部一级类</span>").appendTo($_jpl2);
        	var $_ul = $("<ul></ul>").appendTo($_jpl2);
        	$.ajax({
        		type:"post",
        		data:"parentid=2",//默认2
        		url:"trade/loadSecondTrade",
        		success:function(msg){
        			for(var i=0;i<msg.length;i++){
        				$("<li data-id='"+msg[i].tradeid+"'>"+msg[i].tradename+"</li>").appendTo($_ul);   				
        			}
        			qyinfo.secondTradeClick();
        		}
        	});
        	$("<div class='clear'></div>").appendTo($_jpList);
        	$("<div class='clear'></div>").appendTo($_multSelect);	
    	}
    });
});

qyinfo.firstTradeClick = function(){
	  //一级行业点击事件
    $("#industrySelectDiv .jpList .jp-l1.fl li").click(function(){
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
    		url:"trade/loadSecondTrade",
    		success:function(msg){
    			for(var i=0;i<msg.length;i++){
    				$("<li data-id='"+msg[i].tradeid+"'>"+msg[i].tradename+"</li>").appendTo($_ul);   				
    			}
    			
    			qyinfo.secondTradeClick();
    		}
    	});
    });
};

qyinfo.secondTradeClick = function(){
	 //二级行业选择事件
    $("#industrySelectDiv .jpList .jp-l2.sublist.fl li").click(function(){
    	var title = $("#industry span");
    	$("#industry span input").remove();
    	title.html($(this).text() + "<i class='icon-ar ar-dn'></i>");
    	$("#industry").removeClass("sSelectOn");
    	$("#industry i").removeClass("ar-up").addClass("ar-dn");
    	$("#industry ul").css("display","none");
    	
    	//设置input[type='hidden']的值
    	$("#tradeid_ipt").val(this.dataset.id);
    	
    	$("#industrySelectDiv").remove();
    });
};


