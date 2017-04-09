package edu.tsu.lulin.service;

import java.util.List;

import edu.tsu.lulin.entity.Position;

public interface PositionService {
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
