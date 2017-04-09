package dao;

import javax.annotation.Resource;

import edu.tsu.lulin.dao.CmuserDao;
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
import edu.tsu.lulin.entity.Cmuser;


@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestCmuserDao extends AbstractJUnit4SpringContextTests{
	private static Logger logger = Logger.getLogger(TestCmuserDao.class);
	@Resource(name="cmuserDao")
	private CmuserDao cmuserDao;
	
	/**
	 * 测试登录功能
	 */
	public void testLogin(){
		Cmuser user = new Cmuser();
		user.setCmaccount("lulin");
		user.setCmpassword("lulin");
		Cmuser u = cmuserDao.login(user);
		logger.info(u);
	}
	/**
	 * 测试注册功能
	 */
	public void testRegist(){
		Cmuser user = new Cmuser();
		user.setCmaccount("excalibur");
		user.setCmpassword("excalibur");
		user.setCmemail("564581279@163.com");
		Integer result = cmuserDao.regist(user);
		logger.info(result);
	}
	/**
	 * 测试根据email查询cmuser
	 */
	public void testFindCmuserByEmail(){
		Cmuser cmuser = cmuserDao.findCmuserByEmail("excalibll@163.com");
		logger.info(cmuser);
	}

	/**
	 * 测试根据cmuserid查找uuid
	 */
	public void testFindUUIdById(){	
		String uuid = cmuserDao.findUUIdById("77");
		logger.info(uuid);
	}
	/**
	 * 测试更新密码操作
	 */
	@Test
	public void testUpdateCmpassword(){
		Cmuser user = new Cmuser();
		user.setCmuserid(77L);
		user.setUuid("a7e6e3cb-f788-4c64-8170-4c0798f85d1b");//必须提供uuid，保证安全性
		user.setNewpassword("lulin5645");
		user.setConfnewpassword("lulin5645");
		Integer result = cmuserDao.updateCmpassword(user);
		logger.info(result);
	}
}
