package edu.tsu.lulin.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.tsu.lulin.annotation.Token;
import edu.tsu.lulin.entity.Cv;
import edu.tsu.lulin.entity.Entp;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;
import edu.tsu.lulin.entity.Position;
import edu.tsu.lulin.entity.Record;
import edu.tsu.lulin.entity.Trade;
import edu.tsu.lulin.service.CVService;
import edu.tsu.lulin.service.EntpService;
import edu.tsu.lulin.service.JobService;
import edu.tsu.lulin.service.PositionService;
import edu.tsu.lulin.service.RecordService;
import edu.tsu.lulin.service.TradeService;
import edu.tsu.lulin.util.Constant;
import edu.tsu.lulin.util.Dictionary;

@Controller("baseController")
@RequestMapping("/")
public class BaseController {

	@Resource(name = "entpService")
	private EntpService entpService;
	@Resource(name = "jobService")
	private JobService jobService;

	@Resource(name = "tradeService")
	private TradeService tradeService;

	@Resource(name = "cvService")
	private CVService cvService;

	@Resource(name = "recordService")
	private RecordService recordService;

	@Resource(name = "positionService")
	private PositionService positionService;

	@RequestMapping("/gocmlogin")
	public String gocmlogin() {
		return "cmlogin";
	}

	@RequestMapping("/cmuser/gomycv")
	public String gomycv(HttpServletRequest request, ModelMap model) {
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		Cv cv = cvService.findCVByCmuserid(cmuserid);
		if (null == cv) {
			cv = new Cv();
			cv.setCmuserid(cmuserid);
			cvService.createCV(cv);
		}
		model.put("cv", cv);
		model.put("uptime", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		return "jsps/cm/myCV";
	}

	@RequestMapping("/cmuser/goshowSendRecord")
	public String goshowSendRecord(HttpServletRequest request, ModelMap model,
			@RequestParam(value = "status", required = false) Integer status,
			@RequestParam(value = "pageNum", required = false) Integer pageNum) {
		if (null == status) {
			status = 1;
		}
		if (null == pageNum) {
			pageNum = 1;
		}
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		if (null != cmuserid) {
			Cv cv = cvService.findCVByCmuserid(cmuserid);
			if (null != cv) {
				Pagger<Record> pagger = recordService.queryListBycvidPaging(cv.getCvid(), status, pageNum,
						Constant.PROCESSIZE);
				model.put("pagger", pagger);
			} else {
				Pagger<Record> pagger = new Pagger<Record>();
				pagger.setCurrentPage(0l);
				pagger.setTotalPage(0l);
				pagger.setTotalRecord(0l);
			}
		} else {
			Pagger<Record> pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		model.put("status", status);
		model.put("pageNum", pageNum);
		return "jsps/cm/showSendRecord";
	}

	@RequestMapping("/cmuser/goaccountSettings")
	public String goaccountSettings() {
		return "jsps/cm/accountSettings";
	}

	@RequestMapping("/gofindbyemail")
	public String gofindpwd() {
		return "findpwd";
	}

	@RequestMapping("/gocmregist")
	@Token(save = true)
	public String gocmregist() {
		return "cmregist";
	}

	@RequestMapping("/gofindbyemail_entp")
	public String gofindbyemail_entp() {
		return "findpwd_entp";
	}

	@RequestMapping("/goqyregist")
	@Token(save = true)
	public String goqyregist() {
		return "qyregist";
	}

	@RequestMapping("/goqylogin")
	public String goqylogin() {
		return "qylogin";
	}

	@RequestMapping("/entpuser/goqyaccountSettings")
	public String goqyaccountSettings(HttpServletRequest request, ModelMap model) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		model.put("entp", entp);
		return "jsps/entp/qyAccountSettings";
	}

	@RequestMapping("/entpuser/gocvmanager")
	public String gocvmanager(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 1;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		int should = 0, readed = 0;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		should = recordService.queryCountByStatus(jobid, experience, edu,
				Integer.valueOf(Dictionary.RECORD_STATUS_1.getCode()), entp.getEntpid());
		readed = recordService.queryCountByStatus(jobid, experience, edu,
				Integer.valueOf(Dictionary.RECORD_STATUS_2.getCode()), entp.getEntpid());
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		model.put("should", should);
		model.put("readed", readed);
		return "jsps/entp/CVList";
	}

	@RequestMapping("/entpuser/gogoutong")
	public String gogoutong(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 3;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		return "jsps/entp/goutong";
	}
	
	@RequestMapping("/entpuser/yaoqing")
	public String yaoqing(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 7;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		return "jsps/entp/yaoqing";
	}

	@RequestMapping("/entpuser/gomianshi")
	public String gomianshi(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 4;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		return "jsps/entp/mianshi";
	}

	@RequestMapping("/entpuser/goluqu")
	public String goluqu(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 5;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		return "jsps/entp/luqu";
	}

	@RequestMapping("/entpuser/gonot")
	public String gonot(HttpServletRequest request, ModelMap model, @Param("jobid") Long jobid,
			@Param("experience") Integer experience, @Param("edu") Integer edu, @Param("status") Integer status,
			@Param("pageNum") Integer pageNum) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		if (null == jobid) {
			jobid = -1l;
		}
		if (null == experience) {
			experience = -1;
		}
		if (null == edu) {
			edu = -1;
		}
		if (null == status) {
			status = 6;
		}
		if (null == pageNum || pageNum < 1) {
			pageNum = 1;
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		Pagger<Record> pagger = recordService.queryListByConditionPaging(jobid, experience, edu, status,
				entp.getEntpid(), pageNum, Constant.CVPAGESIZE);
		if (null != pagger.getDataList()) {
			for (Record record : pagger.getDataList()) {
				Cv cv = cvService.findCVById(record.getCvid());
				Job job = jobService.findById(record.getJobid());
				record.setCv(cv);
				record.setJobname(job.getJobname());
			}
		} else {
			pagger = new Pagger<Record>();
			pagger.setCurrentPage(0l);
			pagger.setTotalPage(0l);
			pagger.setTotalRecord(0l);
		}
		conditionMap.put("jobid", jobid);
		conditionMap.put("experience", experience);
		conditionMap.put("edu", edu);
		conditionMap.put("status", status);
		conditionMap.put("pageNum", pageNum);
		model.put("conditionMap", conditionMap);
		model.put("jobList", jobList);
		model.put("pagger", pagger);
		return "jsps/entp/notcv";
	}

	@RequestMapping("/entpuser/gopositionmanager")
	public String gopositionmanager(HttpServletRequest request, ModelMap model) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		model.put("jobList", jobList);
		return "jsps/entp/showPosition";
	}

