package edu.tsu.lulin.entity;

public class Cmuser {
	private Long cmuserid;
	private String cmaccount;
	private String cmpassword;
	private String cmemail;

	// 注册表单的字段
	private String verifycode;
	private String open_cmpassword;

	// 修改密码中的新密码
	private String newpassword;
	private String confnewpassword;
	//安全验证的uuid
	private String uuid;
	public Cmuser(){}
	public Cmuser(String cmaccount, String cmpassword) {
		this.cmaccount = cmaccount;
		this.cmpassword = cmpassword;
	}
	
	public String getConfnewpassword() {
		return confnewpassword;
	}
	public void setConfnewpassword(String confnewpassword) {
		this.confnewpassword = confnewpassword;
	}
	public String getOpen_cmpassword() {
		return open_cmpassword;
	}
	public void setOpen_cmpassword(String open_cmpassword) {
		this.open_cmpassword = open_cmpassword;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getVerifycode() {
		return verifycode;
	}

	public void setVerifycode(String verifycode) {
		this.verifycode = verifycode;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public Long getCmuserid() {
		return cmuserid;
	}

	public void setCmuserid(Long cmuserid) {
		this.cmuserid = cmuserid;
	}

	public String getCmaccount() {
		return cmaccount;
	}

	public void setCmaccount(String cmaccount) {
		this.cmaccount = cmaccount;
	}

	public String getCmpassword() {
		return cmpassword;
	}

	public void setCmpassword(String cmpassword) {
		this.cmpassword = cmpassword;
	}

	public String getCmemail() {
		return cmemail;
	}

	public void setCmemail(String cmemail) {
		this.cmemail = cmemail;
	}
	@Override
	public String toString() {
		return "Cmuser [cmuserid=" + cmuserid + ", cmaccount=" + cmaccount + ", cmpassword=" + cmpassword + ", cmemail="
				+ cmemail + ", verifycode=" + verifycode + ", open_cmpassword=" + open_cmpassword + ", newpassword="
				+ newpassword + ", confnewpassword=" + confnewpassword + ", uuid=" + uuid + "]";
	}

}
