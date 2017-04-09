package edu.tsu.lulin.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Trade;
@Repository("tradeDao")
public interface TradeDao {
	/**
	 * 根据主键查询
	 * @param tradeid
	 * @return
	 */
	public Trade findById(Long tradeid);
	
	/**
	 * 根据行业名称查询
	 * @param tradename
	 * @return
	 */
	public List<Trade> findByName(String tradename);
	
	/**
	 * 根据上级行业id查询
	 * @param parentid
	 * @return
	 */
	public List<Trade> findByParentid(Long parentid);
	
	/**
	 * 根据position是否reference查询trade
	 * @return
	 */
	public List<Trade> findExistRefPosition();
	
	/**
	 * 根据上级行业id和ispn=1查询
	 * @param parentid
	 * @return
	 */
	public List<Trade> findByParentidAndISPN(Long parentid);
	
	/**
	 * 根据上级行业id和ispn=null查询
	 * @param parentid
	 * @return
	 */
	public List<Trade> findByParentidAndNull(Long parentid);
	
	/**
	 * 根据positionid查询行业
	 * @param positionid
	 * @return
	 */
	public Trade findByPositionid(Long positionid);
}
