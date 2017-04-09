package edu.tsu.lulin.enums;

public enum Entpnature {
	ONE("外商独资",1),
	TWO("合资",2),
	THREE("上市公司",3),
	FOUR("国企",4),
	FIVE("国家机关",5),
	SIX("事业单位",6),
	SEVEN("民企/私企",7),
	EIGHT("代表处",8),
	NINE("非赢利组织",9),
	TEN("股份制",10),
	NINETYNINE("其他",99);
	
	private String name;
	private Integer value;
	
	public String getName() {
		return name;
	}
	
	public String getName(Integer value){
		for(int i = 0;i<values().length;i++){
			if(value==values()[i].getValue()){
				return values()[i].name;
			}
		}
		return null;
	}
	

	public Integer getValue() {
		return value;
	}


	Entpnature(String name,Integer value){
		this.name = name;
		this.value = value;
	}
}
