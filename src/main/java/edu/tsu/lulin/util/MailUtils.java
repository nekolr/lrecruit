package edu.tsu.lulin.util;

import java.security.GeneralSecurityException;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class MailUtils {
	public static Session createSession(String host,final String username,final String password) throws GeneralSecurityException{
		Properties prop = new Properties();
		prop.setProperty("mail.smtp.host", host);//指定主机
		prop.setProperty("mail.smtp.auth", "true");//指定验证为true
//		MailSSLSocketFactory sf = new MailSSLSocketFactory();
//		sf.setTrustAllHosts(true);//设置信任所有主机
//		prop.setProperty("mail.smtp.ssl.enable", "true");
//		prop.put("mail.smtp.ssl.socketFactory", sf);
		
		//创建验证器
		Authenticator auth = new Authenticator(){
			public PasswordAuthentication getPasswordAuthentication(){
				return new PasswordAuthentication(username,password);
			}
		};
		//获取session对象
		return Session.getInstance(prop,auth);
	}
	/**
	 * 发送指定邮件
	 * @param session
	 * @param mail
	 * @throws MessagingException 
	 * @throws AddressException 
	 */
	public static void send(Session session,final Mail mail) throws AddressException, MessagingException{
		MimeMessage msg = new MimeMessage(session);//创建邮件对象
		msg.setFrom(new InternetAddress(mail.getFrom()));//设置发件人
		msg.addRecipients(RecipientType.TO, mail.getToAddress());//设置收件人
		
		//设置抄送
		String cc = mail.getCcAddress();
		if(!cc.isEmpty()){
			msg.addRecipients(RecipientType.CC, cc);
		}
		
		//设置主题
		msg.setSubject(mail.getSubject());
		
		MimeMultipart parts = new MimeMultipart();//创建部件集对象
		MimeBodyPart part = new MimeBodyPart();//创建一个部件
		part.setContent(mail.getContent(),"text/html;charset=utf-8");//设置邮件正文
		parts.addBodyPart(part);//将部件添加到部件集中
		
		//设置内容
		msg.setContent(parts);
		
		//发送
		Transport.send(msg);
		
	}
}
