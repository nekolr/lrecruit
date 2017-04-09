package edu.tsu.lulin.enums;

public enum Edu {
	ONE("博士",1),
	TWO("EMBA",2),
	THREE("MBA",3),
	FOUR("硕士",4),
	FIVE("本科",5),
	SIX("大专",6),
	SEVEN("高职",7),
	EIGHT("高中",8),
	NINE("职高",9),
	TEN("中专",10),
	ELEVEN("中职",11),
	TWELVE("中技",12),
	THIRTEEN("初中",13),
	FOURTEEN("其他",14);
	
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

	Edu(String name,Integer value){
		this.name = name;
		this.value = value;
	}
}
