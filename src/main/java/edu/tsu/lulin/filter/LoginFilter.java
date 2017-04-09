package edu.tsu.lulin.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/*
 * 过滤器的先后顺序与过滤器名字的字典顺序有关
 */
@WebFilter(filterName = "LoginFilter", urlPatterns = { "/jsps/*" ,"/cmuser/*","/entpuser/*"})
// initParams = {@WebInitParam(name = "path", value = "Login") })
public class LoginFilter implements Filter {
	// 不用过滤的Controller
	// private String path;
	private static Logger logger = Logger.getLogger(LoginFilter.class);
	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// path = null;
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;

		HttpSession session = request.getSession();
		String[] str = request.getRequestURI().split("/");
		logger.info("filter:"+str[3]);
		if (session.getAttribute("cmaccount") != null || session.getAttribute("entpaccount")!=null) {
			chain.doFilter(request, response);
		} else if(str[3].equals("login")){
			chain.doFilter(request, response);
		}else if(str[3].equals("verifycode")){
			chain.doFilter(request, response);
		}else if(str[3].equals("checkEmail")){
			chain.doFilter(request, response);
		}else if(str[3].equals("findpwd")){
			chain.doFilter(request, response);
		}else if(str[3].equals("resetpwd")){
			chain.doFilter(request, response);
		}else if(str[3].equals("binding")){
			chain.doFilter(request, response);
		}else if(str[3].equals("regist")){
			chain.doFilter(request, response);
		}else if(str[3].equals("checkAccount")){
			chain.doFilter(request, response);
		}else {
			if (str[3].equals("cm")) {
				request.getRequestDispatcher("/cmlogin.jsp").forward(request, response);
				return;
			} else if (str[3].equals("entp")) {
				request.getRequestDispatcher("/qylogin.jsp").forward(request, response);
				return;
			}else{
				response.sendRedirect(request.getContextPath());
				return;
			}
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig config) throws ServletException {
		// path = config.getInitParameter("path");
	}

}
