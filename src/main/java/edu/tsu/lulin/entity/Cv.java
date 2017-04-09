package edu.tsu.lulin.entity;

import java.util.Calendar;

import edu.tsu.lulin.enums.Entpnature;

public class Cv {
	private Long cvid;
	private Long cmuserid;
	private String realname;
	private Integer sex;
	private String birthday;
	private String head;
	private Integer height;
	private Double weight;
	private Integer topedu;
	private Integer marry;
	private Integer drivinglicense;
	private Integer experience;
	private String nowaddress;
	private String phone;
	private String email;
	private String usermark;
	private Integer jobnature;
	private String wantaddress;
	private Long positionid;
	private Integer enterprisenature;
	private Long sal;
	private Integer negotiable;
	private String attachment;
	private String entertime;// 入学时间
	private String outertime;// 毕业时间
	private String school;// 学校
	private String major;// 专业
	private String schoolexp;// 在校经历
	private String myself;// 自我评价

	private String eduname;
	private String experiencename;
	private Integer age;
	private String entpnaturename;

	public String getEntpnaturename() {
		if (null != this.enterprisenature) {
			return Entpnature.EIGHT.getName(enterprisenature);
		}
		return null;
	}

	public void setEntpnaturename(String entpnaturename) {
		this.entpnaturename = entpnaturename;
	}

	public String getEntertime() {
		return entertime;
	}

	public void setEntertime(String entertime) {
		this.entertime = entertime;
	}

	public String getOutertime() {
		return outertime;
	}

	public void setOutertime(String outertime) {
		this.outertime = outertime;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getSchoolexp() {
		return schoolexp;
	}

	public void setSchoolexp(String schoolexp) {
		this.schoolexp = schoolexp;
	}

	public String getMyself() {
		return myself;
	}

	public void setMyself(String myself) {
		this.myself = myself;
	}

	public String getEduname() {
		if (null != this.topedu) {
			return edu.tsu.lulin.enums.Edu.EIGHT.getName(topedu);
		}
		return null;
	}

	public void setEduname(String eduname) {
		this.eduname = eduname;
	}

	public String getExperiencename() {
		if (null != this.experience) {
			return edu.tsu.lulin.enums.Experience.EIGHT.getName(experience);
		}
		return null;
	}

	public void setExperiencename(String experiencename) {
		this.experiencename = experiencename;
	}

	public Integer getAge() {
		if (null != this.birthday) {
			return Calendar.getInstance().get(Calendar.YEAR) - Integer.valueOf(this.birthday.substring(0, 4));
		}
		return null;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Long getCvid() {
		return cvid;
	}

	public void setCvid(Long cvid) {
		this.cvid = cvid;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getTopedu() {
		return topedu;
	}

	public void setTopedu(Integer topedu) {
		this.topedu = topedu;
	}

	public Integer getMarry() {
		return marry;
	}

	public void setMarry(Integer marry) {
		this.marry = marry;
	}

	public Integer getDrivinglicense() {
		return drivinglicense;
	}

	public void setDrivinglicense(Integer drivinglicense) {
		this.drivinglicense = drivinglicense;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public String getNowaddress() {
		return nowaddress;
	}

	public void setNowaddress(String nowaddress) {
		this.nowaddress = nowaddress;
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

	public String getUsermark() {
		return usermark;
	}

	public void setUsermark(String usermark) {
		this.usermark = usermark;
	}

	public Integer getJobnature() {
		return jobnature;
	}

	public void setJobnature(Integer jobnature) {
		this.jobnature = jobnature;
	}

	public String getWantaddress() {
		return wantaddress;
	}

	public void setWantaddress(String wantaddress) {
		this.wantaddress = wantaddress;
	}

	public Long getPositionid() {
		return positionid;
	}

	public void setPositionid(Long positionid) {
		this.positionid = positionid;
	}

	public Integer getEnterprisenature() {
		return enterprisenature;
	}

	public void setEnterprisenature(Integer enterprisenature) {
		this.enterprisenature = enterprisenature;
	}

	public Long getSal() {
		return sal;
	}

	public void setSal(Long sal) {
		this.sal = sal;
	}

	public Integer getNegotiable() {
		return negotiable;
	}

	public void setNegotiable(Integer negotiable) {
		this.negotiable = negotiable;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	public Long getCmuserid() {
		return cmuserid;
	}

	public void setCmuserid(Long cmuserid) {
		this.cmuserid = cmuserid;
	}

	@Override
	public String toString() {
		return "Cv [cvid=" + cvid + ", cmuserid=" + cmuserid + ", realname=" + realname + ", sex=" + sex + ", birthday="
				+ birthday + ", head=" + head + ", height=" + height + ", weight=" + weight + ", topedu=" + topedu
				+ ", marry=" + marry + ", drivinglicense=" + drivinglicense + ", experience=" + experience
				+ ", nowaddress=" + nowaddress + ", phone=" + phone + ", email=" + email + ", usermark=" + usermark
				+ ", jobnature=" + jobnature + ", wantaddress=" + wantaddress + ", positionid=" + positionid
				+ ", enterprisenature=" + enterprisenature + ", sal=" + sal + ", negotiable=" + negotiable
				+ ", attachment=" + attachment + "]";
	}

}
