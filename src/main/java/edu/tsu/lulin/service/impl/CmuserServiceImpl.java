package edu.tsu.lulin.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import edu.tsu.lulin.dao.CmuserDao;
import edu.tsu.lulin.entity.Cmuser;
import edu.tsu.lulin.service.CmuserService;

@Service("cmuserService")
@Transactional
public class CmuserServiceImpl implements CmuserService {
	@Resource
	private CmuserDao cmuserDao;

	@Override
	public Cmuser login(Cmuser user) {
		return cmuserDao.login(user);
	}

	@Override
	//事务隔离级别：授权读
	//事务传播行为：如果存在一个事务,则支持当前事务;如果没有事务则开启一个
	@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED)
	public Cmuser regist(Cmuser user) {
		int result = cmuserDao.regist(user);
		if (result > 0) {
			return user;
		} else {
			return null;
		}
	}

	@Override
	public Cmuser findCmuserByEmail(String cmemail) {
		return cmuserDao.findCmuserByEmail(cmemail);
	}

	@Override
	public String findUUIdById(String cmuserid) {
		return cmuserDao.findUUIdById(cmuserid);
	}

	@Override
	@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED)
	public Integer updateCmpassword(Cmuser cmuser) {
		if(cmuser.getNewpassword().equals(cmuser.getConfnewpassword())){
			return cmuserDao.updateCmpassword(cmuser);			
		}else{
			return -1;
		}
	}

	@Override
	@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED)
	public Integer updateCmemailByUUid(Cmuser cmuser) {
		return cmuserDao.updateCmemailByUUid(cmuser);
	}

	@Override
	@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED)
	public Integer updateUUIdById(Cmuser cmuser) {
		return cmuserDao.updateUUIdById(cmuser);
	}

	@Override
	@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED)
	public Integer editPwd(Cmuser cmuser) {
		return cmuserDao.editPwd(cmuser);
	}

	@Override
	public Cmuser findCmuserByAccount(String cmaccount) {
		return cmuserDao.findCmuserByAccount(cmaccount);
	}
	
	
}
