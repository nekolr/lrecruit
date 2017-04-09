package edu.tsu.lulin.config;

import java.io.IOException;
import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.ibatis.plugin.Interceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;



@Configuration			//声明当前类是一个配置类(替代xml文件的类)
@EnableTransactionManagement
@ComponentScan({"edu.tsu.lulin"})		//配置扫描位置
@MapperScan("edu.tsu.lulin.mapper")
//通过注解读取属性文件，忽略源文件找不到的情况
@PropertySource(value={"classpath:db.properties","classpath:page.properties"},ignoreResourceNotFound=true)
public class DataSourceConfig implements EnvironmentAware{
	
    private Environment env;		//引入环境系统，配合@PropertySource注解，可以直接获取相关数据
    @Resource(name="pageHelper")
    private Interceptor pageHelper;
	@Resource(name="dataSource")
	private DataSource dataSource;
	
	@Bean(name = "dataSource")		//声明该方法返回一个Bean，Bean将放入容器中备用
	public DataSource getTomcatDataSource() {
		try {
			String driverClassName = env.getProperty("driverClassName");
			String url = env.getProperty("url");
			String user = env.getProperty("user");
			String pwd = env.getProperty("pwd");
			String initialSize = env.getProperty("initialSize");
			String maxActive = env.getProperty("maxActive");
			String maxWait = env.getProperty("maxWait");
			String minIdle = env.getProperty("minIdle");
			String validationQuery = env.getProperty("validationQuery");
			String testWhileIdle = env.getProperty("testWhileIdle");
			String timeBetweenEvictionRunsMillis = env.getProperty("timeBetweenEvictionRunsMillis");
			String minEvictableIdleTimeMillis = env.getProperty("minEvictableIdleTimeMillis");
			String testOnBorrow = env.getProperty("testOnBorrow");
			String testOnReturn = env.getProperty("testOnReturn");
			//String poolPreparedStatements = env.getProperty("poolPreparedStatements");
			//String maxPoolPreparedStatementPerConnectionSize = env.getProperty("maxPoolPreparedStatementPerConnectionSize");
			org.apache.tomcat.jdbc.pool.DataSource ds = new org.apache.tomcat.jdbc.pool.DataSource();
			ds.setUrl(url);
			ds.setUsername(user);
			ds.setPassword(pwd);
			ds.setDriverClassName(driverClassName);
			ds.setMaxActive(Integer.parseInt(maxActive));
			ds.setMinIdle(Integer.parseInt(minIdle));
			ds.setInitialSize(Integer.parseInt(initialSize));
			ds.setMaxWait(Integer.parseInt(maxWait));
			ds.setValidationQuery(validationQuery);
			ds.setTestWhileIdle(Boolean.valueOf(testWhileIdle));
			ds.setTimeBetweenEvictionRunsMillis(Integer.valueOf(timeBetweenEvictionRunsMillis));
			ds.setMinEvictableIdleTimeMillis(Integer.valueOf(minEvictableIdleTimeMillis));
			ds.setTestOnBorrow(Boolean.valueOf(testOnBorrow));
			ds.setTestOnReturn(Boolean.valueOf(testOnReturn));
			return ds;
		} catch (Exception e) {
			return null;
		}

	}
	
	/**
	 * mybatis分页插件
	 * @return
	 */
	@Bean(name="pageHelper")
	public Interceptor getPageInterceptor(){
		Interceptor pageInterceptor = new com.github.pagehelper.PageInterceptor();
		Properties prop = new Properties();
		prop.setProperty("helperDialect", env.getProperty("helperDialect"));
		prop.setProperty("reasonable", env.getProperty("reasonable"));
		prop.setProperty("supportMethodsArguments", env.getProperty("supportMethodsArguments"));
		prop.setProperty("params", env.getProperty("params"));
		prop.setProperty("autoRuntimeDialect", env.getProperty("autoRuntimeDialect"));
		pageInterceptor.setProperties(prop);
		return pageInterceptor;
	}
	
	@Bean(name="sqlSessionFactory")
	public SqlSessionFactoryBean getSqlSessionFactory(DataSource dataSource,Interceptor pageHelper){
		ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		sessionFactory.setTypeAliasesPackage("edu.tsu.lulin.entity");	//设置实体别名
		//set plugin pagehelper
		sessionFactory.setPlugins(new Interceptor[]{pageHelper});
		try {
			sessionFactory.setMapperLocations(resourcePatternResolver.getResources("classpath*:edu/tsu/lulin/mapper/*Mapper.xml"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sessionFactory;
	}
	
	@Bean(name="mapperScannerConfigurer")
	public MapperScannerConfigurer getMapperScannerConfigurer(){
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
		mapperScannerConfigurer.setBasePackage("edu.tsu.lulin.dao");
		return mapperScannerConfigurer;
	}


	@Bean
	PlatformTransactionManager transactionManager(DataSource dataSource){
		DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
		transactionManager.setDataSource(dataSource);
		return transactionManager;
	}

	@Override
	public void setEnvironment(Environment environment) {
		this.env = environment;
	}
}
