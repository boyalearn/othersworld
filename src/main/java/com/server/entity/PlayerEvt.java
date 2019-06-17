package com.server.entity;

public class PlayerEvt {
	
	private int x;
	private int y;
	private int angle;
	
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
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
		return "PlayerEvt [x=" + x + ", y=" + y + ", angle=" + angle + "]";
	}
	
}
