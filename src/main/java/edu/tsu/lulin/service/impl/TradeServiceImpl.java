package edu.tsu.lulin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import edu.tsu.lulin.dao.TradeDao;
import edu.tsu.lulin.entity.Trade;
import edu.tsu.lulin.service.TradeService;

@Service("tradeService")
public class TradeServiceImpl implements TradeService {
	@Resource(name = "tradeDao")
	private TradeDao tradeDao;

	@Override
	public Trade findById(Long tradeid) {
		return tradeDao.findById(tradeid);
	}

	@Override
	public List<Trade> findByName(String tradename) {
		return tradeDao.findByName(tradename);
	}

	@Override
	public List<Trade> findByParentid(Long parentid) {
		return tradeDao.findByParentid(parentid);
	}

	@Override
	public List<Trade> findExistRefPosition() {
		return tradeDao.findExistRefPosition();
	}

	@Override
	public List<Trade> findByParentidAndISPN(Long parentid) {
		return tradeDao.findByParentidAndISPN(parentid);
	}

	@Override
	public List<Trade> findByParentidAndNull(Long parentid) {
		return tradeDao.findByParentidAndNull(parentid);
	}

	@Override
	public Trade findByPositionid(Long positionid) {
		return tradeDao.findByPositionid(positionid);
	}

}
