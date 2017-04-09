package dao;

import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import edu.tsu.lulin.dao.JobDao;
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
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.util.Dictionary;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestJobDao extends AbstractJUnit4SpringContextTests{
	@Resource(name="jobDao")
	private JobDao jobDao;
	private static Logger logger = Logger.getLogger(TestJobDao.class);
	
	@Test
	public void testFindByNum(){
		List<Job> jobList = jobDao.findByNum(3,13l,Integer.valueOf(Dictionary.JOB_STATUS_1.getCode()));
		for (Iterator<Job> iterator = jobList.iterator(); iterator.hasNext();) {
			Job job = (Job) iterator.next();
			logger.info(job);
		}
	}
}
