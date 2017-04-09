package edu.tsu.lulin.service;







import java.sql.Timestamp;


import edu.tsu.lulin.entity.Pagger;
import edu.tsu.lulin.entity.Record;

public interface RecordService {
	/**
	 * 添加一个
	 * @param record
	 * @return
	 */
	public boolean addOne(Record record);
	
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
	public boolean updateOne(Record record);
	
	/**
	 * 条件查询
	 * @param jobid
	 * @param experience
	 * @param edu
	 * @param status
	 * @return
	 */
	public Pagger<Record> queryListByConditionPaging(Long jobid,Integer experience,Integer edu,Integer status,Long entpid,Integer pageNum,Integer pageSize);
	
	/**
	 * 根据状态查询
	 * @param status
	 * @param entpid
	 * @return
	 */
	public int queryCountByStatus(Long jobid,Integer experience,Integer edu,Integer status,Long entpid);
	
	/**
	 * 根据状态和entpid查询数量
	 * @param status
	 * @param entpid
	 * @return
	 */
	public int queryCountByStatusAndEntp(Integer status,Long entpid);
	
	/**
	 * 查询top=1 的记录
	 * @param cvid
	 * @param jobid
	 * @param entpid
	 * @return
	 */
	public Record queryOneByCondition(Long cvid,Long jobid,Long entpid);
	
	/**
	 * 
	 * @param cvid
	 * @param jobid
	 * @param sendtime
	 * @return
	 */
	public Record queryOneByCondition2(Long cvid,Long jobid,Timestamp sendtime);
	
	/**
	 * 根据cvid查询
	 * @param cvid
	 * @return
	 */
	public Pagger<Record> queryListBycvidPaging(Long cvid,Integer status,Integer pageNum,Integer pageSize);
}
