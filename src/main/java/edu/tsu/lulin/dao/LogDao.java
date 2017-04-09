package edu.tsu.lulin.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Log;

@Repository("logDao")
public interface LogDao {
	/**
	 * 添加一条日志
	 * @return
	 */
	public int addLog(Log log);
	
	/**
	 * 删除一条日志
	 * @return
	 */
	public int deleteLog(Long logid);
	
	/**
	 * 查询全部日志
	 * @return
	 */
	public List<Log> findAll();
}
