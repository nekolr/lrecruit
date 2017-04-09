package edu.tsu.lulin.entity;

public class Entpuser {
	private Long entpuserid;
	private String entpaccount;
	private String entppassword;
	private String entpemail;

	// 注册表单的字段
	private String verifycode;
	private String open_cmpassword;

	// 修改密码中的新密码
	private String newpassword;
	private String confnewpassword;
	// 安全验证的uuid
	private String uuid;

	public Entpuser() {
	}

	public Entpuser(String entpaccount, String entppassword) {
		this.entpaccount = entpaccount;
		this.entppassword = entppassword;
	}

	public Long getEntpuserid() {
		return entpuserid;
	}

	public void setEntpuserid(Long entpuserid) {
		this.entpuserid = entpuserid;
	}

	public String getEntpaccount() {
		return entpaccount;
	}

	public void setEntpaccount(String entpaccount) {
		this.entpaccount = entpaccount;
	}

	public String getEntppassword() {
		return entppassword;
	}

	public void setEntppassword(String entppassword) {
		this.entppassword = entppassword;
	}

	public String getEntpemail() {
		return entpemail;
	}

	public void setEntpemail(String entpemail) {
		this.entpemail = entpemail;
	}

	public String getVerifycode() {
		return verifycode;
	}

	public void setVerifycode(String verifycode) {
		this.verifycode = verifycode;
	}

	public String getOpen_cmpassword() {
		return open_cmpassword;
	}

	public void setOpen_cmpassword(String open_cmpassword) {
		this.open_cmpassword = open_cmpassword;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public String getConfnewpassword() {
		return confnewpassword;
	}

	public void setConfnewpassword(String confnewpassword) {
		this.confnewpassword = confnewpassword;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	@Override
	public String toString() {
		return "Entpuser [entpuserid=" + entpuserid + ", entpaccount=" + entpaccount + ", entppassword=" + entppassword
				+ ", entpemail=" + entpemail + ", verifycode=" + verifycode + ", open_cmpassword=" + open_cmpassword
				+ ", newpassword=" + newpassword + ", confnewpassword=" + confnewpassword + ", uuid=" + uuid + "]";
	}

}
