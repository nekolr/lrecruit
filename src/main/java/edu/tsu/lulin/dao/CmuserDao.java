package edu.tsu.lulin.dao;

import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Cmuser;

@Repository("cmuserDao")
public interface CmuserDao {
	/**
	 * 用户登录，根据用户名和密码登录
	 * @param user
	 * @return 找到用户返回Cmuser实体，否则实体为空
	 */
	public Cmuser login(Cmuser user);
	
	/**
	 * 用户注册，输入用户名，密码和验证码
	 * @param user
	 * @return 注册成功返回影响行数1，否则为0
	 */
	public Integer regist(Cmuser user);
	
	/**
	 * 根据邮箱查询用户
	 * @param cmemail
	 * @return
	 */
	public Cmuser findCmuserByEmail(String cmemail);
	
	/**
	 * 通过id查询uuid
	 * @param cmuserid
	 * @return
	 */
	public String findUUIdById(String cmuserid);
	
	/**
	 * 修改密码 需要cmuserid，uuid，新密码和新密码确认
	 * @param cmuser
	 * @return
	 */
	public Integer updateCmpassword(Cmuser cmuser);
	
	/**
	 * 根据uuid查找cmuser，并修改邮箱
	 * @param cmuser
	 * @return
	 */
	public Integer updateCmemailByUUid(Cmuser cmuser);
	
	/**
	 * 根据根据cmuserid修改uuid
	 * @param cmuser
	 * @return
	 */
	public Integer updateUUIdById(Cmuser cmuser);
	
	/**
	 * 根据cmuserid修改密码
	 * @param cmuser
	 * @return
	 */
	public Integer editPwd(Cmuser cmuser);
	
	/**
	 * 根据账户名查询用户(用于查重)
	 * @param cmaccount
	 * @return
	 */
	public Cmuser findCmuserByAccount(String cmaccount);
}
