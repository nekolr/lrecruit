package edu.tsu.lulin.dao;

import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Entpuser;


@Repository("entpuserDao")
public interface EntpuserDao {
	/**
	 * 用户登录，根据用户名和密码登录
	 * @param user
	 * @return 找到用户返回Entpuser实体，否则实体为空
	 */
	public Entpuser login(Entpuser user);
	
	/**
	 * 用户注册，输入用户名，密码和验证码
	 * @param user
	 * @return 注册成功返回影响行数1，否则为0
	 */
	public Integer regist(Entpuser user);
	
	/**
	 * 根据邮箱查询用户
	 * @param entpemail
	 * @return
	 */
	public Entpuser findEntpuserByEmail(String entpemail);
	
	/**
	 * 通过id查询uuid
	 * @param entpuserid
	 * @return
	 */
	public String findUUIdById(String entpuserid);
	
	/**
	 * 修改密码 需要entpuserid，uuid，新密码和新密码确认
	 * @param entpuser
	 * @return
	 */
	public Integer updateEntppassword(Entpuser entpuser);
	
	/**
	 * 根据uuid查找entpuser，并修改邮箱
	 * @param entpuser
	 * @return
	 */
	public Integer updateEntpemailByUUid(Entpuser entpuser);
	
	/**
	 * 根据根据entpuserid修改uuid
	 * @param entpuser
	 * @return
	 */
	public Integer updateUUIdById(Entpuser entpuser);
	
	/**
	 * 根据entpuserid修改密码
	 * @param entpuser
	 * @return
	 */
	public Integer editPwd(Entpuser entpuser);
	
	/**
	 * 根据账户名查询用户(用于查重)
	 * @param entpaccount
	 * @return
	 */
	public Entpuser findEntpuserByAccount(String entpaccount);
}
