package edu.tsu.lulin.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.tsu.lulin.entity.Cv;
import edu.tsu.lulin.service.CVService;

@Controller("cvController")
@RequestMapping("/cv")
//@MultipartConfig(fileSizeThreshold=1024*1024,maxFileSize=4*1024*1024)
public class CVController {
	private static final Logger logger = Logger.getLogger(CVController.class);
	private Map<String,Object> resultMap = new HashMap<String,Object>();
	@Resource(name="cvService")
	private CVService cvService;
	
	@RequestMapping("/ajaxUpdateHead")
	/**
	 * ajax更新头像
	 * @param request
	 * @return
	 */
	public @ResponseBody Map<String,Object> ajaxUpdateHead(HttpServletRequest request){
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		Cv cv = cvService.findCVByCmuserid(cmuserid);
		Part part = null;
		try {
			part = request.getPart("head");
			logger.info("contentType="+part.getContentType());
			logger.info("content-Disposition="+part.getHeader("content-Disposition"));
		} catch (IOException e1) {
			e1.printStackTrace();
		} catch (ServletException e1) {
			e1.printStackTrace();
		}
		
		String fileName = "";// logo的存放名称
		if (null != part) {
			Properties prop = new Properties();
			String upload_image_folder = "";
			try {
				prop.load(this.getClass().getClassLoader().getResourceAsStream("upload.properties"));
				upload_image_folder = prop.getProperty("upload_image_folder");
			} catch (IOException e) {
				e.printStackTrace();
			}

			fileName = "_head_"+new Date().getTime() + ".jpg";
			File targetFile = new File(upload_image_folder, fileName);
			BufferedInputStream bis = null;
			BufferedOutputStream bos = null;
			try {
				bis = new BufferedInputStream(part.getInputStream());
				bos = new BufferedOutputStream(new FileOutputStream(targetFile));
				int b = 0;
				while((b=bis.read())!=-1){
					bos.write(b);
				}
				boolean result = cvService.updateHead(fileName, cv.getCvid());
				if(result){
					resultMap.put("result", "success");
				}else{
					resultMap.put("result", "failed");
				}
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				try {
					bos.close();
					bis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
		}
		
		return resultMap;
	}
	
	@RequestMapping("/ajaxUpdateCvbase")
	/**
	 * ajax更新简历-基本
	 * @param request
	 * @return
	 */
	public @ResponseBody Map<String,Object> ajaxUpdateCvbase(HttpServletRequest request,Cv cv){
		boolean bool = cvService.updateCVbase(cv);
		Cv queryCv = cvService.findCVById(cv.getCvid());
		if(bool){
			resultMap.put("result", "success");
			resultMap.put("cv", queryCv);
		}else{
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
	
	@RequestMapping("/ajaxUpdateCvinten")
	/**
	 * ajax更新简历-期望
	 * @param request
	 * @return
	 */
	public @ResponseBody Map<String,Object> ajaxUpdateCvinten(HttpServletRequest request,Cv cv){
		boolean bool = cvService.updateCVinten(cv);
		Cv queryCv = cvService.findCVById(cv.getCvid());
		if(bool){
			resultMap.put("result", "success");
			resultMap.put("cv", queryCv);
		}else{
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
	
	@RequestMapping("/ajaxUpdateCvSchool")
	/**
	 * ajax更新简历-教育经历
	 * @param request
	 * @return
	 */
	public @ResponseBody Map<String,Object> ajaxUpdateCvSchool(HttpServletRequest request,Cv cv){
		boolean bool = cvService.updateCVSchool(cv);
		Cv queryCv = cvService.findCVById(cv.getCvid());
		if(bool){
			resultMap.put("result", "success");
			resultMap.put("cv", queryCv);
		}else{
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
	
	@RequestMapping("/ajaxUpdateCvmyself")
	/**
	 * ajax更新简历-自我描述
	 * @param request
	 * @return
	 */
	public @ResponseBody Map<String,Object> ajaxUpdateCvmyself(HttpServletRequest request,Cv cv){
		boolean bool = cvService.updateCVmyself(cv);
		Cv queryCv = cvService.findCVById(cv.getCvid());
		if(bool){
			resultMap.put("result", "success");
			resultMap.put("cv", queryCv);
		}else{
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
	
	@RequestMapping("/flushCv")
	/**
	 * 刷新简历
	 * @param request
	 * @param cvid
	 * @return
	 */
	public @ResponseBody Map<String,Object> flushCv(HttpServletRequest request,@RequestParam("cvid") Long cvid){
		if(null!=cvid){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Cv cv = cvService.findCVById(cvid);
			resultMap.put("result", "success");
			resultMap.put("cv", cv);
			resultMap.put("uptime", sdf.format(new Date()));
		}else{
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
	
}
