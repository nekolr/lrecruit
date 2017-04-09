package edu.tsu.lulin.service;

import java.util.List;


import edu.tsu.lulin.entity.Log;


public interface LogService {
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
