package edu.tsu.lulin.dao;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Record;
@Repository("recordDao")
public interface RecordDao {
	/**
	 * 添加一个
	 * @param record
	 * @return
	 */
	public int addOne(Record record);
	
	/**
	 * 根据id查询
	 * @param recordid
	 * @return
	 */
	public Record queryOne(Long recordid);
	
	/**
	 * 更新一个
	 * @param record
	 * @return
	 */
	public int updateOne(Record record);
	
	/**
	 * 条件查询
	 * @param jobid
	 * @param experience
	 * @param edu
	 * @param status
	 * @return
	 */
	public List<Record> queryListByCondition(
			@Param("jobid") Long jobid,
			@Param("experience") Integer experience,
			@Param("edu") Integer edu,
			@Param("status") Integer status,
			@Param("entpid") Long entpid);
	
	/**
	 * 根据状态查询
	 * @param status
	 * @param entpid
	 * @return
	 */
	public int queryCountByStatus(
			@Param("jobid") Long jobid,
			@Param("experience") Integer experience,
			@Param("edu") Integer edu,
			@Param("status") Integer status,
			@Param("entpid") Long entpid);
	/**
	 * 根据状态和entpid查询数量
	 * @param status
	 * @param entpid
	 * @return
	 */
	public int queryCountByStatusAndEntp(
			@Param("status") Integer status,
			@Param("entpid") Long entpid);
	
	/**
	 * 查询top=1 的记录
	 * @param cvid
	 * @param jobid
	 * @param entpid
	 * @return
	 */
	public Record queryOneByCondition(
			@Param("cvid") Long cvid,
			@Param("jobid") Long jobid,
			@Param("entpid") Long entpid);
	/**
	 * 
	 * @param cvid
	 * @param jobid
	 * @param sendtime
	 * @return
	 */
	public Record queryOneByCondition2(
			@Param("cvid") Long cvid,
			@Param("jobid") Long jobid,
			@Param("sendtime") Timestamp sendtime);
	/**
	 * 根据cvid查询
	 * @param cvid
	 * @return
	 */
	public List<Record> queryListBycvid(@Param("cvid") Long cvid,@Param("status") Integer status);
	
}
