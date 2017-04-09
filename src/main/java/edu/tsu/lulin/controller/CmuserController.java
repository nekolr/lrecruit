package edu.tsu.lulin.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import edu.tsu.lulin.annotation.Token;
import edu.tsu.lulin.entity.Cmuser;
import edu.tsu.lulin.entity.Cv;
import edu.tsu.lulin.service.CVService;
import edu.tsu.lulin.service.CmuserService;
import edu.tsu.lulin.util.CommonUtil;
import edu.tsu.lulin.util.VerifyCode;

@Controller("cmuserController")
@RequestMapping("/cmuser")
public class CmuserController {
	private static Logger logger = Logger.getLogger(CmuserController.class);
	private Map<String,Object> resultMap = new HashMap<String,Object>();

	@Resource(name = "cmuserService")
	private CmuserService cmuserService;
	@Resource(name="cvService")
	private CVService cvService;

	@RequestMapping("/login")
	public String login(@RequestParam("cmaccount") String cmaccount, @RequestParam("cmpassword") String cmpassword,
			HttpServletRequest request, ModelMap model) {
		Cmuser user = cmuserService.login(new Cmuser(cmaccount, cmpassword));
		if (user != null) {
			request.getSession().setAttribute("cmaccount", user.getCmaccount());
			request.getSession().setAttribute("cmuserid", user.getCmuserid());
			request.getSession().setAttribute("cmemail", user.getCmemail());
			Cv cv = cvService.findCVByCmuserid(user.getCmuserid());
			if(null!=cv){				
				request.getSession().setAttribute("head", cv.getHead());
			}
			return "index";
		} else {
			model.put("tipMessage", "error");
			return "cmlogin";
		}
	}

