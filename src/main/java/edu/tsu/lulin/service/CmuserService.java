package edu.tsu.lulin.service;



import edu.tsu.lulin.entity.Cmuser;



public interface CmuserService {
	/**
	 * 普通用户登录
	 * @param user
	 * @return 成功返回Cmuser实体，失败返回null
	 */
	public Cmuser login(Cmuser user);
	/**
	 * 普通用户注册
	 * @param user
	 * @return 成功返回Cmuser实体，失败返回null
	 */
	public Cmuser regist(Cmuser user);
	
	/**
	 * 根据邮箱查找用户id
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
	 * 修改密码
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
