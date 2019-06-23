package com.server.entity;

public class OptTypeEvt<T> {
	private String optType;
	
	private T object;

	public String getOptType() {
		return optType;
	}

	public void setOptType(String optType) {
		this.optType = optType;
	}

	public T getObject() {
		return object;
	}

	public void setObject(T object) {
		this.object = object;
	}

	@Override
	public String toString() {
		return "OptTypeEvt [optType=" + optType + ", object=" + object + "]";
	}

	
	
	

}
