package edu.tsu.lulin.enums;

public enum Experience {
	ONE("在读生",1),
	TWO("应届毕业生",2),
	THREE("1年",3),
	FOUR("2年",4),
	FIVE("3年",5),
	SIX("4年",6),
	SEVEN("5年",7),
	EIGHT("6年",8),
	NINE("8年",9),
	TEN("10年以上",10);
	
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

	Experience(String name,Integer value){
		this.name = name;
		this.value = value;
	}
}
