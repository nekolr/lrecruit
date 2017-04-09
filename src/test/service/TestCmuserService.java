package service;

import javax.annotation.Resource;

import edu.tsu.lulin.service.CmuserService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import edu.tsu.lulin.config.DataSourceConfig;
import edu.tsu.lulin.config.MvcConfig;
import edu.tsu.lulin.config.WebInitializer;
import edu.tsu.lulin.entity.Cmuser;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes={DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestCmuserService extends AbstractTransactionalJUnit4SpringContextTests{
	private Logger logger = Logger.getLogger(TestCmuserService.class);
	@Resource(name="cmuserService")
	private CmuserService cmuserService;
	
	/**
	 * 测试登录功能
	 */
	public void testLogin(){
		Cmuser user = new Cmuser("lulin","lulin");
		Cmuser cmuser = cmuserService.login(user);
		logger.info(cmuser);
	}
	/**
	 * 测试注册功能
	 */
	@Rollback(false)
	public void testRegist(){
		Cmuser user = new Cmuser();
		user.setCmaccount("exe");
		user.setCmpassword("exe");
		user.setCmemail("564581279@163.com");
		Cmuser cmuser = cmuserService.regist(user);
		logger.info(cmuser);
	}
	/**
	 * 测试根据email查询cmuser
	 */
	public void testFindCmuserByEmail(){
		Cmuser cmuser = cmuserService.findCmuserByEmail("excalibll@163.com");
		logger.info(cmuser);
	}

	/**
	 * 测试根据cmuserid查找uuid
	 */
	public void testFindUUIdById(){	
		String uuid = cmuserService.findUUIdById("77");
		logger.info(uuid);
	}
	/**
	 * 测试更新密码操作
	 */
	@Test
	@Rollback(false)
	public void testUpdateCmpassword(){
		Cmuser user = new Cmuser();
		user.setCmuserid(77L);
		user.setUuid("a7e6e3cb-f788-4c64-8170-4c0798f85d1b");//必须提供uuid，保证安全性
		user.setNewpassword("lulin");
		user.setConfnewpassword("lulin");
		Integer result = cmuserService.updateCmpassword(user);
		logger.info(result);
	}
}
