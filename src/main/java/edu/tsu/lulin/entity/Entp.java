package edu.tsu.lulin.entity;

public class Entp {
	private Long entpid;
	private Long entpuserid;
	private String entpname;
	private String logo;
	private Long tradeid;
	private Integer entpnature;
	private Integer entpsize;
	private String entpaddress;
	private String detailaddress;
	private String entpmark;

	public Long getEntpuserid() {
		return entpuserid;
	}

	public void setEntpuserid(Long entpuserid) {
		this.entpuserid = entpuserid;
	}

	public Long getEntpid() {
		return entpid;
	}

	public void setEntpid(Long entpid) {
		this.entpid = entpid;
	}

	public String getEntpname() {
		return entpname;
	}

	public void setEntpname(String entpname) {
		this.entpname = entpname;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Long getTradeid() {
		return tradeid;
	}

	public void setTradeid(Long tradeid) {
		this.tradeid = tradeid;
	}

	public Integer getEntpnature() {
		return entpnature;
	}

	public void setEntpnature(Integer entpnature) {
		this.entpnature = entpnature;
	}

	public Integer getEntpsize() {
		return entpsize;
	}

	public void setEntpsize(Integer entpsize) {
		this.entpsize = entpsize;
	}

	public String getEntpaddress() {
		return entpaddress;
	}

	public void setEntpaddress(String entpaddress) {
		this.entpaddress = entpaddress;
	}

	public String getDetailaddress() {
		return detailaddress;
	}

	public void setDetailaddress(String detailaddress) {
		this.detailaddress = detailaddress;
	}

	public String getEntpmark() {
		return entpmark;
	}

	public void setEntpmark(String entpmark) {
		this.entpmark = entpmark;
	}

	@Override
	public String toString() {
		return "Entp [entpid=" + entpid + ", entpuserid=" + entpuserid + ", entpname=" + entpname + ", logo=" + logo
				+ ", tradeid=" + tradeid + ", entpnature=" + entpnature + ", entpsize=" + entpsize + ", entpaddress="
				+ entpaddress + ", detailaddress=" + detailaddress + ", entpmark=" + entpmark + "]";
	}

}
