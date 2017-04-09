package edu.tsu.lulin.service.impl;

import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;

import edu.tsu.lulin.dao.EntpDao;
import edu.tsu.lulin.dao.JobDao;
import edu.tsu.lulin.dao.RecordDao;
import edu.tsu.lulin.entity.Entp;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;
import edu.tsu.lulin.entity.Record;
import edu.tsu.lulin.service.RecordService;

@Service("recordService")
public class RecordServiceImpl implements RecordService {
	@Resource(name = "recordDao")
	private RecordDao recordDao;
	@Resource(name="jobDao")
	private JobDao jobDao;
	@Resource(name="entpDao")
	private EntpDao entpDao;

	@Override
	public boolean addOne(Record record) {
		return recordDao.addOne(record) > 0;
	}

	@Override
	public Record queryOne(Long recordid) {
		return recordDao.queryOne(recordid);
	}

	@Override
	public boolean updateOne(Record record) {
		return recordDao.updateOne(record) > 0;
	}

	@Override
	public Pagger<Record> queryListByConditionPaging(Long jobid, Integer experience, Integer edu, Integer status,Long entpid,
			Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Record> recordList = recordDao.queryListByCondition(jobid, experience, edu, status,entpid);
		Long total = PageHelper.count(new ISelect() {
			@Override
			public void doSelect() {
				recordDao.queryListByCondition(jobid, experience, edu, status,entpid);
			}
		});
		Pagger<Record> pagger = new Pagger<Record>(new Long(pageNum), new Long(pageSize), total, recordList);

		return pagger;
	}

	@Override
	public int queryCountByStatus(Long jobid, Integer experience, Integer edu, Integer status, Long entpid) {
		return recordDao.queryCountByStatus(jobid, experience, edu, status, entpid);
	}

	@Override
	public int queryCountByStatusAndEntp(Integer status, Long entpid) {
		return recordDao.queryCountByStatusAndEntp(status, entpid);
	}

	@Override
	public Record queryOneByCondition(Long cvid, Long jobid, Long entpid) {
		return recordDao.queryOneByCondition(cvid, jobid, entpid);
	}

	@Override
	public Record queryOneByCondition2(Long cvid, Long jobid, Timestamp sendtime) {
		return recordDao.queryOneByCondition2(cvid, jobid, sendtime);
	}

	@Override
	public Pagger<Record> queryListBycvidPaging(Long cvid,Integer status, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Record> recordList = recordDao.queryListBycvid(cvid,status);
		for(Record record : recordList){
			Job job = jobDao.findById(record.getJobid());
			Entp entp = entpDao.findById(job.getEntpid());
			job.setEntpname(entp.getEntpname());
			record.setJob(job);
		}
		Long total = PageHelper.count(new ISelect() {
			@Override
			public void doSelect() {
				recordDao.queryListBycvid(cvid,status);
			}
		});
		Pagger<Record> pagger = new Pagger<Record>(new Long(pageNum), new Long(pageSize), total, recordList);

		return pagger;
	}
	

}