	@RequestMapping("/entpuser/gopositionshenhe")
	public String gopositionshenhe(HttpServletRequest request, ModelMap model) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/tipCreateEntp";
		}
		List<Job> jobList = jobService.findByEntpidAndStatus(entp.getEntpid(),
				Integer.valueOf(Dictionary.JOB_STATUS_0.getCode()));
		model.put("jobList", jobList);
		return "jsps/entp/showShenhe";
	}

	@RequestMapping("/entpuser/goqyinfo")
	public String goqyinfo(HttpServletRequest request, ModelMap model) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());

		if (null == entp) {
			return "jsps/entp/qyInfo";
		} else {
			Trade trade = tradeService.findById(entp.getTradeid());
			model.put("entp", entp);
			model.put("trade", trade);
			return "jsps/entp/qyInfo_update";
		}
	}

	@RequestMapping("/job/gopostposition")
	public String gopostposition(HttpServletRequest request, ModelMap model) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		if (null == entp) {
			return "jsps/entp/qyInfo";
		} else {
			model.put("entp", entp);
			return "jsps/entp/postPosition";
		}
	}

	@RequestMapping("/gocv")
	public String gocv(HttpServletRequest request, ModelMap model, @RequestParam("cvid") Long cvid,
			@RequestParam(value = "jobid", required = false) Long jobid,
			@RequestParam(value = "sendtime", required = false) Timestamp sendtime) {
		Cv cv = cvService.findCVById(cvid);
		Position position = positionService.findById(cv.getPositionid());
		String entpaccount = (String) request.getSession().getAttribute("entpaccount");
		if (null != entpaccount) {
			Record record = recordService.queryOneByCondition2(cvid, jobid, sendtime);
			if (null != record) {
				record.setStatus(Integer.valueOf(Dictionary.RECORD_STATUS_2.getCode()));
				record.setChangetime(new Timestamp(new Date().getTime()));
				recordService.updateOne(record);
			}
		}
		model.put("cv", cv);
		model.put("positionname", position.getPositionname());
		return "cv";
	}
}
