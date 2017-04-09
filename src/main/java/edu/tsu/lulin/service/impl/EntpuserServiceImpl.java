package edu.tsu.lulin.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.EntpuserDao;
import edu.tsu.lulin.entity.Entpuser;
import edu.tsu.lulin.service.EntpuserService;

@Service("entpuserService")
public class EntpuserServiceImpl implements EntpuserService{
	@Resource
	private EntpuserDao entpuserDao;
	@Override
	public Entpuser login(Entpuser user) {
		return entpuserDao.login(user);
	}

	@Override
	public Entpuser regist(Entpuser user) {
		Integer result = entpuserDao.regist(user);
		if(result>0){
			return user;
		}else{
			return null;
		}
	}

	@Override
	public Entpuser findEntpuserByEmail(String entpemail) {
		return entpuserDao.findEntpuserByEmail(entpemail);
	}

	@Override
	public String findUUIdById(String entpuserid) {
		return entpuserDao.findUUIdById(entpuserid);
	}

	@Override
	public Integer updateEntppassword(Entpuser entpuser) {
		return entpuserDao.updateEntppassword(entpuser);
	}

	@Override
	public Integer updateEntpemailByUUid(Entpuser entpuser) {
		return entpuserDao.updateEntpemailByUUid(entpuser);
	}

	@Override
	public Integer updateUUIdById(Entpuser entpuser) {
		return entpuserDao.updateUUIdById(entpuser);
	}

	@Override
	public Integer editPwd(Entpuser entpuser) {
		return entpuserDao.editPwd(entpuser);
	}

	@Override
	public Entpuser findEntpuserByAccount(String entpaccount) {
		return entpuserDao.findEntpuserByAccount(entpaccount);
	}

}
