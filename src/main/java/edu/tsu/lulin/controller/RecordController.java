package edu.tsu.lulin.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
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
import edu.tsu.lulin.entity.Record;
import edu.tsu.lulin.service.CVService;
import edu.tsu.lulin.service.EntpService;
import edu.tsu.lulin.service.JobService;
import edu.tsu.lulin.service.RecordService;
import edu.tsu.lulin.util.Dictionary;

@Controller("recordController")
@RequestMapping("/record")
public class RecordController {
	@Resource(name = "recordService")
	private RecordService recordService;
	@Resource(name = "cvService")
	private CVService cvService;
	@Resource(name = "entpService")
	private EntpService entpService;
	@Resource(name = "jobService")
	private JobService jobService;

	@RequestMapping("sendcv")
	public String sendCv(HttpServletRequest request, ModelMap model, @Param("entpid") Long entpid,
			@Param("jobid") Long jobid) {
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		if (null != cmuserid) {
			Cv cv = cvService.findCVByCmuserid(cmuserid);
			if (null != cv) {
				if (null != cv.getRealname()) {
					Record record = new Record();
					record.setCvid(cv.getCvid());
					record.setEntpid(entpid);
					record.setJobid(jobid);
					record.setSendtime(new Timestamp(new Date().getTime()));
					boolean bool = recordService.addOne(record);
					if (bool) {
						record.setStatus(Integer.valueOf(Dictionary.RECORD_STATUS_1.getCode()));
						recordService.updateOne(record);
						return "jsps/cm/sendSuccess";
					} else {
						return "jsps/cm/sendError";
					}
				} else {
					// 简历不完善
					return "jsps/cm/tipComplete";
				}
			} else {
				// 没简历，新建简历
				return "jsps/cm/tipCreateCv";
			}
		} else {
			return "cmlogin";
		}
	}

	@RequestMapping("/ajaxGetCount")
	@ResponseBody
	public Object ajaxGetCount(HttpServletRequest request) {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		Entp entp = entpService.findEntpByEntpuserid(entpuserid.toString());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		int shaixuan = recordService.queryCountByStatusAndEntp(Integer.valueOf(Dictionary.RECORD_STATUS_1.getCode()),
				entp.getEntpid());
		int weidu = recordService.queryCountByStatusAndEntp(Integer.valueOf(Dictionary.RECORD_STATUS_2.getCode()),
				entp.getEntpid());
		int goutong = recordService.queryCountByStatusAndEntp(Integer.valueOf(Dictionary.RECORD_STATUS_3.getCode()),
				entp.getEntpid());
		resultMap.put("status1", shaixuan + weidu);
		resultMap.put("status3", goutong);
		return resultMap;
	}

	@RequestMapping("/ajaxUpdateRecord")
	@ResponseBody
	public Object ajaxUpdateRecord(Record record) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		record.setChangetime(new Timestamp(new Date().getTime()));
		boolean bool = recordService.updateOne(record);
		if (bool) {
			resultMap.put("result", "success");
		} else {
			resultMap.put("result", "failed");
		}
		return resultMap;
	}
}
