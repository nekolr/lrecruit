$.fn.serializeObject = function(){    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) { 
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;
};
var index = {};
index.commonSearch = function(){
	$("#form1").submit();
};
//通用ajax
index.ajaxSubmit = function(url,data,type,sucfn,errfn){
	var time = new Date().getTime();
	data["time"] = time;	
	$.ajax({
		url:url,
		type:type,
		data:data,
		success:sucfn,
		error:errfn
	});
};
//搜索提示点击
index.searchClick = function(win){
	var $this = $(".main .content .column .search .wp-input input[type=text]");
	setTimeout(function(){
		win.find("li").on("click",function(){
			$(".main .content .column .search .wp-input input[type=text]").val($(this).attr("data-txt"));
			$(".autoCompleteSearch").remove();
			index.commonSearch();
		})
//		sou._closeNotTargetDom(win,$this,".autoCompleteSearch",function(){
//			$(".autoCompleteSearch").remove()
//		})
	},500)
};
//搜索提示
index.autocomplete = function($input1,$input2){
	$input1.on("focus keyup",function(){
		if($(this).val()!=''){
			var data = $("#form1").serializeObject();
			clearTimeout(this.keywordtimer);
			if($("#autoComplete")!=undefined){
				$("#autoComplete").remove();
			}
			this.keywordtimer = setTimeout(function(){
				index.ajaxSubmit("job/ajaxAutoComplete",data,"post",function(msg){
					if(msg!=''){
						var html = "<div id='autoComplete' class='autoCompleteSearch' style='left: 0px; top: 36px; z-index: 100; width: 660px;'><ul>";
						for(var i=0;i<msg.length;i++){
							html+="<li class='trans' data-txt="+msg[i]+"><span>"+msg[i]+"</span></li>"
						}
						html+="</ul></div>";
						var win = $(html).insertAfter($input2);
						
						index.searchClick(win);
					}
				},function(){
					
				});
			},400);
		}
	});
};
$(function () {
    //listTab 的切换
    var currentIndex = 0;
    var arrays = new Array;
    $(".listTab ul li").each(function () {
        arrays.push(this);
    });
    function listBanChange(obj) {
        for(var i=0;i<arrays.length;i++){
            if(obj==arrays[i]){
                currentIndex = i;//将当前index修改
                var tx = -260*i;
                $(".listBan ul").css("top",tx+"px");
            }
        }
    };
    function deleteClass(obj) {
        $(obj).removeClass("liHov");
    }
    function addClass(obj) {
        $(obj).addClass("liHov");
    };
    $(".listTab ul li").mouseover(function () {
        deleteClass(arrays[currentIndex]);
        listBanChange(this);
        addClass(this);
    });
    
    //热招企业 遮罩层
    $(".hotList ul li").mouseover(function () {
        $(this).find("div").removeClass("hide");
    });
    $(".hotList ul li").mouseout(function () {
        $(this).find("div").addClass("hide");
    });
    //sideBar 的切换
    $(".sideBox").mouseover(function () {
    	$(this).find(".sideMen").addClass("sideHov");
        $(this).find(".sideMain").removeClass("hide");
    });
    $(".sideBox").mouseout(function () {
    	$(this).find(".sideMen").removeClass("sideHov");
        $(this).find(".sideMain").addClass("hide");
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
    
    index.autocomplete($(".main .content .column .search .wp-input input[type=text]"),$(".main .content .column .search .wp-input input[type=button]"));
	
	$(".main .content .column .search .wp-input input[type=button]").click(function(){
		index.commonSearch();
	});
    
    $('body').bind('click', function (event){
    	if($("#autoComplete")!=undefined){
    		$("#autoComplete").remove();
    	}
        event.stopPropagation();
    })
});
