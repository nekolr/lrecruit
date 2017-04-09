package util;

import java.util.Properties;

import org.junit.Test;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class TestSpringMail {
	@Test
	public void sendTextMail(){
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		
		javaMailSender.setHost("smtp.163.com");
		javaMailSender.setUsername("18864838367@163.com");
		javaMailSender.setPassword("lulin564581279");
		javaMailSender.setDefaultEncoding("UTF-8");
		
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		
		simpleMailMessage.setTo("564581279@qq.com");
		simpleMailMessage.setFrom("18864838367@163.com");
		simpleMailMessage.setSubject("你好");
		simpleMailMessage.setText("你好啊");
		
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.timeout", 10000);
		
		javaMailSender.setJavaMailProperties(properties);
		
		javaMailSender.send(simpleMailMessage);
		
	}
}
