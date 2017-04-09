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
import edu.tsu.lulin.entity.Entpuser;
import edu.tsu.lulin.service.EntpuserService;
import edu.tsu.lulin.util.CommonUtil;
import edu.tsu.lulin.util.VerifyCode;

@Controller("entpuserController")
@RequestMapping("/entpuser")
public class EntpuserController {
	Logger logger = Logger.getLogger(EntpuserController.class);
	private Map<String,Object> resultMap = new HashMap<String,Object>();
	
	@Resource(name="entpuserService")
	private EntpuserService entpuserService;
	
	/**
	 * 企业用户注销，为了方便使用，注销即清空所有session
	 * @param request
	 * @return
	 */
	@RequestMapping("/loginout")
	public ModelAndView logout(HttpServletRequest request) {
		request.getSession().invalidate();
		ModelAndView mv = new ModelAndView("redirect:/");
		return mv;
	}
	
	/**
	 * 生成验证码，图像放到response的输出流中，验证码文字放入session中
	 * @param request
	 * @param response
	 */
	@RequestMapping("/verifycode")
	public @ResponseBody void verifycode(HttpServletRequest request,HttpServletResponse response){
		VerifyCode vc = new VerifyCode();
		BufferedImage image = vc.getImage();
		logger.info(vc.getText());
		request.getSession().setAttribute("verifyCode", vc.getText());
		try {
			VerifyCode.output(image, response.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 企业用户注册，
	 * @param user
	 * @param flag
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/regist")
	@Token(remove=true)
	public String regist(Entpuser user, @RequestParam("flag") String flag, ModelMap model, HttpServletRequest request) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(user);
		if (verifyCode.equalsIgnoreCase(user.getVerifycode())) {
			if (flag.equals("0")) {
				user.setEntppassword(user.getOpen_cmpassword());
			}
			user.setUuid(CommonUtil.getUUID());
			Entpuser u = entpuserService.regist(user);
			if (u != null) {
				return "registSuccess_entp";
			} else {
				model.put("tipMessage", "注册失败！");
				return "qyregist";
			}
		} else {
			model.put("tipMessage", "verifyError");
			return "qyregist";
		}

	}
	/**
	 * 企业用户登录
	 * @param entpaccount
	 * @param entppassword
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/login")
	public String login(@RequestParam("entpaccount") String entpaccount, @RequestParam("entppassword") String entppassword,
			HttpServletRequest request, ModelMap model) {
		Entpuser user = entpuserService.login(new Entpuser(entpaccount, entppassword));
		if (user != null) {
			request.getSession().setAttribute("entpaccount", user.getEntpaccount());
			request.getSession().setAttribute("entpuserid", user.getEntpuserid());
			request.getSession().setAttribute("entpemail", user.getEntpemail());
			return "index";
		} else {
			model.put("tipMessage", "error");
			return "qylogin";
		}
	}
	/**
	 * 检查账号是否重复
	 * @param entpaccount
	 * @return
	 */
	@RequestMapping("/checkAccount")
	public @ResponseBody Object checkAccount(@RequestParam("entpaccount") String entpaccount){
		Entpuser user = entpuserService.findEntpuserByAccount(entpaccount);
		if(null != user){
			resultMap.put("result", "failed");
		}else{
			resultMap.put("result", "success");
		}
		return resultMap;
	}
	/**
	 * 修改密码
	 * @param entpuser
	 * @param request
	 * @return
	 */
	@RequestMapping("/editpwd")
	public @ResponseBody String editPwd(Entpuser entpuser,HttpServletRequest request){
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		entpuser.setEntpuserid(entpuserid);
		Integer result = entpuserService.editPwd(entpuser);
		if(result>0){
			return "success";
		}else{
			return "faild";
		}
	}
	
	/**
	 * 绑定邮箱
	 * @param entpuser
	 * @param request
	 * @return
	 * @throws MessagingException
	 */
	@RequestMapping("/bindemail")
	public @ResponseBody Object bindEmail(Entpuser entpuser, HttpServletRequest request) throws MessagingException {
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		String uuid = entpuserService.findUUIdById(entpuserid.toString());
		
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
		String to = entpuser.getEntpemail();
		String subject = prop.getProperty("subject");
		logger.info(host+" "+name+" "+pass+" "+from+" "+to+" "+subject);
		VerifyCode vc = new VerifyCode();
		vc.getImage();// 生成验证码
		request.getSession().setAttribute("verifyCode", vc.getText());
		logger.info(vc.getText());

		String content = MessageFormat.format(prop.getProperty("content"), "entpuser",uuid,"entpemail",to);
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
	
	/**
	 * 比较uuid，绑定或更新邮箱
	 * @param entpuser
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/binding")
	public String binding(Entpuser entpuser,ModelMap model,HttpServletRequest request){
		Long entpuserid = (Long) request.getSession().getAttribute("entpuserid");
		entpuser.setEntpuserid(entpuserid);
		
		Integer result = entpuserService.updateEntpemailByUUid(entpuser);
		if(result>0){
			request.getSession().setAttribute("entpemail", entpuser.getEntpemail());
			
			//绑定完后修改uuid，防止一封邮件无限修改邮箱
			entpuser.setUuid(CommonUtil.getUUID());
			Integer count = entpuserService.updateUUIdById(entpuser);
			logger.info(count);
			return "bindingSuccess";
		}else{
			return "index";
		}
	}
	
	/**
	 * 传过来与邮箱和验证码
	 * 
	 * @param entpuser
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/checkEmail")
	public String checkEmail(Entpuser entpuser, HttpServletRequest request, ModelMap model) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(verifyCode);
		if (verifyCode.equalsIgnoreCase(entpuser.getVerifycode())) {
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
			String to = entpuser.getEntpemail();
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

			model.put("entpemail", entpuser.getEntpemail());
			return "findSuccessEmail_entp";

		} else {
			model.put("tipMessage", "verifyError");
			return "findpwd_entp";
		}
	}
	
	/**
	 * 传过来验证码和邮箱
	 * 
	 * @param entpuser
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/findpwd")
	public String findPwdStep2(Entpuser entpuser, HttpServletRequest request, ModelMap model) {
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		logger.info(verifyCode);
		if (entpuser.getVerifycode().equalsIgnoreCase(verifyCode)) {
			// 判断是否存在该邮箱的账号
			Entpuser user = entpuserService.findEntpuserByEmail(entpuser.getEntpemail());
			if (user == null) {
				model.put("tipMessage", "不存在该账号！");
				return "cmregist";
			} else {
				// 存在则跳转到修改密码界面
				model.put("uuid", user.getUuid());
				model.put("entpuserid", user.getEntpuserid());
				return "findByEmail_entp";
			}
		} else {
			model.put("tipMessage", "验证码错误！");
			return "findSuccessEmail_entp";
		}
	}
	
	/**
	 * 传过来entpuserid，uuid，新密码和新密码确认
	 * 
	 * @param entpuser
	 * @return
	 */
	@RequestMapping("/resetpwd")
	public String findPwdStep3(Entpuser entpuser, ModelMap model) {
		// 用户直接找到findByEmail.jsp页面提交 判断uuid和cmuserid
		if (entpuser.getEntpuserid() != null || !entpuser.getUuid().equals("")) {
			// 验证密码一致
			if (entpuser.getNewpassword().equals(entpuser.getConfnewpassword())) {
				String uuid = entpuserService.findUUIdById(entpuser.getEntpuserid().toString());
				// 验证uuid一致
				if (uuid.equals(entpuser.getUuid())) {
					// 执行密码修改操作
					Integer result = entpuserService.updateEntppassword(entpuser);
					logger.info(result);
					if (result > 0) {
						return "findPwdSuccess";
					} else {
						model.put("tipMessage", "修改失败！");
						return "findByEmail_entp";
					}
				} else {
					model.put("tipMessage", "非法的请求！");
					return "findByEmail_entp";
				}
			} else {
				model.put("tipMessage", "密码不一致！");
				return "findByEmail_entp";
			}
		} else {
			return "redirect:/findByEmail.jsp";
		}

	}
}