	@RequestMapping("/verifycode")
	public @ResponseBody void verifycode(HttpServletRequest request, HttpServletResponse response) {
		VerifyCode vc = new VerifyCode();
		// 获取验证码图片
		BufferedImage image = vc.getImage();
		// 获取图片上的文本
		logger.info(vc.getText());
		request.getSession().setAttribute("verifyCode", vc.getText());
		try {
			VerifyCode.output(image, response.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// @RequestMapping("/loginout")
	// ----------------------BUG-------------------------
	/*
	 * public String logout(HttpServletRequest request){
	 * request.getSession().invalidate(); return "redirect:/index.jsp"; }
	 */
	@RequestMapping("/loginout")
	public ModelAndView logout(HttpServletRequest request) {
		request.getSession().invalidate();
		ModelAndView mv = new ModelAndView("redirect:/");
		return mv;
	}

	@RequestMapping("/regist")
	@Token(remove=true)
	public String regist(Cmuser user, @RequestParam("flag") String flag, ModelMap model, HttpServletRequest request) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(user);
		if (verifyCode.equalsIgnoreCase(user.getVerifycode())) {
			if (flag.equals("0")) {
				user.setCmpassword(user.getOpen_cmpassword());
			}
			user.setUuid(CommonUtil.getUUID());
			Cmuser u = cmuserService.regist(user);
			if (u != null) {
				return "registSuccess";
			} else {
				model.put("tipMessage", "注册失败！");
				return "cmregist";
			}
		} else {
			model.put("tipMessage", "verifyError");
			return "cmregist";
		}

	}

	/**
	 * 传过来与邮箱和验证码
	 * 
	 * @param cmuser
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/checkEmail")
	public String checkEmail(Cmuser cmuser, HttpServletRequest request, ModelMap model) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(verifyCode);
		if (verifyCode.equalsIgnoreCase(cmuser.getVerifycode())) {
			// 验证码正确 发送邮件

			// 1.加载配置文件
			Properties prop = new Properties();
			try {
				prop.load(this.getClass().getClassLoader().getResourceAsStream("email_template.properties"));
			} catch (IOException e) {
				e.printStackTrace();
			}

			String host = prop.getProperty("host");
			String name = prop.getProperty("username");
			String pass = prop.getProperty("password");
			String from = prop.getProperty("from");
			String to = cmuser.getCmemail();
			String subject = prop.getProperty("subject");

			VerifyCode vc = new VerifyCode();
			vc.getImage();// 生成验证码
			request.getSession().setAttribute("verifyCode", vc.getText());
			logger.info(vc.getText());

			String content = MessageFormat.format(prop.getProperty("content"), vc.getText());
			// 2.配置邮件服务器
			JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

			javaMailSender.setHost(host);
			javaMailSender.setUsername(name);
			javaMailSender.setPassword(pass);
			javaMailSender.setDefaultEncoding("UTF-8");

			SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

			simpleMailMessage.setTo(to);
			simpleMailMessage.setFrom(from);
			simpleMailMessage.setSubject(subject);
			simpleMailMessage.setText(content);

			Properties properties = new Properties();
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.timeout", 10000);

			javaMailSender.setJavaMailProperties(properties);

			// 发送邮件
			javaMailSender.send(simpleMailMessage);

			model.put("cmemail", cmuser.getCmemail());
			return "findSuccessEmail";

		} else {
			model.put("tipMessage", "verifyError");
			return "findpwd";
		}
	}

	/**
	 * 传过来验证码和邮箱
	 * 
	 * @param cmuser
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/findpwd")
	public String findPwdStep2(Cmuser cmuser, HttpServletRequest request, ModelMap model) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(verifyCode);
		if (cmuser.getVerifycode().equalsIgnoreCase(verifyCode)) {
			// 判断是否存在该邮箱的账号
			Cmuser user = cmuserService.findCmuserByEmail(cmuser.getCmemail());
			if (user == null) {
				model.put("tipMessage", "不存在该账号！");
				return "cmregist";
			} else {
				// 存在则跳转到修改密码界面
				model.put("uuid", user.getUuid());
				model.put("cmuserid", user.getCmuserid());
				return "findByEmail";
			}
		} else {
			model.put("tipMessage", "验证码错误！");
			return "findSuccessEmail";
		}
	}

	/**
	 * 传过来cmuserid，uuid，新密码和新密码确认
	 * 
	 * @param cmuser
	 * @return
	 */
	@RequestMapping("/resetpwd")
	public String findPwdStep3(Cmuser cmuser, ModelMap model) {
		// 用户直接找到findByEmail.jsp页面提交 判断uuid和cmuserid
		if (cmuser.getCmuserid() != null || !cmuser.getUuid().equals("")) {
			// 验证密码一致
			if (cmuser.getNewpassword().equals(cmuser.getConfnewpassword())) {
				String uuid = cmuserService.findUUIdById(cmuser.getCmuserid().toString());
				// 验证uuid一致
				if (uuid.equals(cmuser.getUuid())) {
					// 执行密码修改操作
					Integer result = cmuserService.updateCmpassword(cmuser);
					logger.info(result);
					if (result > 0) {
						return "findPwdSuccess";
					} else {
						model.put("tipMessage", "修改失败！");
						return "findByEmail";
					}
				} else {
					model.put("tipMessage", "非法的请求！");
					return "findByEmail";
				}
			} else {
				model.put("tipMessage", "密码不一致！");
				return "findByEmail";
			}
		} else {
			return "redirect:/findByEmail.jsp";
		}

	}

	@RequestMapping("/bindemail")
	public @ResponseBody Object bindEmail(Cmuser cmuser, HttpServletRequest request) throws MessagingException {
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		String uuid = cmuserService.findUUIdById(cmuserid.toString());
		
		// 1.加载配置文件
		Properties prop = new Properties();
		try {
			prop.load(this.getClass().getClassLoader().getResourceAsStream("email_html_template.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		String host = prop.getProperty("host");
		String name = prop.getProperty("username");
		String pass = prop.getProperty("password");
		String from = prop.getProperty("from");
		String to = cmuser.getCmemail();
		String subject = prop.getProperty("subject");
		logger.info(host+" "+name+" "+pass+" "+from+" "+to+" "+subject);
		VerifyCode vc = new VerifyCode();
		vc.getImage();// 生成验证码
		request.getSession().setAttribute("verifyCode", vc.getText());
		logger.info(vc.getText());

		String content = MessageFormat.format(prop.getProperty("content"), "cmuser",uuid,"cmemail",to);
		// 2.配置邮件服务器
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

		javaMailSender.setHost(host);
		javaMailSender.setUsername(name);
		javaMailSender.setPassword(pass);
		javaMailSender.setDefaultEncoding("UTF-8");

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(to);
		mimeMessageHelper.setFrom(from);
		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(content,true);//启用html

		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.timeout", 10000);

		javaMailSender.setJavaMailProperties(properties);

		// 发送邮件
		javaMailSender.send(mimeMessage);

		return "success";
	}
	
	@RequestMapping("/binding")
	public String binding(Cmuser cmuser,ModelMap model,HttpServletRequest request){
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		cmuser.setCmuserid(cmuserid);
		
		Integer result = cmuserService.updateCmemailByUUid(cmuser);
		if(result>0){
			request.getSession().setAttribute("cmemail", cmuser.getCmemail());
			
			//绑定完后修改uuid，防止一封邮件无限修改邮箱
			cmuser.setUuid(CommonUtil.getUUID());
			Integer count = cmuserService.updateUUIdById(cmuser);
			logger.info(count);
			return "bindingSuccess";
		}else{
			return "index";
		}
	}
	
	@RequestMapping("/editpwd")
	public @ResponseBody String editPwd(Cmuser cmuser,HttpServletRequest request){
		Long cmuserid = (Long) request.getSession().getAttribute("cmuserid");
		cmuser.setCmuserid(cmuserid);
		Integer result = cmuserService.editPwd(cmuser);
		if(result>0){
			return "success";
		}else{
			return "faild";
		}
	}
	
	/**
	 * 检查账号是否重复
	 * @param cmaccount
	 * @return
	 */
	@RequestMapping("/checkAccount")
	public @ResponseBody Object checkAccount(@RequestParam("cmaccount") String cmaccount){
		Cmuser user = cmuserService.findCmuserByAccount(cmaccount);
		if(null != user){
			resultMap.put("result", "failed");
		}else{
			resultMap.put("result", "success");
		}
		return resultMap;
	}
}
