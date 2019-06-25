package com.server.entity;

public class MoveEvt {
	
	private String id;
	
	private String direction;
	
	private String x;
	
	private String y;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
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

	@Override
	public String toString() {
		return "MoveEvt [id=" + id + ", direction=" + direction + ", x=" + x + ", y=" + y + "]";
	}
	

}
