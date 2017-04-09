package edu.tsu.lulin.interceptor;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import edu.tsu.lulin.annotation.Token;
import edu.tsu.lulin.util.CommonUtil;
/**
 * 重复提交检查拦截器
 * 在带有Token注解的方法运行之前，根据注解来执行session的处理以及是否放行
 * @author excal
 *
 */
public class TokenInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger.getLogger(TokenInterceptor.class);
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Method method = handlerMethod.getMethod();
		Token annotation = method.getAnnotation(Token.class);
		if (null != annotation) {
			boolean needSaveSession = annotation.save();
			if (needSaveSession) {
				request.getSession(false).setAttribute("token", CommonUtil.getUUID());
			}
			boolean needRemoveSession = annotation.remove();
			if (needRemoveSession) {
				if (isRepeatSubmit(request)) {
					logger.info("TokenInterceptor:请勿重复提交表单");
					return false;
				}
				request.getSession(false).removeAttribute("token");
			}
			return true;
		} else {
			return super.preHandle(request, response, handler);
		}
	}

	private boolean isRepeatSubmit(HttpServletRequest request) {
		String serverToken = (String) request.getSession().getAttribute("token");
		if (null == serverToken) {
			return true;
		}
		String clientToken = request.getParameter("token");
		if (null == clientToken) {
			return true;
		}
		if (!serverToken.equals(clientToken)) {
			return true;
		}
		return false;
	}
}
