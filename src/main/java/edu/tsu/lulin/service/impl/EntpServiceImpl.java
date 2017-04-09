package edu.tsu.lulin.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.EntpDao;
import edu.tsu.lulin.entity.Entp;
import edu.tsu.lulin.service.EntpService;

@Service(value = "entpService")
public class EntpServiceImpl implements EntpService {
	@Resource(name = "entpDao")
	private EntpDao entpDao;

	@Override
	public boolean addEntp(Entp entp) {
		return entpDao.addEntp(entp) > 0;
	}

	@Override
	public boolean updateEntp(Entp entp) {
		return entpDao.updateEntp(entp) > 0;
	}

	@Override
	public Entp findEntpByEntpuserid(String entpuserid) {
		return entpDao.findEntpByEntpuserid(entpuserid);
	}

	@Override
	public Entp findById(Long entpid) {
		return entpDao.findById(entpid);
	}

}
