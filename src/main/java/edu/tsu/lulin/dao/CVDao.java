package edu.tsu.lulin.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Cv;
@Repository("cvDao")
public interface CVDao {
	
	/**
	 * 更新头像
	 * @param head
	 * @return
	 */
	public int updateHead(@Param("head") String head,@Param("cvid") Long cvid);
	
	
	/**
	 * 根据id查询Cv
	 * @param cvid
	 * @return
	 */
	public Cv findCVById(Long cvid);
	
	/**
	 * 根据cmuserid查询Cv
	 * @param cmuserid
	 * @return
	 */
	public Cv findCVByCmuserid(Long cmuserid);
	
	/**
	 * 创建Cv
	 * @return
	 */
	public int createCV(Cv cv);
	
	/**
	 * 更新cv-基本
	 * @param cv
	 * @return
	 */
	public boolean updateCVbase(Cv cv);
	
	/**
	 * 更新cv-期望
	 * @param cv
	 * @return
	 */
	public boolean updateCVinten(Cv cv);
	
	/**
	 * 更新-教育经历
	 * @param cv
	 * @return
	 */
	public boolean updateCVSchool(Cv cv);
	
	/**
	 * 更新-自我描述
	 * @param cv
	 * @return
	 */
	public boolean updateCVmyself(Cv cv);
}
