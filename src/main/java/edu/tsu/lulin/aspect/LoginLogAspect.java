package edu.tsu.lulin.aspect;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import edu.tsu.lulin.entity.Log;
import edu.tsu.lulin.service.LogService;
import edu.tsu.lulin.util.CommonUtil;

/**
 * 登录日志切面
 * 
 * @author excalibll
 *
 */
@Component
@Aspect
public class LoginLogAspect {
	private HttpServletRequest request;
	@Resource(name = "logService")
	private LogService logService;

	@After("execution(* edu.tsu.lulin.controller.CmuserController.login(..))")
	public void afterCmuser(JoinPoint joinPoint) {
		RequestAttributes ras = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sras = (ServletRequestAttributes) ras;
		request = sras.getRequest();
		String cmaccount = (String) request.getSession().getAttribute("cmaccount");
		Log log = new Log();
		log.setAccount(cmaccount);
		log.setIp(CommonUtil.getIpAddr(request));
		log.setLogintime(new Date());
		logService.addLog(log);
	}

	@After("execution(* edu.tsu.lulin.controller.EntpuserController.login(..))")
	public void afterEntpuser(JoinPoint joinPoint) {
		RequestAttributes ras = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sras = (ServletRequestAttributes) ras;
		request = sras.getRequest();
		String entpaccount = (String) request.getSession().getAttribute("entpaccount");
		Log log = new Log();
		log.setAccount(entpaccount);
		log.setIp(CommonUtil.getIpAddr(request));
		log.setLogintime(new Date());
		logService.addLog(log);
	}

}
