package edu.tsu.lulin.service;

import edu.tsu.lulin.entity.Entp;

public interface EntpService {
	/**
	 * 添加企业
	 * @param entp
	 * @return
	 */
	public boolean addEntp(Entp entp);
	
	/**
	 * 修改企业
	 * @param entp
	 * @return
	 */
	public boolean updateEntp(Entp entp);
	
	/**
	 * 根据企业用户id查询该用户的企业
	 * @param entpuserid
	 * @return
	 */
	public Entp findEntpByEntpuserid(String entpuserid);
	
	/**
	 * 根据id查询Entp
	 * @param entpid
	 * @return
	 */
	public Entp findById(Long entpid);
}
