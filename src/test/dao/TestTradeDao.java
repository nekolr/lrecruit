package dao;

import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import edu.tsu.lulin.dao.TradeDao;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import edu.tsu.lulin.config.DataSourceConfig;
import edu.tsu.lulin.config.MvcConfig;
import edu.tsu.lulin.config.WebInitializer;
import edu.tsu.lulin.entity.Trade;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestTradeDao extends AbstractJUnit4SpringContextTests{
	@Resource
	private TradeDao tradeDao;
	private static Logger logger = Logger.getLogger(TestTradeDao.class);
	

	public void testFindById(){
		Trade trade = tradeDao.findById(2l);
		logger.info(trade);
	}
	
	public void testFindByName(){
		List<Trade> tradeList = tradeDao.findByName("旅游");
		for(Trade trade : tradeList){
			logger.info(trade);
		}
	}
	
	@Test
	public void testFindByParentid(){
		List<Trade> tradeList = tradeDao.findByParentid(2l);
		for (Iterator<Trade> iterator = tradeList.iterator(); iterator.hasNext();) {
			Trade trade = (Trade) iterator.next();
			logger.info(trade);
		}
	}
}
