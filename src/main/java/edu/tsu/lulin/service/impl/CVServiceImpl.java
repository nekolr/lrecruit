package edu.tsu.lulin.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.CVDao;
import edu.tsu.lulin.entity.Cv;
import edu.tsu.lulin.service.CVService;

@Service("cvService")
public class CVServiceImpl implements CVService {
	@Resource(name = "cvDao")
	private CVDao cvDao;

	@Override
	public boolean updateHead(String head, Long cvid) {
		return cvDao.updateHead(head, cvid) > 0;
	}

	@Override
	public Cv findCVById(Long cvid) {
		return cvDao.findCVById(cvid);
	}

	@Override
	public Cv findCVByCmuserid(Long cmuserid) {
		return cvDao.findCVByCmuserid(cmuserid);
	}

	@Override
	public boolean createCV(Cv cv) {
		return cvDao.createCV(cv)>0;
	}

	@Override
	public boolean updateCVbase(Cv cv) {
		return cvDao.updateCVbase(cv);
	}

	@Override
	public boolean updateCVinten(Cv cv) {
		return cvDao.updateCVinten(cv);
	}

	@Override
	public boolean updateCVSchool(Cv cv) {
		return cvDao.updateCVSchool(cv);
	}

	@Override
	public boolean updateCVmyself(Cv cv) {
		return cvDao.updateCVmyself(cv);
	}

}
