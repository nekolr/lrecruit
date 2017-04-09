package edu.tsu.lulin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.tsu.lulin.entity.Cv;
import edu.tsu.lulin.entity.Entp;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;
import edu.tsu.lulin.entity.Record;
import edu.tsu.lulin.entity.Trade;
import edu.tsu.lulin.enums.Edu;
import edu.tsu.lulin.enums.Entpnature;
import edu.tsu.lulin.enums.Entpsize;
import edu.tsu.lulin.service.CVService;
import edu.tsu.lulin.service.CmuserService;
import edu.tsu.lulin.service.EntpService;
import edu.tsu.lulin.service.JobService;
import edu.tsu.lulin.service.PositionService;
import edu.tsu.lulin.service.RecordService;
import edu.tsu.lulin.service.TradeService;
import edu.tsu.lulin.util.Constant;
import edu.tsu.lulin.util.Dictionary;

@Controller("jobController")
@RequestMapping("/job")
public class JobController {
	@Resource(name = "jobService")
	private JobService jobService;

	@Resource(name = "entpService")
	private EntpService entpService;

	@Resource(name = "positionService")
	private PositionService positionService;

	@Resource(name = "tradeService")
	private TradeService tradeService;
	
	@Resource(name="cmuserService")
	private CmuserService cmuserService;
	
	@Resource(name="cvService")
	private CVService cvService;
	
	@Resource(name="recordService")
	private RecordService recordService;

	/**
	 * 添加工作
	 * 
	 * @param request
	 * @param job
	 * @param model
	 * @return
	 */
	@RequestMapping("/addJob")
	public String addJob(HttpServletRequest request, Job job, ModelMap model) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		job.setStatus(Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));// 未审核
		job.setPosttime(sdf.format(new Date()));// 发布时间
		boolean result = jobService.addJob(job);
		if (result) {
			model.put("tipMessage", "success");
		} else {
			model.put("tipMessage", "failed");
		}
		return "jsps/entp/positionComplete";
	}

	/**
	 * 工作详情页
	 * 
	 * @param request
	 * @param jobid
	 * @param model
	 * @return
	 */
	@RequestMapping("/jobDetail")
	public String jobDetail(HttpServletRequest request, @Param("jobid") Long jobid, ModelMap model) {
		Job job = jobService.findById(jobid);
		Entp entp = entpService.findById(job.getEntpid());
		Trade trade = tradeService.findById(entp.getTradeid());
		model.put("job", job);
		model.put("entp", entp);
		model.put("trade", trade);
		return "jsps/entp/jobDetail";
	}

	/**
	 * 工作详情页 --公共
	 * 
	 * @param request
	 * @param jobid
	 * @param model
	 * @return
	 */
	@RequestMapping("/jobDetailpub")
	public String jobDetailpub(HttpServletRequest request, @Param("jobid") Long jobid, ModelMap model) {
		Job job = jobService.findById(jobid);
		Entp entp = entpService.findById(job.getEntpid());
		Trade trade = tradeService.findById(entp.getTradeid());
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		if(null!=cmuserid){
			Cv cv = cvService.findCVByCmuserid(cmuserid);
			Record record = recordService.queryOneByCondition(cv.getCvid(), jobid, entp.getEntpid());
			if(null!=record){
				long imsub = new Date().getTime() - record.getSendtime().getTime();
				if(imsub>3*24*60*60*1000){
					model.put("cansend", true);
				}else{
					model.put("cansend", false);				
				}
			}else{
				model.put("cansend", true);
			}
		}else{
			model.put("cansend", true);
		}
		model.put("job", job);
		model.put("entp", entp);
		model.put("trade", trade);
		return "jobDetailpub";
	}

	@RequestMapping("/sou")
	public String sou(HttpServletRequest request, ModelMap model, @Param("job") Job job, @Param("tradeid") Long tradeid,
			@Param("entpnature") Integer entpnature, @Param("pageNum") Integer pageNum,@Param("flag") String flag) {
		String jobname = job.getJobname();//保存原来输入的jobname
		if (null == tradeid) {
			tradeid = -1l;
		}
		if (null == entpnature) {
			entpnature = -1;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		if (null == job.getEdu()) {
			job.setEdu(-1);
		}
		if (null == job.getExperience()) {
			job.setExperience(-1);
		}
		if(null!=job.getJobname() && !job.getJobname().equals("")){
			job.setJobname(job.getJobname().toLowerCase());
		}
		Map<String, List<Trade>> resultMap = new LinkedHashMap<String, List<Trade>>();
		Map<String,Object> conditionMap = new HashMap<String,Object>();
		List<Trade> tradeList = tradeService.findExistRefPosition();
		for (Trade trade : tradeList) {
			List<Trade> list = tradeService.findByParentidAndISPN(trade.getTradeid());
			resultMap.put(trade.getTradeid().toString(), list);
		}
		Pagger<Job> pagger = jobService.findByConditionPaging(job, tradeid, entpnature, pageNum, Constant.JOBPAGESIZE);
		if(null!=pagger.getDataList()){
			for(Job j:pagger.getDataList()){
				Trade trade = tradeService.findByPositionid(j.getPositionid());
				Entp entp = entpService.findById(j.getEntpid());
				j.setTradename(trade.getTradename());
				j.setEntpname(entp.getEntpname());
				j.setEntpsize(Entpsize.FIVE.getName(entp.getEntpsize()));
				j.setEduname(Edu.EIGHT.getName(j.getEdu()));
				j.setEntpnature(Entpnature.EIGHT.getName(entp.getEntpnature()));
			}
		}else{
			pagger = new Pagger<Job>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		job.setJobname(jobname);//还原原来输入的jobname
		conditionMap.put("tradeid", tradeid);
		conditionMap.put("entpnature", entpnature);
		conditionMap.put("job", job);
		conditionMap.put("flag", flag);
		model.put("conditionMap", conditionMap);
		model.put("pagger", pagger);
		model.put("trademap", resultMap);
		return "sou";
	}

	@RequestMapping("/ajaxAutoComplete")
	@ResponseBody
	public Object ajaxAutoComplete(@Param("job") Job job, @Param("tradeid") Long tradeid,
			@Param("entpnature") Integer entpnature) {
		if (null == tradeid) {
			tradeid = -1l;
		}
		if (null == entpnature) {
			entpnature = -1;
		}
		if (null == job.getEdu()) {
			job.setEdu(-1);
		}
		if (null == job.getExperience()) {
			job.setExperience(-1);
		}
		if(null!=job.getJobname() && !job.getJobname().equals("")){
			job.setJobname(job.getJobname().toLowerCase());			
		}

		List<String> jobnameList = jobService.findByConditionPagingAjax(job, tradeid, entpnature, 1, 6);
		return jobnameList;
	}
}
