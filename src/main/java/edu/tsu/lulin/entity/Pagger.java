package edu.tsu.lulin.entity;

import java.util.List;

public class Pagger<T> {
	private Long pageSize;//每页显示多少条记录
	private Long currentPage;//当前页数
	private Long totalRecord;//总记录数
	private Long totalPage;//总页数
	private List<T> dataList;//要显示的数据
	
	
	public Pagger(){}
	public Pagger(Long pageNum,Long pageSize,Long totalRecord,List<T> sourceList) {
		if(sourceList==null || sourceList.isEmpty()){
			return ;
		}
		//总记录数
		this.totalRecord = totalRecord;
		
		//每页显示的记录数
		this.pageSize = pageSize;
		
		//总页数
		this.totalPage = this.totalRecord/this.pageSize;
		if(this.totalRecord%this.pageSize!=0){
			this.totalPage = this.totalPage+1;
		}
		
		//当前是第几页
		this.currentPage = this.totalPage<pageNum?this.totalPage:pageNum;
		this.currentPage = pageNum<1?1:pageNum;
		
		//要显示的数据
		this.dataList = sourceList;
	}
	public Long getPageSize() {
		return pageSize;
	}
	public void setPageSize(Long pageSize) {
		this.pageSize = pageSize;
	}
	public Long getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(Long currentPage) {
		this.currentPage = currentPage;
	}
	public Long getTotalRecord() {
		return totalRecord;
	}
	public void setTotalRecord(Long totalRecord) {
		this.totalRecord = totalRecord;
	}
	public Long getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Long totalPage) {
		this.totalPage = totalPage;
	}
	public List<T> getDataList() {
		return dataList;
	}
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}
	
	
}
