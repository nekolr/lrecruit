package edu.tsu.lulin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Job;

@Repository("jobDao")
public interface JobDao {
	/**
	 * 添加一份工作
	 * @param job
	 * @return
	 */
	public int addJob(Job job);
	
	/**
	 * 删除一份工作
	 * @param jobid
	 * @return
	 */
	public int deleteJob(Long jobid);

	/**
	 * 修改一份工作
	 * @param job
	 * @return
	 */
	public int updateJob(Job job);
	
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
	public List<Job> findByNum(@Param("num")int num,@Param("entpid")Long entpid,@Param("status") int status);
	
	/**
	 * 根据entpid和状态查询
	 * @param entpid
	 * @param status
	 * @return
	 */
	public List<Job> findByEntpidAndStatus(@Param("entpid")Long entpid,@Param("status")int status);
	
	/**
	 * 根据查询条件和页号查询
	 * @param job
	 * @param tradeid
	 * @param entpnature
	 * @return
	 */
	public List<Job> findByConditionPaging(@Param("job") Job job,@Param("tradeid") Long tradeid,@Param("entpnature") Integer entpnature);
	
	/**
	 * 根据查询条件和页号查询
	 * @param job
	 * @param tradeid
	 * @param entpnature
	 * @return
	 */
	public List<String> findByConditionPagingAjax(@Param("job") Job job,@Param("tradeid") Long tradeid,@Param("entpnature") Integer entpnature);
}
