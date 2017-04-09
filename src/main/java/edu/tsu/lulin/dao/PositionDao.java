package edu.tsu.lulin.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.tsu.lulin.entity.Position;


@Repository("positionDao")
public interface PositionDao {
	/**
	 * 根据行业编号查询position
	 * @return
	 */
	public List<Position> findPositionsByTradeid(Long tradeid);
	
	/**
	 * 根据id查询Position
	 * @param positionid
	 * @return
	 */
	public Position findById(Long positionid);
}
