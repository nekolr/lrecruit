package edu.tsu.lulin.entity;

import java.util.List;

public class Trade {
	private Long tradeid;
	private String tradename;
	private Long parentid;

	private List<Trade> sons;// 儿子节点

	public Long getTradeid() {
		return tradeid;
	}

	public void setTradeid(Long tradeid) {
		this.tradeid = tradeid;
	}

	public String getTradename() {
		return tradename;
	}

	public void setTradename(String tradename) {
		this.tradename = tradename;
	}

	public Long getParentid() {
		return parentid;
	}

	public void setParentid(Long parentid) {
		this.parentid = parentid;
	}

	public List<Trade> getSons() {
		return sons;
	}

	public void setSons(List<Trade> sons) {
		this.sons = sons;
	}

	@Override
	public String toString() {
		return "Trade [tradeid=" + tradeid + ", tradename=" + tradename + ", parentid=" + parentid + ", sons=" + sons
				+ "]";
	}

}
