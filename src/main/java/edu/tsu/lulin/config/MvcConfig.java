package edu.tsu.lulin.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import edu.tsu.lulin.interceptor.TokenInterceptor;

@Configuration
@EnableWebMvc // 开启MVC注解功能
@EnableAspectJAutoProxy  //开启aspectJ的自动代理功能
@ComponentScan("edu.tsu.lulin")
public class MvcConfig extends WebMvcConfigurerAdapter{

	// 静态资源映射
	// addResourceHandler()方法指定url，该url后连接静态文件，对应着addResourceLoaction()方法目录所对应的静态文件
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/html/**").addResourceLocations("/html/");
//		registry.addResourceHandler("/**").addResourceLocations("/");
		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/images/**").addResourceLocations("/images/");
		registry.addResourceHandler("/js/**").addResourceLocations("/js/");
		registry.addResourceHandler("/laydate/**").addResourceLocations("/laydate/");
		registry.addResourceHandler("/laypage-v1.3/**").addResourceLocations("/laypage-v1.3/");
	}
	/*
	 * 防止表单重复提交拦截器
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		TokenInterceptor tokenInterceptor = new TokenInterceptor();
		registry.addInterceptor(tokenInterceptor).addPathPatterns("/**");
	}
	/**
	 * 配置org.springframework.web.multipart.commons.CommonsMultipartResolver 来处理文件上传
	 * 这个类是用的commons-fileupload进行文件上传，不走Servlet的api
	 * @return
	 */
//	@Bean(name="multipartResolver")
//	public CommonsMultipartResolver getResolver(){
//		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
//		resolver.setMaxUploadSize(1048576l);//1024B*1024=1M
//		return resolver;
//	}
	
	//org.springframework.web.multipart.support.StandardServletMultipartResolver
	@Bean(name="multipartResolver")
	public StandardServletMultipartResolver getResolver(){
		StandardServletMultipartResolver resolver = new StandardServletMultipartResolver();
		return resolver;
	}
	

	@Bean // 声明视图解析器，在返回逻辑视图名后拼装物理视图名
	public UrlBasedViewResolver getViewResolver() {
		UrlBasedViewResolver resolver = new UrlBasedViewResolver();
		resolver.setPrefix("/");
		resolver.setSuffix(".jsp");
		resolver.setViewClass(JstlView.class);
		return resolver;
	}
}
