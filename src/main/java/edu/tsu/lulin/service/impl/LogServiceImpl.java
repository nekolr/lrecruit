package edu.tsu.lulin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.LogDao;
import edu.tsu.lulin.entity.Log;
import edu.tsu.lulin.service.LogService;

@Service("logService")
public class LogServiceImpl implements LogService {
	@Resource(name = "logDao")
	private LogDao logDao;

	@Override
	public int addLog(Log log) {
		return logDao.addLog(log);
	}

	@Override
	public int deleteLog(Long logid) {
		return logDao.deleteLog(logid);
	}

	@Override
	public List<Log> findAll() {
		return logDao.findAll();
	}

}
