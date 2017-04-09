package edu.tsu.lulin.entity;

import edu.tsu.lulin.enums.Edu;
import edu.tsu.lulin.enums.Experience;

public class Job {
	private Long jobid;
	private Long entpid;
	private String deptname;// 所属部门
	private Long positionid;// 职位id
	private String jobname;
	private Integer jobnature;// 工作性质
	private Long minsal;
	private Long maxsal;
	private Integer experience;// 工作经验
	private Integer edu;// 学历
	private String address;// 工作地址
	private String mark;// 工作介绍
	private String contact;// 联系人
	private String phone;
	private String email;
	private Integer status;// 状态标识
	private String posttime;// 发布时间

	private String tradename;// 行业名称
	private String entpname;// 企业名称
	private String eduname;// 学历名称
	private String entpsize;// 企业规模
	private String entpnature;// 企业性质
	private String experiencename;//经验名称
	
	public String getExperiencename() {
		if(null!=this.experience){
			return Experience.EIGHT.getName(experience);			
		}
		return null;
	}

	public void setExperiencename(String experiencename) {
		this.experiencename = experiencename;
	}

	public Long getEntpid() {
		return entpid;
	}

	public void setEntpid(Long entpid) {
		this.entpid = entpid;
	}

	public String getDeptname() {
		return deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	public Long getJobid() {
		return jobid;
	}

	public void setJobid(Long jobid) {
		this.jobid = jobid;
	}

	public Long getPositionid() {
		return positionid;
	}

	public void setPositionid(Long positionid) {
		this.positionid = positionid;
	}

	public String getJobname() {
		return jobname;
	}

	public void setJobname(String jobname) {
		this.jobname = jobname;
	}

	public Integer getJobnature() {
		return jobnature;
	}

	public void setJobnature(Integer jobnature) {
		this.jobnature = jobnature;
	}

	public Long getMinsal() {
		return minsal;
	}

	public void setMinsal(Long minsal) {
		this.minsal = minsal;
	}

	public Long getMaxsal() {
		return maxsal;
	}

	public void setMaxsal(Long maxsal) {
		this.maxsal = maxsal;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public Integer getEdu() {
		return edu;
	}

	public void setEdu(Integer edu) {
		this.edu = edu;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getPosttime() {
		return posttime;
	}

	public void setPosttime(String posttime) {
		this.posttime = posttime;
	}

	public String getTradename() {
		return tradename;
	}

	public void setTradename(String tradename) {
		this.tradename = tradename;
	}

	public String getEntpname() {
		return entpname;
	}

	public void setEntpname(String entpname) {
		this.entpname = entpname;
	}

	public String getEduname() {
		if(null!=this.edu){
			return Edu.EIGHT.getName(edu);
		}
		return null;
	}

	public void setEduname(String eduname) {
		this.eduname = eduname;
	}

	public String getEntpsize() {
		return entpsize;
	}

	public void setEntpsize(String entpsize) {
		this.entpsize = entpsize;
	}

	public String getEntpnature() {
		return entpnature;
	}

	public void setEntpnature(String entpnature) {
		this.entpnature = entpnature;
	}

	@Override
	public String toString() {
		return "Job [jobid=" + jobid + ", entpid=" + entpid + ", deptname=" + deptname + ", positionid=" + positionid
				+ ", jobname=" + jobname + ", jobnature=" + jobnature + ", minsal=" + minsal + ", maxsal=" + maxsal
				+ ", experience=" + experience + ", edu=" + edu + ", address=" + address + ", mark=" + mark
				+ ", contact=" + contact + ", phone=" + phone + ", email=" + email + ", status=" + status
				+ ", posttime=" + posttime + ", tradename=" + tradename + ", entpname=" + entpname + ", eduname="
				+ eduname + ", entpsize=" + entpsize + ", entpnature=" + entpnature + "]";
	}

}
