package edu.tsu.lulin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;

import edu.tsu.lulin.dao.JobDao;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;
import edu.tsu.lulin.service.JobService;

@Service("jobService")
public class JobServiceImpl implements JobService {
	@Resource(name = "jobDao")
	private JobDao jobDao;

	@Override
	public boolean addJob(Job job) {
		return jobDao.addJob(job) > 0;
	}

	@Override
	public boolean deleteJob(Long jobid) {
		return jobDao.deleteJob(jobid) > 0;
	}

	@Override
	public boolean updateJob(Job job) {
		return jobDao.updateJob(job) > 0;
	}

	@Override
	public List<Job> findAll() {
		return jobDao.findAll();
	}

	@Override
	public List<Job> findByEntpid(Long entpid) {
		return jobDao.findByEntpid(entpid);
	}

	@Override
	public Job findById(Long jobid) {
		return jobDao.findById(jobid);
	}

	@Override
	public List<Job> findByNum(int num,Long entpid,int status) {
		return jobDao.findByNum(num,entpid,status);
	}

	@Override
	public List<Job> findByEntpidAndStatus(Long entpid, int status) {
		return jobDao.findByEntpidAndStatus(entpid, status);
	}

	@Override
	public Pagger<Job> findByConditionPaging(Job job, Long tradeid, Integer entpnature, Integer pageNum,Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Job> jobList = jobDao.findByConditionPaging(job, tradeid, entpnature);
		Long total = PageHelper.count(new ISelect() {
		    @Override
		    public void doSelect() {
		    	jobDao.findByConditionPaging(job, tradeid, entpnature);
		    }
		});
		Pagger<Job> pagger = new Pagger<Job>(new Long(pageNum),new Long(pageSize),total,jobList);
		return pagger;
	}

	@Override
	public List<String> findByConditionPagingAjax(Job job, Long tradeid, Integer entpnature, Integer pageNum,
			Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<String> jobnameList = jobDao.findByConditionPagingAjax(job, tradeid, entpnature);
		return jobnameList;
	}

}
