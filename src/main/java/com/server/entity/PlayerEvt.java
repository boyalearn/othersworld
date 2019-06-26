package com.server.entity;

public class PlayerEvt {
	
	private int id;
	private String x;
	private String y;
	private int angle;
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
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


	public int getAngle() {
		return angle;
	}


	public void setAngle(int angle) {
		this.angle = angle;
	}


	@Override
	public String toString() {
		return "PlayerEvt [id=" + id + ", x=" + x + ", y=" + y + ", angle=" + angle + "]";
	}
	
	
	
}
