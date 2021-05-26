package com.server.entity.user;

import java.io.Serializable;

public class LoginInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8029174246779755304L;

	private String id;

	private String state;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}
