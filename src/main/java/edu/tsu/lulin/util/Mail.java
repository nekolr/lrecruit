package edu.tsu.lulin.util;

/**
 * 邮件类，设置账号名和密码、收件人、抄送(可选)、主题、内容
 * setSubject()、setContent()，设置主题和正文
 * setFrom()、addToAddress()设置发件人，添加收件人
 * @author excalibll
 *
 */
public class Mail {
	private String from;//发件人
	private StringBuilder toAddress = new StringBuilder();//收件人
	private StringBuilder ccAddress = new StringBuilder();//抄送人
	
	private String subject;//主题
	private String content;//正文
	public Mail() {}
	
	public Mail(String from,String to){
		this(from,to,null,null);
	}
	
	public Mail(String from,String to,String subject,String content){
		this.from = from;
		this.toAddress.append(to);
		this.subject = subject;
		this.content = content;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getToAddress() {
		return toAddress.toString();
	}
	/**
	 * 添加收件人
	 * @param to
	 */
	public void addToAddress(String to) {
		if(this.toAddress.length()>0){
			this.toAddress.append(",");
		}
		this.toAddress.append(to);
	}

	public String getCcAddress() {
		return ccAddress.toString();
	}
	/**
	 * 添加抄送人
	 * @param cc
	 */
	public void addCcAddress(String cc) {
		if(this.ccAddress.length()>0){
			this.ccAddress.append(",");
		}
		this.ccAddress.append(cc);
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
}
