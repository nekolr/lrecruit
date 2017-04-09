package edu.tsu.lulin.entity;

public class Position {
	private Long positionid;
	private Long tradeid;
	private String positionname;

	public Long getPositionid() {
		return positionid;
	}

	public void setPositionid(Long positionid) {
		this.positionid = positionid;
	}

	public Long getTradeid() {
		return tradeid;
	}

	public void setTradeid(Long tradeid) {
		this.tradeid = tradeid;
	}

	public String getPositionname() {
		return positionname;
	}

	public void setPositionname(String positionname) {
		this.positionname = positionname;
	}

	@Override
	public String toString() {
		return "Position [positionid=" + positionid + ", tradeid=" + tradeid + ", positionname=" + positionname + "]";
	}

}
