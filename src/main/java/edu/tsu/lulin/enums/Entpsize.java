package edu.tsu.lulin.enums;

public enum Entpsize {
	ONE("20人以下",1),
	TWO("21-50人",2),
	THREE("51-100人",3),
	FOUR("101-300人",4),
	FIVE("301-500人",5),
	SIX("500人以上",6);
	
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

	Entpsize(String name,Integer value){
		this.name = name;
		this.value = value;
	}
}
