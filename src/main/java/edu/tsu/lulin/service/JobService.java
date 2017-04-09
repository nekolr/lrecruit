package edu.tsu.lulin.service;

import java.util.List;


import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;

public interface JobService {
	/**
	 * 添加一份工作
	 * @param job
	 * @return
	 */
	public boolean addJob(Job job);
	
	/**
	 * 删除一份工作
	 * @param jobid
	 * @return
	 */
	public boolean deleteJob(Long jobid);

	/**
	 * 修改一份工作
	 * @param job
	 * @return
	 */
	public boolean updateJob(Job job);
	
	/**
	 * 查询全部工作
	 * @return
	 */
	public List<Job> findAll();
	
	/**
	 * 根据公司查询全部工作
	 * @param entpid
	 * @return
	 */
	public List<Job> findByEntpid(Long entpid);
	/**
	 * 根据id查询job详情
	 * @param jobid
	 * @return
	 */
	public Job findById(Long jobid);
	
	/**
	 * 指定查询的个数
	 * @param num
	 * @return
	 */
	public List<Job> findByNum(int num,Long entpid,int status);
	
	/**
	 * 根据entpid和状态查询
	 * @param entpid
	 * @param status
	 * @return
	 */
	public List<Job> findByEntpidAndStatus(Long entpid,int status);
	
	/**
	 * 根据查询条件和页号查询
	 * @param job
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public Pagger<Job> findByConditionPaging(Job job,Long tradeid,Integer entpnature,Integer pageNum,Integer pageSize);
	
	/**
	 * 根据查询条件和页号查询
	 * @param job
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public List<String> findByConditionPagingAjax(Job job,Long tradeid,Integer entpnature,Integer pageNum,Integer pageSize);
}
