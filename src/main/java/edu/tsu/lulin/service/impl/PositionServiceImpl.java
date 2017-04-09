package edu.tsu.lulin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.PositionDao;
import edu.tsu.lulin.entity.Position;
import edu.tsu.lulin.service.PositionService;

@Service("positionService")
public class PositionServiceImpl implements PositionService {
	@Resource(name = "positionDao")
	private PositionDao positionDao;

	@Override
	public List<Position> findPositionsByTradeid(Long tradeid) {
		return positionDao.findPositionsByTradeid(tradeid);
	}

	@Override
	public Position findById(Long positionid) {
		return positionDao.findById(positionid);
	}

}
