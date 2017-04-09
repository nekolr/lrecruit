package edu.tsu.lulin.config;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
//实现WebApplicationinitializer的类都可以在web应用程序启动时被加载
public class WebInitializer implements WebApplicationInitializer {
	
//	@Bean(name="multipartConfigElement")
//	public MultipartConfigElement getMultipartConfigElement(){
//		final MultipartConfigFactory factory = new MultipartConfigFactory();
//		factory.setMaxFileSize(5242880);//5m
//		factory.setMaxRequestSize(20971520);
//		return factory.createMultipartConfig();
//	}
	
    public void onStartup(ServletContext servletContext) throws ServletException {
        //该类可以注册配置文件类
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        //注册DataSourceConfig类和MvcConfig类
        ctx.register(DataSourceConfig.class,MvcConfig.class);
        ctx.setServletContext(servletContext);
        
        //创建一个Servlet
        Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));
        servlet.addMapping("/"); 
        servlet.setMultipartConfig(new MultipartConfigElement(null,5242880,5242880,20971520));
        servlet.setLoadOnStartup(1);
    }  
}
