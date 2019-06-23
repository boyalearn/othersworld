package com.server.entity;

public class GameEvt {
	
	private String id;
	
	private String x;
	
	private String y;
	
	private String type;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "GameEvt [id=" + id + ", x=" + x + ", y=" + y + ", type=" + type + "]";
	}
	
}
