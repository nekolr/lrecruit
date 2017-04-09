package edu.tsu.lulin.entity;

import java.util.Date;

public class Log {
	private Long logid;
	private String account;
	private String ip;
	private Date logintime;
	private Date logoutime;

	public Long getLogid() {
		return logid;
	}

	public void setLogid(Long logid) {
		this.logid = logid;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Date getLogintime() {
		return logintime;
	}

	public void setLogintime(Date logintime) {
		this.logintime = logintime;
	}

	public Date getLogoutime() {
		return logoutime;
	}

	public void setLogoutime(Date logoutime) {
		this.logoutime = logoutime;
	}

	@Override
	public String toString() {
		return "Log [logid=" + logid + ", account=" + account + ", ip=" + ip + ", logintime=" + logintime
				+ ", logoutime=" + logoutime + "]";
	}

}
