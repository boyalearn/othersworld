package com.server.entity;

import java.io.Serializable;

public class LoginEvt implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8029174246779755304L;

	private String httpSessionId;

	private String state;

	public String getHttpSessionId() {
		return httpSessionId;
	}

	public void setHttpSessionId(String httpSessionId) {
		this.httpSessionId = httpSessionId;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "LoginEvt [httpSessionId=" + httpSessionId + ", state=" + state + "]";
	}

}
