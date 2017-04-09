define(function(require,exports,module){
    var init = require("js/common").init;
    var common = require("js/common");
    var $ = window.$ = window.jQuery = require("js/jquery");
    var popMsg=require("js/popMsg.js");
    var expPopMsg=require("js/expPopMsg.js");
    var appPopMsg = require("js/popMsgForApp");
    var hr = require("js/HR.js");
    var template = require("js/template");
    var checkinput = require("js/checkinput")
    var uploadFile=require("js/editFileUp");

    require("js/selector")($);
    require("js/Date.js")($);
    var WebUploader = require('js/webuploader.min');

   	// 是否英文简历
   	var isEnCv = false;


    var url = {
    	refreshCv:"/cv/refreshCv/",
    	editCvName:"/cv/editCvName/",
    	setDefaultCv:"/cv/setDefaultCv/",
    	getBase:"/ajax/getBasic",
    	editBase:"/ajax/saveBasic",
    	editEval:"/ajax/saveSelfEval",
    	getSelfEval:"/ajax/getSelfEval",
    	delSelfEval:"/ajax/removeSelfEval",
    	getCert:"/ajax/getCert",
    	editCert:"/ajax/saveCerts",
    	delCert:"/ajax/removeCert",
    	getTrain:"/ajax/getTraining",
    	editTrain:"/ajax/saveTraining",
    	delTrain:"/ajax/removeTraining",
    	getProject:"/ajax/getProject",
    	editProject:"/ajax/saveProject",
    	delProject:"/ajax/removeProject",
    	getEdu:"/ajax/getEdu",
    	editEdu:"/ajax/saveEdu",
    	delEdu:"/ajax/removeEdu",
    	getWork:"/ajax/getExp",
    	editWork:"/ajax/saveExp",
    	delWork:"/ajax/removeExp",
    	getInten:"/ajax/getExpecation",
    	editInten:"/ajax/saveExpe",
    	getSpecial:"/ajax/getProSkill",
    	editSpecial:"/ajax/saveProSkill",
    	delSpecial:"/ajax/removePorSkill",
		getAchiev:"/ajax/getProduction",
		editAchiev:"/ajax/saveProduction",
		delAchiev:"/ajax/removeProduction",
		delAchievImg:"/cv/ajax/deleteAttach",
		getLang:"/ajax/getLangSkill",
    	editLang:"/ajax/saveLangSkill",
    	delLang:"/ajax/removeLang",
		setEntrust:"http://www.chinahr.com/asyn/setEntrust",
		getEntrust:"http://www.chinahr.com/asyn/getEntrust"
    }

    var getDelUrl = {
    	"cert":{
    		"name":"certId",
    		"url":url.delCert
    	},
    	"train":{
    		"name":"trainId",
    		"url":url.delTrain
    	},
    	"project":{
    		"name":"projectId",
    		"url":url.delProject
    	},
    	"edu":{
    		"name":"eduId",
    		"url":url.delEdu
    	},
    	"work":{
    		"name":"expId",
    		"url":url.delWork
    	},
    	"special":{
    		"name":"proSkillId",
    		"url":url.delSpecial
    	},
		"achiev": {
			"name": "productionId",
			"url": url.delAchiev
		},
    	"lang":{
    		"name":"langSkillId",
    		"url":url.delLang
    	}
    }

    function closeNotTargetDom($this, $par, event, fun) {
		$(document).off("mouseup" + event)
		$(document).on("mouseup" + event, function(e) {
			if (!$this.is(e.target) && $this.has(e.target).length === 0) {
				if ($par) {
					if (!$par.is(e.target) && $par.has(e.target).length === 0) {
						fun();
					}
				} else {
					fun();
				}
			}
			e.stopPropagation();
		})
	}

	//滚动到指定标签
	function mScroll(id){
		$("html,body").stop(true);
		$("html,body").animate({scrollTop: $("."+id).offset().top}, 300);
	}

    /**
     *	模板内补充方法
     */
   	//计算年数差
    template.helper('getYearsDiff', function (date,type) {
    	if(date=="暂无工作经验"){
    		return date;
    	}
    	var sTime = new Date(date);
    	var eTime = new Date();
    	var divNum = 1000 * 3600 * 24 * 365;
    	var dateTime = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
    	if(type == "work"){
    		if(dateTime){
    			dateTime +="年工作经验"
    		}else{
    			dateTime = "1年以下工作经验"
    		}
    	}
		return dateTime;
    })
    //获取熟练度
    template.helper('getLevelCn', function (data) {
    	switch(data){
    		case '1':
    			return "精通";
    			break;
    		case '2':
    			return "熟练";
    			break;
    		case '3':
    			return "良好";
    			break;
    		default:
    			return "一般";
    			break;
    	}
    })
    //获取语言熟练度
    template.helper('getLangLevel', function (data) {
    	switch(data){
    		case '1':
    			return "精通";
    			break;
    		case '2':
    			return "熟练";
    			break;
    		case '3':
    			return "良好";
    			break;
    		default:
    			return "一般";
    			break;
    	}
    })
    template.helper('checkLevel', function (data,diff) {
    	if(data == diff) return "on";
    })

    // 当前cvId(唯一),简历类型cvType(唯一)
    var cvId = "", cvType = "";

    // 初始化日期控件
    function datepicker(obj){
		$(obj.ele).manhuaDate({
			Event : "click",// 可选
			fuhao : "-",// 日期连接符默认为-
			isTime : false,// 是否开启时间值默认为false
			beginY : (obj.beginY)?obj.beginY:1949,// 年份的开始默认为1949
			endY : (obj.endY)?obj.endY:2100,
			suesFun : function(selectedDate,insy){
				if(obj.cb){
					obj.cb(selectedDate);
				}
			},
			isNow:obj.num,
			startYear:obj.startYear,
			startMonth:obj.startMonth
		})
	}

	// 回填时间数据
	function transDate($this,dataStr){
		var base = {};
		if(dataStr=="暂无工作经验"){
			base[name]="暂无工作经验";
		}else if(dataStr=="至今"){
			base[name]="至今";
		}else{
			var arry=dataStr.split("-");
			var y=arry[0];
			var m=arry[1];
			base[name]=new Date(y,m-1,1);

			if(name!="graduationTime"){
				var now=new Date();
				if(base[name]>now){
				    interactive.showError($("#"+name),"日期不能晚于当前时间 ");
				    $("#"+name)[0].flag=false;
				}else{
				    interactive.hideError($("#userAge"));
				    $("#"+name)[0].flag=true;
				}
			}
		}
    }

    // 刷新简历
    function refreshCv(){
    	common.clickButtonLog("from=chr_my_res_title_refresh")
    	$.ajax({
			url: url.refreshCv,
			type: 'post',
			data: {id:cvId},
			dataType:'json',
			success: function(data) {
				if(data.isSuccess){
					popMsg.mid({msg:"刷新简历成功",type:"success",timer:1500})
					$(".date-break").html("更新时间："+getNowDate())
					return true;
				}else{
					popMsg.mid({msg:data.returnMessage,type:"fail",timer:1500})
					return false;
				}
			},
			error: function() {
				popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
				return false;
			}
		});
    }

    // 设置默认简历
    function setDefaultCv(id){
    	$.ajax({
			url: url.setDefaultCv,
			type: 'post',
			data: {id:id},
			dataType:'json',
			success: function(data) {
				if(data.isSuccess){
					$(".item-person.myResume .dafault a").empty().html($(".item-person.myResume .dafault a").attr("title"))
					$(".item-person.myResume ul li").removeClass("dafault")
					if(id){
						var dom = $("#mys-"+id)
						dom.attr("class","dafault")
						var title = dom.find("a").attr("title")
						dom.find("a").empty().html(title+'<i class="m-icon i-default"></i>')
						if(!dom.find("a").next(".default").length){
							dom.find("a").after('<div class="default"><div>已设置该简历为默认简历</div></div>')
						}
						popMsg.mid({msg:"设置默认简历成功",type:"success",timer:1500})
						$(".bar-myResume .onOff>i").attr("class","m-icon i-on")
						$(".bar-myResume .onOff>span").text("已设为默认简历")
					}else{
						popMsg.mid({msg:"取消默认简历成功",type:"success",timer:1500})
						$(".bar-myResume .onOff>i").attr("class","m-icon i-off")
						$(".bar-myResume .onOff>span").text("设置为默认简历")
					}
				}else{
					popMsg.mid({msg:"设置默认简历失败",type:"success",timer:1500})
				}
				return true;
			},
			error: function() {
				popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
				return false;
			}
		});
    }

	//开启或者关闭委托投递
	function setEntrust(opt){
		$.ajax({
			url:url.setEntrust,
			type:"get",
			data:opt,
			dataType:"jsonp",
			success:function(data){
				var code=parseInt(data.code);
				switch(code){
					case 1://开启委托投递
						$(".entrust-myResume i").attr("class","m-icon i-on");
						$(".entrust-myResume span").text("委托中");
						break;
					case 2:
						$(".entrust-myResume i").attr("class","m-icon i-off");
						$(".entrust-myResume span").text("委托投递");
						break;
					case 3:
						common.clickButtonLog("from=chr_my_weiwanzheng");
						popMsg.mid({msg:"简历尚未完整，暂时无法开启委托投递功能",type:"fail",timer:1500})
						$(".entrust-myResume i").attr("class","m-icon i-off");
						break;

				}
			},
			error:function(){
				popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
			}
		})
	}
    // 获取当前日期
    function getNowDate(){
    	var tmp = new Date();
    	return tmp.getFullYear() + "." + (tmp.getMonth()+1) + "." + (tmp.getDate())
    }

    // 修改当前简历名称
    function editCvName($this){
    	var that = $this;
    	common.clickButtonLog("from=chr_my_res_title_edit")
    	popMsg.edit({
			title:"修改简历名称",
			tLength:20,
			type:'encn',
			skin:'rose',
			buttons:[
				{
					btn:"cancle",
					text:"取消",
					color:"#999999"
				},
				{
					btn:"set",
					text:"修改",
					color:"#1EA8EB",
					handle:function(txt,success,fail){
						var param = {};
						param.cvId = cvId;
						param.cvName = txt;
						popMsg.mid({msg:"请求中",type:"loading"});
						$.ajax({
							type: "post",
							url: url.editCvName,
							data: param,
							dataType: "json",
							success: function(data){
								if(data.isSuccess){
									popMsg.closeMid();
									if($("#mys-"+cvId+" a").find(".i-default").length){
										$("#mys-"+cvId+" a").html(param.cvName+'<i class="m-icon i-default"></i>')
									}else{
										$("#mys-"+cvId+" a").html(param.cvName)
									}
									success()
								}else{
									fail()
									popMsg.mid({msg:"操作失败",type:"fail",timer:1500})
								}
							},
							error: function(e) {
								fail()
								popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
							}
						})
					}
				},
			]
		},that)
    }

    //关闭编辑模块
    function closeEdit($this){
    	$("body").scrollTop($this.offset().top - 200)
    }

    //选择器存值
    function setHiddenInputVal($this, id, v, must) {
    	must = (must)?" "+must:"";
		if ($("#" + id + "Dummy").length) {
			$("#" + id + "Dummy").val(v)
		} else {
			$this.after("<input id='" + id + "Dummy' class='formTerms'"+must+" type='hidden' name='" + id + "' value='" + v + "' />")
		}
	}

	//控制错误信息显示
	function toggleErr($this,type,msg){
		if(type == "show"){
			if($this.find(".err").length){
				$this.find(".err").html(msg).show()
			}else{
				$this.append('<div class="err">'+msg+'</div>')
			}
		}else{
			$this.find(".err").hide()
		}
	}

	//计算&截取输入长度
	function onKeyUpCheck($this){
		$this.find("[data-num]").each(function(){
			var that = $(this)
			var len = checkinput.encnLen($(this).val())
			if(len <= $(this).data("num")){
                $(this).prev().find("em").text(Math.ceil(len))
            }else{
                var val = $(this).val();
                $(this).val(checkinput.encnCut(val,$(this).data("num")))
            }
            $(this).on("keyup.num",function(){
            	var keyUpLen = checkinput.encnLen($(this).val())
                if(keyUpLen <= $(this).data("num")){
                    $(this).prev().find("em").text(Math.ceil(keyUpLen))
                }else{
                    var val = $(this).val();
                    $(this).val(checkinput.encnCut(val,$(this).data("num")))
                }
            })
        })
	}

	// 失焦检查
	function onBlurCheck($this){
		$this.find("[data-regexp]").each(function(){
			var par = $(this).parents(".inputMr").parent()
			var regexp = $(this).data("regexp");
			$(this).on("blur.regexp",function(){
				if($(this).val() && !checkinput[regexp]($(this).val())){
					var title = $(this).parents(".inputMr").prev(".wordMr").text()
					title = title.replace("*","")
					toggleErr(par,"show",title+"格式错误")
				}else{
					toggleErr(par,"hide")
				}
			})
		})
	}

	// 提交检查
	function submitCheck($this){
		var submit = true;
		$this.find(".must").each(function(){
			var par = $(this).parents(".inputMr").parent()
			if(checkinput.trim($(this).val()) == ""){
				toggleErr(par,"show","必填!")
				// 表单不可提交
				submit = false;
			}else{
				//字段不为空，开始校验格式
				var regexp = $(this).data("regexp");
				if (regexp) {
					if(!checkinput[regexp]($(this).val())){
						var title = $(this).parents(".inputMr").prev(".wordMr").text()
						title = title.replace("*","")
						toggleErr(par,"show",title+"格式错误")
						submit = false;
					}else{
						toggleErr(par,"hide")
					}
				}
			}
		})
		
		if(submit == false){
			var goDom = $this.find(".err:visible:eq(0)")
			$("body").scrollTop(goDom.offset().top - 200)
		}
		return submit;
	}

	// 更多按钮
	function moreBtn(){
		var dnUrl = "http://my.chinahr.com/downCv";
		var dnHtml = dnUrl+"?cvId="+cvId+"&type=h";
		var dnDoc = dnUrl+"?cvId="+cvId+"&type=d";
		var vwUrl = "http://my.chinahr.com/cv/preview/"+cvId;
		var delUrl = "http://my.chinahr.com/cv/deleteCv";
		if(cvType==3){
			$(".more-menu-list").addClass("mini")
			var html = '<a href="'+vwUrl+'" onClick="clickLog(\'from=chr_my_res_title_preview\')" target="_blank"><li>'+
						'<i class="m-icon i-view"></i>预览'+
					'</li></a>'+
					'<li class="delCv bl">'+
						'<i class="m-icon i-delBtn"></i>删除'+
					'</li>'
		}else{
			var html = '<a href="'+vwUrl+'" onClick="clickLog(\'from=chr_my_res_title_preview\')" target="_blank"><li>'+
						'<i class="m-icon i-view"></i>预览'+
					'</li></a>'+
					'<li class="dnCv bl">'+
						'<i class="m-icon i-download"></i>下载'+
					'</li>'+
					'<li class="delCv bl">'+
						'<i class="m-icon i-delBtn"></i>删除'+
					'</li>'
		}
		$(".more-menu-list ul").empty().html(html)
		$(".more-myResume").on("click",function(){
			$(this).toggleClass("on")
			$(this).find(".i-more").toggleClass("on")
			$(this).next(".more-menu-list").toggle()
		})
		$(".dnCv").off().on("click",function(){
			common.clickButtonLog('from=chr_my_res_title_export')
			expPopMsg.custom({
				title:"导出简历",
				close:true,
				skin:{
    				wrap:"roseSkin"
    			},
				onReady:function(){
					$(".DocType").parent().attr("href",dnDoc);
					$(".HtmlType").parent().attr("href",dnHtml);
				}
			});
		})
		$(".more-menu-list .delCv").off().on("click",function(){
			common.clickButtonLog("from=chr_my_res_title_delete")
			popMsg.custom({
				title:"删除简历",
    			msg:"确定要删除本简历吗？",
    			close:true,
    			skin:{
    				wrap:"roseSkin"
    			},
    			buttons:[
    				{
    					btn:"set",
    					text:"删除",
    					handle:function(){
    						ajax.post({
    							url:delUrl,
    							data:{
    								cvId:cvId
    							},
    							sucFun:function(){
    								popMsg.mid({
    									type:"success",
    									msg:"删除成功!",
    									timer:1500,
    									handle:function(){
											window.location.href="http://my.chinahr.com/"
    									}
    								})
    							}
    						})
    					}
    				},
    				{
    					btn:"cancle",
    					text:"取消",
    					color:"#928472",
    					handle:function(){}
    				}
    			]
    		})
		})
		$(".more-menu-list li").on("click.close",function(){
			$(".more-myResume").trigger("click")
		})
		closeNotTargetDom($(".more-menu-list"), $(".more-myResume"), ".moreBtn", function(){
			if($(".more-myResume").hasClass("on")){
				$(".more-myResume").trigger("click")
			}
		})
	}

	//转换特定字符串为驼峰结构
	function transKeyName(param){
		var data = {};
		$.each(param,function(e,v){
			e = e.replace(/\.[\w{1}*]/g, function(word){return word.toUpperCase().replace(".","")})
			data[e] = checkinput.trim(v)
		})
		return data;
	}

    // 获取需要提交的表单数据
    function getFullQuery($this) {
		var param = {};
		var ipt = $this.find(".formTerms");
		param["cvId"] = cvId;
		param["cvType"] = cvType;
		$.each(ipt, function(k, e) {
			param[e.name] = $(e).val();
			if($(e).val()){
				if($(e).hasClass("option")){
					param[e.name+".Cn"] = $(e).parent().find("span").text();
				}else if($(e).hasClass("mult")){
					param[e.name+".Cn"] = $(e).prev().val();
				}else if($(e).hasClass("checkbox")){
					var dVal = $(e).val()
					param[e.name+".Cn"] = $(e).prev().find("a[data-val='"+dVal+"']").text();
				}
			}
		})
		return param;
	}

	//获取专业技能的表单
	function getSpecialQuery(){
		var param = {};
		param["cvId"] = cvId;
		param["cvType"] = cvType;
		param["arr"] = [];
		$(".editSpecial .saveLevel").each(function(){
			var spval = {}
			var psId = $(this).find(".selcSpecial").data("val")
			var id = $(this).find(".closeRed").data("id")
			if(psId){
				spval['proId'] = id;
				spval['proSkillSkillId'] = psId;
				spval['proSkillSkillIdCn'] = $(this).find(".selcSpecial").val()
				spval['proSkillLevelId'] = $(this).find(".itemLevel i.on").data("val")
				param["arr"].push(spval)
			}
		})
		return param;
	}

	//初始化投递数据
	function formatPostQuery(param){
		var data = {};
		$.each(param,function(e,v){
			if(e.indexOf("Cn")<0){
				data[e] = checkinput.trim(v)
			}
			if(v == "至今"){
				data[e] = -1;
			}
			if(v == "暂无工作经验"){
				data[e] = 0;
			}
		})
		return data;
	}

	var logoConfig={
        swfUrl:'http://st01.chrstatic.com/themes/pcchinahr/js/Uploader.swf',
        handleUpload:'http://my.chinahr.com/ajax/uploadPhoto',
        showUrl:"http://img01.chrstatic.com/images/photo"
    }

	//上传头像
	function uploadLogo(elestr) {
        // Web Uploader实例
           var uploader;
        // 初始化Web Uploader
        uploader = new WebUploader.create({

            // 自动上传。
            auto: true,

            // swf文件路径
            swf: logoConfig.swfUrl,

            // 文件接收服务端。
            server: logoConfig.handleUpload,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: elestr,

            // 参数表
            formData:{
            	cvId:cvId
            },
            fileSingleSizeLimit: 400 * 1024,    // 400k
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg',
                mimeTypes: 'image/*'
            }
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            popMsg.mid({type:"loading",msg:"上传中"})
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file,response) {
        	if(response.isSuccess){
        		elestr.find("img").attr("src",logoConfig.showUrl + response.entity.attachid)
        		popMsg.mid({type:"success",msg:"上传成功",timer:1500})
        	}else{
        		popMsg.mid({type:"fail",msg:"上传失败",timer:1500})
        	}
        });

        // 文件上传失败，上传出错。
        uploader.on( 'uploadError', function( file ,reason) {
        	log(reason)
        	popMsg.mid({type:"fail",msg:"上传失败",timer:1500})
        });
        // 判断。
        uploader.on( 'error', function( type ) {
        	log(type)
        	switch(type){
        		case "Q_TYPE_DENIED":
        			popMsg.mid({type:"fail",msg:"文件类型错误，请选择GIF,JPG,JPEG格式文件。",timer:2000})
        			break;
        		case "F_EXCEED_SIZE":
        			popMsg.mid({type:"fail",msg:"文件大小错误，请选择小于400K的文件。",timer:2000})
        			break;
        		default:
        			break;
        	}
        });
    }

	//刷新完整度
	function setPercent(num,tips,state){
		if(!num){
			var num = $(".degree-myResume .num").text()
			num = num.replace("%","")
		}
		if(tips){
			$(".msg-audit p:eq(1)").text(tips)
		}
		if(state){
			$(".msg-audit .msg").text(state)
		}
		$(".percent .num").text(num+"%")
		var number = Math.floor(num/10)
		number = (number>0)?number+"0":0;
		$(".percent .bg i").attr("class","p-icon per"+number)
	}

	//确认删除弹窗
    function delConfirm($this,yes,no){
    	var title = $this.data("deltitle")
    	var sub = $this.data("delsub")
    	var str = title;
    	if(sub) str += " - "+sub;
    	popMsg.custom({
    		msg:"确定要删除 " + str + " 吗？",
    		close:true,
    		skin:{
    			wrap:"roseSkin"
    		},
    		buttons:[
    			{
    				btn:"set",
    				text:"删除",
    				handle:function(){
    					if(typeof yes == "function") yes()
    				}
    			},
    			{
    				btn:"cancle",
    				text:"取消",
    				color:"#928472",
    				handle:function(){
    					if(typeof no == "function") no()
    				}
    			}
    		]
    	})
    }

    //初始化专业技能子模块
    function formatSpChild($this){
    	$this.each(function(){
    		var that = $(this)
    		$(this).find(".selcSpecial").cSelect({
				type:"skill",
				mult:true,
				inSelect:true,
				saveName:"special",
				multVal : 1,
				level: 3
			})
			$(this).find(".closeRed").off().on("click",function(){
				del.special($(this))
			})
    		$(this).find(".rtTop").off().on("click",function(){
    			that.find(".l-icon").removeClass("on")
    			that.find(".level04").addClass("on")
    			that.find("em").text("一般")
    		})
    		$(this).find(".rtBottom").off().on("click",function(){
    			that.find(".l-icon").removeClass("on")
    			that.find(".level03").addClass("on")
    			that.find("em").text("良好")
    		})
    		$(this).find(".lfBottom").off().on("click",function(){
    			that.find(".l-icon").removeClass("on")
    			that.find(".level02").addClass("on")
    			that.find("em").text("熟练")
    		})
    		$(this).find(".lfTop").off().on("click",function(){
    			that.find(".l-icon").removeClass("on")
    			that.find(".level01").addClass("on")
    			that.find("em").text("精通")
    		})
    	})
    }

    var getDom = {
    	special:function(){
    		var data = {
    			cvId:cvId
    		}
    		ajax.post({
    			url:url.getSpecial,
    			data:data,
    			sucFun:function(data){
    				var html = template('specialTemp', data);
    				$(".inforSpecial").empty().html(html)
					$(".inforSpecial").show()
					init.canAdd()
    				$(".editSpecial").hide()
    				closeEdit($(".special-mr"))
    			}
    		})
    	}
    }

    //提交数据表单公用方法
	var ajax = {
		post:function(param){
			// param.sucFun({})
			// return
			if(!param.url || !param.data) return;
			
			var hasXSS=checkinput.xssCheck(param.data);
            if(hasXSS){
                popMsg.mid({msg:"输入内容包含禁止字段",type:"fail",timer:1000});
                return false;
            }

			popMsg.mid({msg:"请求中...",type:"loading"})
			$.ajax({
				url:param.url,
				data:param.data,
				type:"post",
				dataType:"json",
				success:function(data){
					if(data.isSuccess){
						popMsg.closeMid()
						if(!data.entity) data.entity = {}
						if(typeof param.sucFun == "function") param.sucFun(data.entity)
					}else{
						popMsg.mid({msg:data.returnMessage,type:"fail",timer:1500})
					}
				},
				error:function(e){
					popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
				}

			})
		},
		jsonp:function(){

		}
	}

    // 初始化保存
    var save = {
    	base:function(type){
    		var savedata = getFullQuery($(".editBase"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		showData['basicInfoSensitiveMobile'] = showData.basicInfoMobile;
    		showData['basicInfoSensitiveEmail'] = showData.basicInfoEmail;
    		showData['basicInfoSensitiveWeixin'] = showData.basicInfoWeixin;
    		showData['basicInfoSensitiveQq'] = showData.basicInfoQq;
    		query.option = type;
    		ajax.post({
    			url:url.editBase,
    			data:query,
    			sucFun:function(data){
    				if(data.cvId){
    					cvId = data.cvId
    					$("#cvId").val(data.cvId)
    				}
    				if(query.workTime){
    					$("#addWork .tipFAdd").show()
    				}else{
    					$("#addWork .tipFAdd").hide()
    				}
    				var html = template('baseTemp', showData);
					$(".inforBase").html(html)
					$(".inforBase").show()
    				$(".editBase").hide()
    				$("#name-mr .wz-name h3").text(showData.basicInfoName)
    				$("#name-mr .wz-name p").text(showData.basicInfoWonderfullPoint)
    				setPercent(data.percent,data.tips,data.state)
    				$(".changeBase i").on("click",function(){
    					edit.base()
    				})
    			}
    		})
    	},
    	selfEval:function(type){
    		var savedata = getFullQuery($(".editEvalue"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editEval,
    			data:query,
    			sucFun:function(data){
    				var html = template('evalTemp', showData);
					$(".inforEvalue").html(html)
					$(".inforEvalue").show()
    				$(".editEvalue,#addSelfEval").hide()
    				del.selfEval()
    				init.evalInfo()
					setPercent(data.percent,data.tips,data.state)
    			}
    		})
    	},
    	cert:function(type){
    		var savedata = getFullQuery($(".editCert"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editCert,
    			data:query,
    			sucFun:function(data){
    				if(showData.certId != "undefined" && showData.certId){
    				}else{
    					showData["certId"] = data.certId
    				}
    				var html = template('certTemp', showData);
    				var $initMod = {};
    				if(query.certId != "undefined" && query.certId){
    					var farDom = html;
    					$("#cert-"+query.certId).empty().html(farDom)
    					$initMod = $("#cert-"+query.certId)
    				}else{
    					var farDom = '<div id="cert-'+data.certId+'" class="inCert01 mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforCert").prepend(farDom)
    					$initMod = $("#cert-"+data.certId)
    				}
    				$initMod.show()
					$(".inforCert").show()
					$(".cert-mr .addInfor").show()
    				$(".editCert").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	},
    	train:function(type){
    		var savedata = getFullQuery($(".editTrain"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editTrain,
    			data:query,
    			sucFun:function(data){
    				if(showData.trainId != "undefined" && showData.trainId){
    				}else{
    					showData["trainId"] = data.trainId
    				}
    				var html = template('trainTemp', showData);
    				var $initMod = {};
    				if(query.trainId != "undefined" && query.trainId){
    					var farDom = html;
    					$("#train-"+query.trainId).empty().html(farDom)
    					$initMod = $("#train-"+query.trainId)
    				}else{
    					var farDom = '<div id="train-'+data.trainId+'" class="mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforTrain").prepend(farDom)
    					$initMod = $("#train-"+data.trainId)
    				}
    				$initMod.show()
					$(".inforTrain").show()
					$(".train-mr .addInfor").show()
    				$(".editTrain").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	},
    	project:function(type){
    		var savedata = getFullQuery($(".editProject"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editProject,
    			data:query,
    			sucFun:function(data){
    				if(showData.projectId != "undefined" && showData.projectId){
    				}else{
    					showData["projectId"] = data.projectId
    				}
    				var html = template('projectTemp', showData);
    				var $initMod = {};
    				if(query.projectId != "undefined" && query.projectId){
    					var farDom = html;
    					$("#project-"+query.projectId).empty().html(farDom)
    					$initMod = $("#project-"+query.projectId)
    				}else{
    					var farDom = '<div id="project-'+data.projectId+'" class="mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforProject").prepend(farDom)
    					$initMod = $("#project-"+data.projectId)
    				}
    				$initMod.show()
					$(".inforProject").show()
					$(".project-mr .addInfor").show()
    				$(".editProject").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	},
    	edu:function(type){
    		var savedata = getFullQuery($(".editEdu"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editEdu,
    			data:query,
    			sucFun:function(data){
    				if(showData.eduId != "undefined" && showData.eduId){
    				}else{
    					showData["eduId"] = data.eduId;
    				}
    				var html = template('eduTemp', showData);
    				var $initMod = {};
    				if(query.eduId != "undefined" && query.eduId){
    					var farDom = html;
    					$("#edu-"+query.eduId).empty().html(farDom)
    					$initMod = $("#edu-"+query.eduId)
    				}else{
    					var farDom = '<div id="edu-'+data.eduId+'" class="mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforEdu").prepend(farDom)
    					$initMod = $("#edu-"+data.eduId)
    				}
    				$initMod.show()
					$(".inforEdu").show()
					$(".edu-mr .addInfor").show()
    				$(".editEdu").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	},
    	work:function(type){
    		var savedata = getFullQuery($(".editWork"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editWork,
    			data:query,
    			sucFun:function(data){
    				if(showData.expId != "undefined" && showData.expId){
    				}else{
    					showData["expId"] = data.expId;
    				}
    				var html = template('workTemp', showData);
    				var $initMod = {};
    				if(query.expId != "undefined" && query.expId){
    					var farDom = html;
    					$("#work-"+query.expId).empty().html(farDom)
    					$initMod = $("#work-"+query.expId)
    				}else{
    					var farDom = '<div id="work-'+data.expId+'" class="mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforWork").prepend(farDom)
    					$initMod = $("#work-"+data.expId)
    				}
    				$initMod.show()
					$(".inforWork").show()
					$(".work-mr .addInfor").show()
    				$(".editWork").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	},
    	inten:function(type){
    		var savedata = getFullQuery($(".editInten"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editInten,
    			data:query,
    			sucFun:function(data){
    				if(!showData.expectationNegotiation || showData.expectationNegotiation=="0"){
    					delete showData.expectationNegotiation;
    				}
    				var html = template('intenTemp', showData);
    				$(".inforInten").empty().html(html)
					$(".inforInten").show()
					$(".inten-mr .addInfor").show()
    				$(".editInten").hide()
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($(".inten-mr"))
    			}
    		})
    	},
    	special:function(type){
    		var query = getSpecialQuery()
    		if(!query.arr.length){
    			$(".inforSpecial,.editSpecial,.special-mr .addInfor").hide()
    			$("#addSpecial").show()
    			return;
    		}
    		var sendData = query;
    		sendData.arr = JSON.stringify(query.arr)
    		ajax.post({
    			url:url.editSpecial,
    			data:sendData,
    			sucFun:function(data){
    				getDom.special()
					setPercent(data.percent,data.tips,data.state)
    			}
    		})
    	},
		achiev:function(type,$form,id){
			var savedata = getFullQuery($form)
			var query = formatPostQuery(savedata)
			var showData = transKeyName(savedata)
			query.option = type;
			//var productionId
			//=$(".")
			if(type==2){
				query.productionId=id;
			}
			if($form.hasClass("picAch")){
				// var imgArray=[{"name":"1.jpg","url":"img/view.jpg"},{"name":"2.jpg","url":"img/view.jpg"}];
				var imgArray=[];
				$(".file-item").each(function(i,e){
					var url=$(this).find("img").attr("src");
					var name=$(this).find("img").attr("alt");
					imgArray.push({name:name,url:url});
				})
				query.type=1;
				query.accessory=JSON.stringify(imgArray);
				showData.type=1;
				showData.accessory=imgArray;
			}else if($form.hasClass("lineAch")){
				query.type=2;
				showData.type=2;
				if(!checkinput.url(query.proUrl)){
					query.proUrl = "http://"+query.proUrl;
					showData.proUrl = query.proUrl;
				}
			}

			ajax.post({
				url:url.editAchiev,
				data:query,
				sucFun:function(data){
					showData["productionId"] = data.productionId;
					if(showData.type===1){
						var html = template('achievPicTemp', showData);
					}else if(showData.type===2){
						var html = template('achievLineTemp', showData);
					}

					var $initMod = {};
					if(type==1){
						//添加
						var farDom = '<div id="achiev-'+showData.productionId+'" class="mods inAchiev01">'
						farDom += html;
						farDom +=  '</div>'
						$(".inforAchiev").prepend(farDom)
						$initMod = $("#achiev-"+showData.productionId)
					}else if(type==2){
						//修改
						var farDom = html;
						$("#achiev-"+showData.productionId).empty().html(farDom)
						$initMod = $("#achiev-"+showData.productionId)
					}
					/*$(".inforAchiev").on("click",".linkInAch",function(){
						var href=$(this).find("span").text();
						window.location.href=href;

					})*/
					$initMod.show()
					$(".inforAchiev").show()
					$(".achiev-mr .addInfor").show()
					$(".editAchiev").hide()
					init.mods($initMod)
					init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
				}
			})
		},
    	lang:function(type){
    		var savedata = getFullQuery($(".editLang"))
    		var query = formatPostQuery(savedata)
    		var showData = transKeyName(savedata)
    		query.option = type;
    		ajax.post({
    			url:url.editLang,
    			data:query,
    			sucFun:function(data){
    				if(showData.langSkillId != "undefined" && showData.langSkillId){
    				}else{
    					showData["langSkillId"] = data.langSkillId;
    				}
    				var html = template('langTemp', showData);
    				var $initMod = {};
    				if(query.langSkillId != "undefined" && query.langSkillId){
    					var farDom = html;
    					$("#lang-"+query.langSkillId).empty().html(farDom)
    					$initMod = $("#lang-"+query.langSkillId)
    				}else{
    					var farDom = '<div id="lang-'+data.langSkillId+'" class="mods">'
    					farDom += html;
    					farDom +=  '</div>'
    					$(".inforLang").prepend(farDom)
    					$initMod = $("#lang-"+data.langSkillId)
    				}
    				$initMod.show()
					$(".inforLang").show()
					$(".lang-mr .addInfor").show()
    				$(".editLang").hide()
    				init.mods($initMod)
    				init.canAdd()
					setPercent(data.percent,data.tips,data.state)
					closeEdit($initMod)
    			}
    		})
    	}
    }

    //初始化删除
    var del = {
    	init:function(){
    		this.selfEval()
    	},
    	selfEval:function(){
    		var form = $(".evalue-mr")
    		form.find(".delBtn").on("click",function(){
    			delConfirm($(this),function(){
    				ajax.post({
    					url:url.delSelfEval,
    					data:{cvId:cvId},
    					sucFun:function(data){
    						setPercent(data.percent,data.tips,data.state)
    						$(".inforEvalue").empty().hide()
    						form.find(".firstAdd").show()
    					}
    				})
    			})
    		})
    	},
    	childMod:function(id,mod){
    		var delDom = $("#"+mod+"-"+id);
    		var delBtn = delDom.find(".delBtn");
    		var urlObj = getDelUrl[mod];
    		var data = {};
    		data[urlObj.name] = id;
    		data["cvId"] = cvId;
    		var parDom = delDom.parents(".canAdd")
    		var farParDom = parDom.parent();
    		delConfirm(delBtn,function(){
    			ajax.post({
    				url:urlObj.url,
    				data:data,
    				sucFun:function(back){
    					setPercent(back.percent,back.tips,back.state)
    					delDom.remove()
    					if(!parDom.find(".mods").length){
    						farParDom.find(".firstAdd").show()
    						farParDom.find(".addModBtn").hide()
    					}
    				}
    			})
    		})
    	},
    	special:function($this){
    		var delDom = $this.parent();
    		var delBtn = delDom.find(".closeRed");
    		var id = $this.data("id")
    		var parDom = delDom.parents(".canAdd")
    		var mult = parDom.data("mult")
    		var addBtn = parDom.data("for")
    		if(id){
    			var urlObj = getDelUrl['special'];
    			var data = {};
    			data[urlObj.name] = id;
    			data["cvId"] = cvId;
    			delConfirm(delBtn,function(){
    				ajax.post({
    					url:urlObj.url,
    					data:data,
    					sucFun:function(back){
    						setPercent(back.percent,back.tips,back.state)
    						delDom.remove()
    						if(parDom.find(".mods").length < mult){
    							$("#"+addBtn).show()
    						}
    					}
    				})
    			})
    		}else{
    			delDom.remove()
    			if(parDom.find(".mods").length < mult){
    				$("#"+addBtn).show()
    			}
    		}
    	}
    }

    //初始化编辑
    var edit = {
    	//基本信息
    	base:function(){
    		if(cvType == 3){
    			common.clickButtonLog("from=chr_my_res_fjcvs_editindo")
    		}else{
    			common.clickButtonLog("from=chr_my_res_edit_baseinfo")
    		}
    		var form = $(".editBase");
    		var option = (cvId)?2:1;
    		ajax.post({
    			url:url.getBase,
    			data:{
    				cvId:cvId
    			},
    			sucFun:function(data){
    				if(cvType == 3){
    					data["fileCv"] = true;
    					if(data.workTime=="暂无工作经验"){
    						data['noWork'] = true;
    					}else{
    						data['haveMust'] = true;
    					}
    				}
    				var html = template('editBaseTemp', data);
    				var date = new Date();
					form.html(html)
					$(".inforBase").hide();
					form.show();
    				// 初始化生日
    				datepicker({
						ele:"#birthDay",
						num:"0",
						startYear:date.getFullYear() - 15,
						beginY:1949,
						endY:date.getFullYear() - 15,
						startMonth:1,
						cb:function(data){
						}
					})
					// 参加工作时间
    				datepicker({
						ele:"#workTime",
						num:"1",
						startYear:1997,
						beginY:1949,
						endY:date.getFullYear(),
						startMonth:1,
						cb:function(data){
							if(cvType == 3){
								var hipt1 = form.find("input[name='recentCompany']")
								var hipt2 = form.find("input[name='recentJob']")
								if(data=="暂无工作经验"){
									hipt1.attr("class","txt formTerms")
									hipt2.attr("class","txt formTerms")
									hipt1.parents(".edBase01").hide()
								}else{
									hipt1.attr("class","txt must formTerms")
									hipt2.attr("class","txt must formTerms")
									hipt1.parents(".edBase01").show()
								}
							}
						}
					})
					// 海外生活经历
					$("#abroadYears").cSelect({
						type:"abroadYears",
						classTxt:"formTerms option",
						name:"海外生活经历",
						data:{
							0: "不限",
							1: "6个月内",
							2: "6-12个月",
							3: "1年",
							4: "2年",
							5: "3年",
							6: "5年"
						},
						noAll:true
					})
    				//现居住地
					$("#nowLive").cSelect({
						type:"city",
						mult:true,
						inSelect: true,
						saveName:"nowLive",
						classTxt:"formTerms mult",
						multVal : 1,
						en:isEnCv,
						noClose:true,
						level: 3,
						startLevel:2,
						fullPath:true,
						onSelect:function(data){
							var full = data.fullPath[0] + ((isEnCv)?" ":"省 ");
								full += (data.fullPath[1])?data.fullPath[1] + ((isEnCv)?" ":"市 "):"";
								full += (data.fullPath[2])?data.fullPath[2]:"";
							$("#nowLive").val(full)
							$("#nowLive").attr("title",full)
						}
					})
					// 户口所在地
					$("#rpr").cSelect({
						type:"city",
						mult:true,
						inSelect: true,
						saveName:"rpr",
						classTxt:"formTerms mult",
						multVal : 1,
						en:isEnCv,
						noClose:true,
						level: 3,
						fullPath:true,
						onSelect:function(data){
							var full = data.fullPath[0] + ((isEnCv)?" ":"省 ");
								full += (data.fullPath[1])?data.fullPath[1] + ((isEnCv)?" ":"市 "):"";
								full += (data.fullPath[2])?data.fullPath[2]:"";
							$("#rpr").val(full)
							$("#rpr").attr("title",full)
						}
					})
    				// 选择学历
					$("#hEducation").cSelect({
						type:"degree",
						saveName:"hEducation",
						classTxt:"formTerms option",
						name:"请选择最高学历",
						noAll:true,
						maxHeight:210
					})
					// 选择驾照
					$("#drivingLicence").cSelect({
						type:"driver",
						saveName:"drivingLicence",
						classTxt:"formTerms option",
						name:"请选择驾驶证",
						data:{
							0: "不要求",
							1: "A1",
							2: "A2",
							3: "A3",
							4: "B1",
							5: "B2",
							6: "C1",
							7: "C2",
							8: "其他"
						},
						noAll:true,
						maxHeight:210
					})
					init.iptRadio(form)
					onBlurCheck(form)
					onKeyUpCheck(form)
					form.find('[data-type="abroadExp"] a').each(function(){
						var thisaea = $(this)
						if(form.find('[data-type="abroadExp"]').data("val") == "1"){
							$("#abroadYearsDiv").show()
						}else{
							$("#abroadYearsDiv").hide()
						}
						$(this).on("click.abroad",function(){
							if(thisaea.data("val") == "2"){
								$("#abroadYearsDiv").hide()
							}else{
								$("#abroadYearsDiv").show()
							}
						})
					})
    				//保存基本信息
					$("#edBase-submit").on("click",function(){
						if(!submitCheck(form)) return;
						save.base(option)
						closeEdit($("#name-mr"))
					})
					$("#edBase-cancel").on("click",function(){
						$(".inforBase").show()
    					form.hide()
    					closeEdit($("#name-mr"))
					})
    			}
    		})
    	},
    	//个人信息
    	selfEval:function(type){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editEvalue");
    			var html = template('editEvalTemp', data);
				form.html(html)
				$(".inforEvalue,#addSelfEval").hide();
				$(".evalue-mr .addInfor").hide()
				form.show();
				onKeyUpCheck(form)
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.selfEval(option)
					$(".evalue-mr .addInfor").show()
					closeEdit($(".evalue-mr"))
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add"){
    					$("#addSelfEval").show()
    				}else{
    					$(".inforEvalue").show()
    					$(".evalue-mr .addInfor").show()
    				}
    				closeEdit($(".evalue-mr"))
				})
    		}
    		if(option == 2){
    			ajax.post({
    				url:url.getSelfEval,
    				data:{
    					cvId:cvId
    				},
    				sucFun:function(data){
    					$("#addEval").parent().hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//证书奖励
    	cert:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editCert");
    			var html = template('editCertTemp', data);
    			$("#addCert").hide()
				form.html(html)
				var date = new Date();
    			datepicker({
					ele:"#getCertTime",
					num:"0",
					startYear:1987,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				onKeyUpCheck(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.cert(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforCert .mods").length){
    					$("#addCert").show()
    				}else{
    					$("#cert-"+id).show()
    					$(".inforCert").show()
    					$(".cert-mr .addInfor").show()
    				}
    				closeEdit($(".cert-mr"))
				})
				mScroll("cert-mr")
    		}
    		if(option == 2){
    			ajax.post({
    				url:url.getCert,
    				data:{
    					cvId:cvId,
    					certId:id
    				},
    				sucFun:function(data){
    					$("#cert-"+id).hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//培训经历
    	train:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editTrain");
    			var html = template('editTrainTemp', data);
    			$("#addTrain").hide()
				form.html(html)
				var date = new Date();
				// 培训开始时间
    			datepicker({
					ele:"#getTrainStartTime",
					num:"0",
					startYear:1987,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				// 培训结束时间
    			datepicker({
					ele:"#getTrainEndTime",
					num:"0",
					startYear:1987,
					startMonth:1,
					beginY:1949,
					endY:date.getFullYear(),
					cb:function(data){
					}
				})
				onKeyUpCheck(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.train(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforTrain .mods").length){
    					$("#addTrain").show()
    				}else{
    					$("#train-"+id).show()
    					$(".inforTrain").show()
    					$(".train-mr .addInfor").show()
    				}
    				closeEdit($(".train-mr"))
				})
				mScroll("train-mr")
    		}
    		if(option == 2){
    			ajax.post({
    				url:url.getTrain,
    				data:{
    					cvId:cvId,
    					trainId:id
    				},
    				sucFun:function(data){
    					$("#train-"+id).hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//项目经历
    	project:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editProject");
    			var html = template('editProjectTemp', data);
    			$("#addProject").hide()
				form.html(html)
				var date = new Date();
				// 培训开始时间
    			datepicker({
					ele:"#getProjectStartTime",
					num:"0",
					startYear:1997,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				// 培训开始时间
    			datepicker({
					ele:"#getProjectEndTime",
					num:"0",
					startYear:1997,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				onKeyUpCheck(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.project(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforProject .mods").length){
    					$("#addProject").show()
    				}else{
    					$("#project-"+id).show()
    					$(".inforProject").show()
    					$(".project-mr .addInfor").show()
    				}
    				closeEdit($(".project-mr"))
				})
				mScroll("project-mr")
    		}
    		if(option == 2){
    			ajax.post({
    				url:url.getProject,
    				data:{
    					cvId:cvId,
    					projectId:id
    				},
    				sucFun:function(data){
    					$("#project-"+id).hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//教育经历
    	edu:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editEdu");
    			if(data.educationDegreeId == 8||data.educationDegreeId == 13){
    				data.noMajor = true;
    			}
    			var html = template('editEduTemp', data);
    			$("#addEdu").hide()
				form.html(html)
				var date = new Date();
				// 教育开始时间
    			datepicker({
					ele:"#getEduStartTime",
					num:"0",
					startYear:1997,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				// 教育结束时间
    			datepicker({
					ele:"#getEduEndTime",
					num:"2",
					startYear:1997,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				$("#eduDegree").cSelect({
					type:"degree",
					saveName:"eduDegree",
					classTxt:"formTerms option",
					name:"请选择最高学历",
					noAll:true,
					maxHeight:210,
					onSelect:function(e){
						var v = $(e).val()
						if(v == 8 || v == 13){
							$("#eduMajor").hide()
							$("#eduMajor").find("input").val("")
							$("#eduMajor").find("input").removeClass("must")
						}else{
							$("#eduMajor").show()
							$("#eduMajor").find("input").addClass("must")
						}
					}
				})
				onKeyUpCheck(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.edu(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforEdu .mods").length){
    					$("#addEdu").show()
    				}else{
    					$("#edu-"+id).show()
    					$(".inforEdu").show()
    					$(".edu-mr .addInfor").show()
    				}
    				closeEdit($(".edu-mr"))
				})
				mScroll("edu-mr")
    		}
    		if(option == 2){
    			common.clickButtonLog("from=chr_my_res_edit_edu")
    			ajax.post({
    				url:url.getEdu,
    				data:{
    					cvId:cvId,
    					eduId:id
    				},
    				sucFun:function(data){
    					$("#edu-"+id).hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			common.clickButtonLog("from=chr_my_res_edit_addedu")
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//工作
    	work:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editWork");
    			var html = template('editWorkTemp', data);
    			$("#addWork").hide()
				form.html(html)
				var date = new Date();
				// 工作开始时间
    			datepicker({
					ele:"#getExpStartTime",
					num:"0",
					startYear:date.getFullYear() - 1,
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				// 工作结束时间
    			datepicker({
					ele:"#getExpEndTime",
					num:"2",
					startYear:date.getFullYear(),
					beginY:1949,
					endY:date.getFullYear(),
					startMonth:1,
					cb:function(data){
					}
				})
				$("#comSize").cSelect({
					type:"sizeCom",
					saveName:"comSize",
					classTxt:"formTerms option",
					name:"请选择公司规模",
					noAll:true
				})
				$("#comType").cSelect({
					type:"natureCom",
					saveName:"comType",
					classTxt:"formTerms option",
					name:"请选择公司性质",
					noAll:true
				})
				$("#expSalary").cSelect({
					type:"expSalary",
					saveName:"expSalary",
					classTxt:"formTerms option",
					name:"请选择月薪",
					noAll:true,
					data:{
						0:"不限",
						1:"2000以下",
						2:"2000-3000",
						3:"3000-4000",
						4:"4000-6000",
						5:"6000-8000",
						6:"8000-10000",
						7:"10000-15000",
						8:"15000-20000",
						9:"20000-30000",
						10:"30000-40000",
						11:"40000-50000",
						12:"50000以上",
						13:"保密"
					},
					maxHeight:210
				})
				$("#expJobCate").cSelect({
					type:"jobs",
					mult:true,
					inSelect: true,
					saveName:"expJobCate",
					classTxt:"formTerms mult",
					multVal : 1,
					noClose:true,
					level: 3
				})
				$("#expIndu").cSelect({
					type:"industry",
					saveName:"expIndu",
					classTxt:"formTerms mult",
					mult:true,
					level: 2,
					multVal : 5
				})
				onKeyUpCheck(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.work(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforWork .mods").length){
    					$("#addWork").show()
    				}else{
    					$("#work-"+id).show()
    					$(".inforWork").show()
    					$(".work-mr .addInfor").show()
    				}
    				closeEdit($(".work-mr"))
				})
				mScroll("work-mr")
    		}
    		if(option == 2){
    			common.clickButtonLog("from=chr_my_res_edit_work")
    			ajax.post({
    				url:url.getWork,
    				data:{
    					cvId:cvId,
    					expId:id
    				},
    				sucFun:function(data){
    					$("#work-"+id).hide()
    					initDom(data,option)
    				}
    			})
    		}else{
    			common.clickButtonLog("from=chr_my_res_edit_addwork")
    			var data = {};
    			initDom(data,option)
    		}
    	},
    	//求职意向
    	inten:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editInten");
    			if(!data.expectationNegotiation || data.expectationNegotiation=="0"){
    				delete data.expectationNegotiation;
    			}
    			var html = template('editIntenTemp', data);
    			$("#addInten,.inforInten").hide()
				form.html(html)
				$("#intenWorkStatus").cSelect({
					type:"intenWorkStatus",
					saveName:"intenWorkStatus",
					classTxt:"formTerms option",
					name:"请选择工作状态",
					data:{
						0:"在职",
						1:"离职"
					}
				})
				$("#intenComType").cSelect({
					type:"natureCom",
					saveName:"intenComType",
					classTxt:"formTerms option",
					name:"请选择单位性质",
					noAll:true
				})
				$("#intenJobs").cSelect({
					type:"jobs",
					mult:true,
					saveName:"intenJobs",
					classTxt:"formTerms mult",
					multVal : 3,
					startLevel:2,
					level: 3
				})
				$("#intenIndu").cSelect({
					type:"industry",
					saveName:"intenIndu",
					classTxt:"formTerms mult",
					mult:true,
					level: 2,
					startLevel:2,
					multVal : 5
				})
				$("#intenLoc").cSelect({
					type:"city",
					saveName:"intenLoc",
					classTxt:"formTerms mult",
					mult:true,
					level: 2,
					multVal : 5,
					goIndex:1,
					fullPath:true
				})
				form.find(".discuss").on("click",function(){
					if($(this).find("i").hasClass("choiced")){
						$(this).find("i").removeClass("choiced")
						setHiddenInputVal(form.find(".discuss"),"negotiation",0)
					}else{
						$(this).find("i").addClass("choiced")
						setHiddenInputVal(form.find(".discuss"),"negotiation",1)
					}
				})
				onKeyUpCheck(form)
				init.iptRadio(form)
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.inten(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforInten .mods").length){
    					$("#addInten").show()
    				}else{
    					$(".inforInten").show()
    					$(".inten-mr .addInfor").show()
    				}
    				closeEdit($(".inten-mr"))
				})
    		}
    		if(option == 2){
    			common.clickButtonLog("from=chr_my_res_edit_exp")
    			ajax.post({
    				url:url.getInten,
    				data:{
    					cvId:cvId
    				},
    				sucFun:function(data){
    					initDom(data,option)
    				}
    			})
    		}else{
    			common.clickButtonLog("from=chr_my_res_edit_addexp")
    			var data = {};
    			initDom(data,option)
    		}
    	},
		//作品展示
		achiev:function(type,id){
			var option = (type == "add")?1:2;
			function initDom(data,option){
				var form = $(".editAchiev");
				var html = template('editAchievTemp', data);
				form.html(html);
				onKeyUpCheck(form);
				if(data.type==1){
					$(".tiledAch li").eq(1).hide();
					$(".lineAch").hide();
					$(".picAch").show();
				}else if(data.type==2){
					$(".tiledAch li").eq(0).hide();
					$(".tiledAch li").eq(1).addClass("on");
					$(".picAch").hide();
					$(".lineAch").show();
				}
				form.show();
				if(option==1){
					window.setTimeout(function(){
						uploadFile('#filePicker');
					},0)
				}else{
					$("#achiev-"+id).hide()
					$("#filePicker2").show();
					window.setTimeout(function(){
						uploadFile('#filePicker2');
					},0)
				}

				//绑定事件
				form.find(".tiledAch li").on("click",function(){
					var index=$(this).index();
					$(this).addClass("on").siblings().removeClass("on");
					form.find(".itemedAch").hide().eq(index).show();
				})
				var picAch=form.find(".picAch");
				var lineAch=form.find(".lineAch");
				picAch.on("click",".closeImg",function(){

					var parent=$(this).parent(".file-item")
					var src=parent.find("img").attr("src");
					$.ajax({
						url:url.delAchievImg,
						data:{
							attachid:src,
							optype:2
						},
						type:"post",
						dataType:"json",
						success:function(data){
							if(data.isSuccess){
								parent.remove();
							}else{
								popMsg.mid({msg:data.returnMessage,type:"fail",timer:1500})
							}
						},
						error:function(e){
							popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
						}

					})
				})

				picAch.find(".save").on("click",function(){
					if($(this).hasClass('un')) return;
					if(!submitCheck(picAch)) return;
					save.achiev(option,picAch,id)
				})
				lineAch.find(".save").on("click",function(){
					if(!submitCheck(lineAch)) return;
					save.achiev(option,lineAch,id)
				})
				form.find(".cancel").on("click",function(){
					form.hide()
					if(type == "add" && !$(".inforAchiev .mods").length){
						$("#addAchiev").show()
					}else{
						$(".inforAchiev").show()
						$("#achiev-"+id).show()
						$(".achiev-mr .addInfor").show()
					}
					closeEdit($(".achiev-mr"))
				})
				mScroll("achiev-mr")
			}
			if(option==2){
				ajax.post({
					url:url.getAchiev,
					data:{
						cvId:cvId,
						productionId:id
					},
					sucFun:function(data){
						data.option=2;
						$("#addAchiev").hide()
						initDom(data,option)
					}
				})
			}else{
				var data={option:1};
				initDom(data,option)
			}
		},
    	//专业技能
    	special:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editSpecial");
    			var mult = form.data("mult")
    			var html = template('editSpecialTemp', data);
				form.html(html)
				form.show();
				var addBtn = form.find(".addLevel");
				formatSpChild(form.find(".saveLevel"))
				$(".inforSpecial").hide()
				addBtn.on("click",function(){
					var dom = '<li id="" class="saveLevel etChild mods">'+
								    '<i class="l-icon closeRed" data-id="" data-deltitle="专业技能" data-delsub="" data-mod="special"></i>'+
								    '<div class="itemLevel">'+
									    '<div class="rtTop"></div>'+
									    '<div class="rtBottom"></div>'+
									    '<div class="lfBottom"></div>'+
									    '<div class="lfTop"></div>'+
									    '<em>一般</em>'+
										'<i data-val="3" class="l-icon level03"></i>'+
										'<i data-val="2" class="l-icon level02"></i>'+
										'<i data-val="1" class="l-icon level01"></i>'+
										'<i data-val="4" class="l-icon level04 on"></i>'+
										'<i class="l-icon gray"></i>'+
									'</div>'+
									'<div class="ipt-child selc-Special">'+
										'<input readonly="true" data-val="" type="text" class="txt selcSpecial formTerms" value="选择专业技能" 				title="选择专业技能"/>'+
										'<i class="m-icon i-dn ico-intxt"></i>'+
									'</div>'+
								'</li>';
					$(this).before(dom)
					var addDom = $(this).prev()
					formatSpChild(addDom)
					if(form.find(".saveLevel").length >= mult) addBtn.hide()
				})
				if(form.find(".saveLevel").length >= mult){
					addBtn.hide()
				}
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.special(option)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				getDom.special()
				})
    		}
    		ajax.post({
    			url:url.getSpecial,
    			data:{
    				cvId:cvId
    			},
    			sucFun:function(data){
    				$("#addSpecial").hide()
    				initDom(data,option)
    			}
    		})
    	},
    	//语言技能
    	lang:function(type,id){
    		var option = (type == "add")?1:2;
    		function initDom(data,option){
    			var form = $(".editLang");
    			var chineseLangDoc = {0:"不限",1:"广东话",2:"闽南话",3:"上海话",4:"潮州话",5:"客家话",6:"四川话",7:"其他",8:"普通话"}
    			var foreignLangDoc = {0:"不限",1:"英语",2:"法语",3:"西班牙语",4:"日语",5:"朝鲜语",6:"德语",7:"俄语",8:"葡萄牙语",9:"阿拉伯语",10:"其他"}
    			if((data.langSkillTypeId == 1&&data.langSkillLangId == 10) || (data.langSkillTypeId == 2&&data.langSkillLangId == 7)){
    				data.hasOther = true;
    			}
    			var html = template('editLangTemp', data);
				form.html(html)
				if(option == 2){
					$("#lang-"+id).hide()
				}
				$("#addLang").hide()
				$("#langType").cSelect({
					type:"langType",
					saveName:"langType",
					classTxt:"formTerms option must",
					name:"选择类型",
					data:{
						0:"不限",
						1:"外语",
						2:"中文"
					},
					noAll:true,
					onSelect:function(e){
						$("#otherLang").hide()
						$("#langValDummy").val("")
						$("#langVal").data("val","")
						$("#langVal").find("span").html('选择语种<i class="icon-ar ar-dn"></i>')
						if($(e).val() == 1){
							$("#langVal").cSelect({
								type:"langVal",
								saveName:"langVal",
								classTxt:"formTerms option must",
								name:"选择语种",
								data:foreignLangDoc,
								noAll:true,
								onSelect:function(e){
									if($(e).val() == 10){
										$("#otherLang").show()
									}else{
										$("#otherLang").hide()
									}
								}
							})
						}else{
							$("#langVal").cSelect({
								type:"langVal",
								saveName:"langVal",
								classTxt:"formTerms option must",
								name:"选择语种",
								data:chineseLangDoc,
								noAll:true,
								onSelect:function(e){
									if($(e).val() == 7){
										$("#otherLang").show()
									}else{
										$("#otherLang").hide()
									}
								}
							})
						}
					}
				})

				var langValData = {}
				if($("#langType").data("val") == 1){
					langValData = foreignLangDoc
				}else{
					langValData = chineseLangDoc
				}
				var otherLangIpt = $("#otherLang input")
				$("#langVal").cSelect({
					type:"langVal",
					saveName:"langVal",
					classTxt:"formTerms option must",
					name:"选择语种",
					data:langValData,
					noAll:true,
					onSelect:function(e){
						if($("#langType").data("val") == 1){
							if($(e).val() == 10){
								$("#otherLang").show()
								otherLangIpt.attr("class","formTerms txt must")
							}else{
								$("#otherLang").hide()
								otherLangIpt.attr("class","formTerms txt")
							}
						}else{
							if($(e).val() == 7){
								$("#otherLang").show()
								otherLangIpt.attr("class","formTerms txt must")
							}else{
								$("#otherLang").hide()
								otherLangIpt.attr("class","formTerms txt")
							}
						}
					}
				})
				$("#langLevel").cSelect({
					type:"langLevel",
					saveName:"langLevel",
					classTxt:"formTerms option must",
					name:"请选择熟练程度",
					data:{
						0:"不限",
						1:"精通",
  						2:"熟练",
  						3:"良好",
  						4:"一般"
					},
					noAll:true
				})
				var otherLangIpt = $("#otherLang input")
				var len = checkinput.encnLen(otherLangIpt.val())
				if(len <= 10){
            	}else{
            	    var val = otherLangIpt.val();
            	    otherLangIpt.val(checkinput.encnCut(val,10))
            	}
            	$(this).on("keyup.olnum",function(){
            		var keyUpLen = checkinput.encnLen(otherLangIpt.val())
            	    if(keyUpLen <= 10){
            	    }else{
            	        var val = otherLangIpt.val();
            	        otherLangIpt.val(checkinput.encnCut(val,10))
            	    }
            	})
				form.show();
				form.find(".save").on("click",function(){
					if(!submitCheck(form)) return;
					save.lang(option,id)
				})
				form.find(".cancel").on("click",function(){
    				form.hide()
    				if(type == "add" && !$(".inforLang .mods").length){
    					$("#addLang").show()
    				}else{
    					if(option == 2){
							$("#lang-"+id).show()
						}
    					$(".inforLang").show()
    					$(".lang-mr .addInfor").show()
    				}
    				closeEdit($(".lang-mr"))
				})
				mScroll("lang-mr")
    		}
    		if(option == 2){
    			ajax.post({
    				url:url.getLang,
    				data:{
    					cvId:cvId,
    					langSkillId:id
    				},
    				sucFun:function(data){
    					initDom(data,option)
    				}
    			})
    		}else{
    			var data = {};
    			initDom(data,option)
    		}
    	}
    }

    // 初始化事件
    var init = {
    	format:function(){
    		this.top()
    		this.edit()
			this.addBtn()
			this.canAdd()
			this.addMore()
			this.mods($(".mods"))
			this.zoomImg();
    	},
    	zoomImg:function(){
    		function showBigImg(src){
    			var $wrap=$(".bigImgWrap");
	    		if(!$wrap.length){
	    		    $wrap=$('<div class="bigImgWrap"></div>');
	    			$wrap.html('<div class="lock_win"></div><div id="bigImg"><img src="'+src+'"><div class="bigImgClose"></div></div>');
	    			$("body").append( $wrap);
	    		}else{
	    			var $img=$wrap.find("img").attr("src",src);
	    		}
	    		
	    		

	    		$wrap.on("click",".bigImgClose,.lock_win,img",function(){
	    			$wrap.remove();
	    		})
	    		
    		}

    		$(".inforAchiev").on("click",".picInAch img",function(){
    			var src=$(this).attr("src");
    			showBigImg(src);
    		})
    	},
    	edit:function(){
    		this.baseInfo()
    		this.evalInfo()
    	},
    	addMore:function(){
    		if(!$(".itemAddMore li:visible").length){
    			$(".addMore-mr").hide()
    		}
    		$(".itemAddMore li").on("click",function(){
    			var df = $(this).data("for")
    			common.clickButtonLog("from=chr_my_res_more_"+df)
    			$("."+df+"-mr").show()
    			$(this).hide()
    			closeEdit($("."+df+"-mr"))
    			if(!$(".itemAddMore li:visible").length){
    				$(".addMore-mr").hide()
    			}
    		})
    	},
    	canAdd:function(){
    		$(".canAdd").each(function(){
    			var isfor = $(this).data("for")
    			var length = $(this).find(".mods").length;
    			var mult = $(this).data("mult")
    			var parDom = $("#"+isfor).parent();
    			var addModBtn = parDom.find(".addModBtn");
    			var isAddMore = $(this).data("am")
				addModBtn.find(".addBtn").off().on("click",function(){
					edit[$(this).data("mod")]("add");
				})
				if(length && isAddMore){
					$("."+isAddMore+"-mr").show()
					$("#"+isAddMore+"-addMore").hide()
				}
    			if(!length && !mult){
    				$("#"+isfor).show()
    				$("#"+isfor).parent().find(".oneDel").hide()
    			}else if(length && !mult){
    				$("#"+isfor).hide()
    				addModBtn.show()
    				addModBtn.find(".addBtn").off().on("click",function(){
    					edit[$(this).data("mod")]("edit")
    				})
    			}else if(mult && length){
    				$("#"+isfor).hide()
    				var title = parDom.find(".tilPart .wzPart span").text()
    				addModBtn.find(".addBtn").off().on("click",function(){
    					if(addModBtn.hasClass("editMod")) return edit[$(this).data("mod")]("edit");
    					if(parDom.find(".canAdd .mods").length >= mult){
    						return popMsg.mid({msg:"最多只能添加"+mult+"条"+title,type:"fail",timer:1500})
    					}
    					edit[$(this).data("mod")]("add")
    				})
    				if(addModBtn.hasClass("editMod")) return addModBtn.show();
    				if(length && length < mult){
    					addModBtn.show()
    				}else{
    					addModBtn.hide()
    				}
    			}else if(mult && !length){
    				$("#"+isfor).show()
    			}
    		})
    	},
    	addBtn:function(){
    		$("#addEval").on("click",function(){
    			edit.selfEval("add")
    		})
    		$("#addInten").on("click",function(){
    			edit.inten("add")
    		})
    		$("#addCert").on("click",function(){
    			edit.cert("add")
    		})
    		$("#addTrain").on("click",function(){
    			edit.train("add")
    		})
    		$("#addProject").on("click",function(){
    			edit.project("add")
    		})
    		$("#addEdu").on("click",function(){
    			edit.edu("add")
    		})
    		$("#addWork").on("click",function(){
    			edit.work("add")
    		})
			$("#addAchiev").on("click",function(){
				$(this).hide();
				edit.achiev("add");
			})
    		$("#addSpecial").on("click",function(){
    			edit.special("add")
    		})
    		$("#addLang").on("click",function(){
    			edit.lang("add")
    		})
    	},
    	top:function(){
    		/*if($(".reFresh-myResume").length>0){
    			$(".reFresh-myResume").after('<div class="news-myResume">\
					<i class="m-icon i-newNews"></i>新消息\
				</div>');
    			$(".news-myResume").on("click",function(){
	    			//洪荒计划弹框
	    			common.clickButtonLog('from=chr_social_PC_my_apping_resume_news');
	    			var n=Math.floor(Math.random()*hr.HRArray.length+1)-1;
	    			var data = hr.HRArray[n];
	    			//头像默认
	                var photourl="http://static.chinahr.com/themes/bchinahr/img/photo.png";
	                if(data[4]){
	                    photourl=data[4];
	                }
	    			var msg = "<div class=\"popbox\"><i class=\"upcvIcon popboxIcon\"></i><span class=\"popboxMsg\">我在英才APP等你来沟通入职</span></div><div class=\"appContent\"><div class=\"appHeader\"><img src=\""+photourl+"\"></div><div class=\"cvInfoContent\"><span class=\"name\">"+data[0]+"</span>";
	                if(data[1]=="男"){//男
	                    msg +="<i class=\"upcvIcon genderM\"></i>";
	                }else if(data[1]=="女"){//女
	                    msg +="<i class=\"upcvIcon genderFM\"></i>";
	                }

	                msg+="<span class=\"cvjob\">"+data[2]+"</span><div class=\"expApp\" title=\""+data[3]+"\">"+data[3]+"</div><div class=\"adress\">";

	                msg+="</div></div></div><div class=\"apptip\">扫码与TA沟通</div><div class=\"cvQrcode\"><img src=\"http://st01.chrstatic.com/themes/pcchinahr/img/newNews_hh.png?v=2016092301\" ></div><div  class=\"apptipDown\">若未下载APP，请扫码下载</div><br>";
	                appPopMsg.custom({
	                    title:"正在APP直招",
	                    msg: msg,
	                    close: true
	                });
	    		})
    		}*/
    		$(".reFresh-myResume,.date-myResume").on("click",function(){
    			refreshCv()
    		})
    		$(".til-myResume").on("click",function(){
    			editCvName($(this).find(".name-myResume"))
    		})
    		$(".bar-myResume .onOff i").on("click",function(){
    			if($(this).hasClass("i-on")){
    				setDefaultCv()
    			}else{
    				setDefaultCv(cvId)
    			}
    		})
			$(".entrust-myResume").on("click",function(){
				common.clickButtonLog("from=chr_my_daitou");
				var $btn=$(this).find(".m-icon");
				if($btn.hasClass("i-on")){
					//关闭委托
					setEntrust({cvid:cvId,action:"close",source:1});
				}else{
					//开启委托
					setEntrust({cvid:cvId,action:"open",source:1});
				}

			})

    		uploadLogo($(".perPhoto"))
    	},
    	iptRadio:function($this){
    		$this.find(".iptrio").each(function(){
    			var that = $(this);
    			var type = $(this).data("type")
    			var baseV = $(this).data("val")
    			baseV+="";
    			if(baseV){
    				baseV += "";
    				var baseVarr = baseV.split(";");
    				that.find("a").removeClass("checked");
    				$.each(baseVarr,function(k,v){
    					that.find("a[data-val='"+v+"']").addClass("checked")
    				})
    				setHiddenInputVal(that,type,baseV)
    			}
    			if($(this).hasClass("mul")){
    				that.find("a").off().on("click",function(){
    					var str = "";
    					$(this).toggleClass("checked")
    					that.find("a.checked").each(function(){
    						str += $(this).data("val")+";"
    					})
    					str = str.substring(0, str.length - 1);
    					setHiddenInputVal(that,type,str)
    				})
    			}else{
    				that.find("a").off().on("click",function(){
    					$(this).siblings().removeClass("checked")
    					$(this).addClass("checked")
    					setHiddenInputVal(that,type,$(this).data("val"))
    				})
    			}
    		})
    	},
    	evalInfo:function(){
    		if(!$(".inforEvalue .mods").length){
    			$(".inforEvalue").hide()
    		}
    		$(".inforEvalue").find(".editBtn").on("click",function(){
    			edit.selfEval('edit')
    		})
    	},
    	specialInfo:function(){
    		$(".special-mr .addModBtn span").on("click",function(){
    			edit.special('edit',cvId)
    		})
    	},
    	baseInfo:function(){
    		$(".changeBase i").on("click",function(){
    			edit.base()
    		})
    	},
    	mods:function($mods){
    		$mods.each(function(){
    			var thismod = $(this);
    			$(this).find(".editBtn").off().on("click",function(){
    				thismod.parent().find(".mods").show()
    				var modName = $(this).data("mod");
    				var id = $(this).parent().data("id")
    				edit[modName]("edit",id)
    			})
    			$(this).find(".delBtn").off().on("click",function(){
    				var modName = $(this).data("mod");
    				var id = $(this).parent().data("id")
    				del.childMod(id,modName)
    			})
    		})
    	},
    	clickCvlog:function(cvType){
    		switch(cvType){
    			case 1:
    				common.clickButtonLog("from=chr_my_res_chcvs")
    				break;
    			case 2:
    				common.clickButtonLog("from=chr_my_res_encvs")
    				break;
    			case 3:
    				common.clickButtonLog("from=chr_my_res_fjcvs")
    				break;
    			default:
    				break;
    		}
    	}
    }

	function getIntrustStatus(){
		$.ajax({
			url:url.getEntrust,
			type:"get",
			data:{cvid:cvId,source:1},
			dataType:'jsonp',
			success:function(data){
				var code =parseInt(data.code);
				if(code===1){
					//打开委托投递
					$(".entrust-myResume").show();
					$(".entrust-myResume i").attr("class","m-icon i-on");
					$(".entrust-myResume span").text("委托中");
				}else if(code===-1 || code===2){
					//关闭委托投递
					$(".entrust-myResume").show();
					$(".entrust-myResume i").attr("m-icon i-off");
					$(".entrust-myResume span").text("委托投递");
				}
			},
			error:function(){
				popMsg.mid({msg:"抱歉，系统不稳定，请稍后重试",type:"fail",timer:1500})
			}
		})
	}

    $(function(){
    	cvId = $("#cvId").val()
    	cvType = $("#cvType").val()
    	if(cvType == 2) isEnCv = true;
		//获得委托投递的状态
		getIntrustStatus();
		init.format()
		del.init()
		moreBtn()
		setPercent()
		init.clickCvlog(cvType)
    })

});