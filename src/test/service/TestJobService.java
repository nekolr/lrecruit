package service;


import javax.annotation.Resource;

import edu.tsu.lulin.service.JobService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import edu.tsu.lulin.config.DataSourceConfig;
import edu.tsu.lulin.config.MvcConfig;
import edu.tsu.lulin.config.WebInitializer;
import edu.tsu.lulin.entity.Job;
import edu.tsu.lulin.entity.Pagger;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes={DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestJobService extends AbstractTransactionalJUnit4SpringContextTests{
	private static Logger logger = Logger.getLogger(TestJobService.class);
	@Resource(name="jobService")
	private JobService jobService;
	@Test
	public void testFindByConditionPaging(){
		Job job = new Job();
		job.setEdu(-1);
		job.setExperience(-1);
		job.setMinsal(3000l);
		job.setMaxsal(7000l);
		Pagger<Job> pagger = jobService.findByConditionPaging(job, -1l, -1, 1,3);
		logger.info("查询出个数为："+pagger.getDataList().size());
	}
}
