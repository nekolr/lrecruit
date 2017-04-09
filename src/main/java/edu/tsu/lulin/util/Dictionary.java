package edu.tsu.lulin.util;

public class Dictionary {
	public static Dictionary JOB_STATUS_0 = new Dictionary(null,"job.status","未审核","0");
	public static Dictionary JOB_STATUS_1 = new Dictionary(null,"job.status","已发布","1");
	public static Dictionary JOB_STATUS_2 = new Dictionary(null,"job.status","已下线","2");
	
	
	public static Dictionary RECORD_STATUS_0 = new Dictionary(null,"record.status","投递失败","0");
	public static Dictionary RECORD_STATUS_1 = new Dictionary(null,"record.status","投递成功","1");//即未查看
	public static Dictionary RECORD_STATUS_2 = new Dictionary(null,"record.status","已查看","2");
	public static Dictionary RECORD_STATUS_3 = new Dictionary(null,"record.status","感兴趣","3");
	public static Dictionary RECORD_STATUS_7 = new Dictionary(null,"record.status","已发送面试邀请","7");
	public static Dictionary RECORD_STATUS_4 = new Dictionary(null,"record.status","已面试","4");
	public static Dictionary RECORD_STATUS_5 = new Dictionary(null,"record.status","已录取","5");
	public static Dictionary RECORD_STATUS_6 = new Dictionary(null,"record.status","不合适","6");
	/*
	 * 字段
	 */
	private String id;// 编号
	private String catalog;// 标志
	private String name;// 字典名
	private String code;// 字典编码

	public Dictionary() {
		super();
	}

	public Dictionary(String id, String catalog, String name, String code) {
		super();
		this.id = id;
		this.catalog = catalog;
		this.name = name;
		this.code = code;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCatalog() {
		return catalog;
	}

	public void setCatalog(String catalog) {
		this.catalog = catalog;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
