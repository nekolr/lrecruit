package edu.tsu.lulin.entity;

import java.sql.Timestamp;

public class Record {
	private Long recordid;
	private Long cvid;
	private Long entpid;
	private Long jobid;
	private Timestamp sendtime;
	private Timestamp changetime;//操作时间
	private Integer status;
	
	private Cv cv;
	private String jobname;
	private Job job;
	
	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Timestamp getChangetime() {
		return changetime;
	}

	public void setChangetime(Timestamp changetime) {
		this.changetime = changetime;
	}

	public Long getRecordid() {
		return recordid;
	}

	public void setRecordid(Long recordid) {
		this.recordid = recordid;
	}

	public Long getCvid() {
		return cvid;
	}

	public void setCvid(Long cvid) {
		this.cvid = cvid;
	}

	public Long getEntpid() {
		return entpid;
	}

	public void setEntpid(Long entpid) {
		this.entpid = entpid;
	}

	public Long getJobid() {
		return jobid;
	}

	public void setJobid(Long jobid) {
		this.jobid = jobid;
	}

	public Timestamp getSendtime() {
		return sendtime;
	}

	public void setSendtime(Timestamp sendtime) {
		this.sendtime = sendtime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Cv getCv() {
		return cv;
	}

	public void setCv(Cv cv) {
		this.cv = cv;
	}

	public String getJobname() {
		return jobname;
	}

	public void setJobname(String jobname) {
		this.jobname = jobname;
	}

	@Override
	public String toString() {
		return "Record [recordid=" + recordid + ", cvid=" + cvid + ", entpid=" + entpid + ", jobid=" + jobid
				+ ", sendtime=" + sendtime + ", status=" + status + "]";
	}

}
