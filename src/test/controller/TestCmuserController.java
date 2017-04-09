package controller;

import javax.annotation.Resource;

import edu.tsu.lulin.controller.CmuserController;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.ui.ModelMap;

import edu.tsu.lulin.config.DataSourceConfig;
import edu.tsu.lulin.config.MvcConfig;
import edu.tsu.lulin.config.WebInitializer;
import edu.tsu.lulin.entity.Cmuser;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes={DataSourceConfig.class,MvcConfig.class,WebInitializer.class})
public class TestCmuserController extends AbstractJUnit4SpringContextTests{
	private static Logger logger = Logger.getLogger(TestCmuserController.class);
	
	@Resource(name="cmuserController")
	private CmuserController cmuserController;
	
	private MockHttpServletRequest request;
	private MockHttpServletResponse response;
	
	@Before
	public void before(){
		request = new MockHttpServletRequest();
		request.setCharacterEncoding("utf-8");
		response = new MockHttpServletResponse();
		request.setMethod("post");
	}
	
	public void testLogin(){
		ModelMap model = new ModelMap();
		String path = cmuserController.login("lulin", "lulin5645", request, model);
		String cmaccount = (String) request.getSession().getAttribute("cmaccount");
		logger.info("HttpSession中保存的账号名为："+cmaccount);
		logger.info("返回的逻辑视图名为："+path);
	}

	public void testLogout(){
		cmuserController.logout(request);
		String cmaccount = (String) request.getSession().getAttribute("cmaccount");
		logger.info("注销后的账号名为：："+cmaccount);
	}
	
	public void testRegist(){
		
		//falg=1 表示密文密码 0 表示明文密码
		Cmuser user = new Cmuser();
		user.setCmaccount("excalibur");
		user.setCmpassword("excalibur");
		//获取验证码
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(verifyCode);
		user.setVerifycode(verifyCode);
		String flag = "1";
		ModelMap model = new ModelMap();
		String path = cmuserController.regist(user, flag, model, request);
		logger.info("返回的逻辑视图名为："+path);
	}
	
}
