package edu.tsu.lulin.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import edu.tsu.lulin.entity.Entp;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Trade;
import edu.tsu.lulin.service.CVService;
import edu.tsu.lulin.service.EntpService;
import edu.tsu.lulin.service.JobService;
import edu.tsu.lulin.service.TradeService;
import edu.tsu.lulin.util.Dictionary;

@Controller("entpController")
@RequestMapping("/entp")
public class EntpController {
	@Resource(name = "entpService")
	private EntpService entpService;
	@Resource(name="jobService")
	private JobService jobService;
	@Resource(name="tradeService")
	private TradeService tradeService;
	@Resource(name="cvService")
	private CVService cvService;
	/**
	 * 创建企业
	 * 
	 * @param request
	 * @param entp
	 * @param img
	 * @param model
	 * @return
	 */
	@RequestMapping("/createEntp")
	public String createEntp(HttpServletRequest request, Entp entp, @RequestParam MultipartFile img, ModelMap model) {
		// 读取上传配置文件
		String fileName = "";// logo的存放名称
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		if (!img.isEmpty()) {
			Properties prop = new Properties();
			String upload_image_folder = "";
			try {
				prop.load(this.getClass().getClassLoader().getResourceAsStream("upload.properties"));
				upload_image_folder = prop.getProperty("upload_image_folder");
			} catch (IOException e) {
				e.printStackTrace();
			}
			String contentType = img.getContentType();
			String suffix = contentType.substring(contentType.lastIndexOf("/") + 1);
			fileName = new Date().getTime() + "." + suffix;
			File targetFile = new File(upload_image_folder, fileName);
			try {
				img.transferTo(targetFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		entp.setLogo(fileName);
		entp.setEntpuserid(entpuserid);
		boolean result = entpService.addEntp(entp);
		if (result) {
			model.put("tipMessage", "success");
		} else {
			model.put("tipMessage", "failed");
		}
		return "jsps/entp/qyinfoComplete";
	}

	/**
	 * 修改企业信息
	 * 
	 * @param request
	 * @param entp
	 * @param img
	 * @param model
	 * @return
	 */
	@RequestMapping("/updateEntp")
	public String updateEntp(HttpServletRequest request, Entp entp, @RequestParam MultipartFile img, ModelMap model) {
		// 读取上传配置文件
		String fileName = "";// logo的存放名称
		if (!img.isEmpty()) {
			Properties prop = new Properties();
			String upload_image_folder = "";
			try {
				prop.load(this.getClass().getClassLoader().getResourceAsStream("upload.properties"));
				upload_image_folder = prop.getProperty("upload_image_folder");
			} catch (IOException e) {
				e.printStackTrace();
			}
			String contentType = img.getContentType();
			String suffix = contentType.substring(contentType.lastIndexOf("/") + 1);
			fileName = new Date().getTime() + "." + suffix;
			File targetFile = new File(upload_image_folder, fileName);
			try {
				img.transferTo(targetFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		entp.setLogo(fileName);
		boolean result = entpService.updateEntp(entp);
		if(result){
			model.put("tipMessage", "success");
		}else{
			model.put("tipMessage", "failed");
		}
		return "jsps/entp/qyinfoComplete";
	}
	/**
	 * 跳转到企业详情页
	 * @param request
	 * @param model
	 * @param entpid
	 * @return
	 */
	@RequestMapping("/qyDetail")
	public String qyDetail(HttpServletRequest request,ModelMap model,@Param("entpid") Long entpid){
		Entp entp = entpService.findById(entpid);
		Trade trade = tradeService.findById(entp.getTradeid());
		List<Job> jobList = jobService.findByNum(5, entp.getEntpid(),Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));//指定页面最大显示5个职位
		model.put("trade", trade);
		model.put("entp", entp);
		model.put("jobList", jobList);
		return "jsps/entp/qyDetail";
	}
}
