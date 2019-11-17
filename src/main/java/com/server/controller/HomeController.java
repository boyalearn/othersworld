package com.server.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.dao.UserInfoDao;
import com.server.entity.LoginEvt;
import com.server.entity.PlayerEvt;
import com.server.entity.UserEvt;
import com.server.socket.ServerRunInfo;

@RestController
public class HomeController {

	@Autowired
	private UserInfoDao userInfoDao;

	@RequestMapping("doLogin")
	@ResponseBody
	public LoginEvt doLogin(HttpServletRequest request, UserEvt user) {
		String httpSessionId=request.getSession().getId();
		LoginEvt loginEvt=new LoginEvt();
		loginEvt.setHttpSessionId(httpSessionId);
		if (StringUtils.isEmpty(user.getAccount())) {
			loginEvt.setState("N");
			return loginEvt;
		}
		PlayerEvt dbUser = userInfoDao.getPlayerEvtByAccount(user.getAccount());
		if (null == dbUser) {
			userInfoDao.addPlayerInfo(user);
			dbUser = userInfoDao.getPlayerEvtByAccount(user.getAccount());
		}
		PlayerEvt current = new PlayerEvt();
		current.setId(dbUser.getId());
		PlayerEvt playerMap = userInfoDao.getPlayerMapInfo(current);
		if (null == playerMap) {
			current.setX("0");
			current.setY("0");
			userInfoDao.addPlayerMapInfo(current);
			dbUser.setX("0");
			dbUser.setY("0");
		}
		ServerRunInfo.USERGAMEINFO.put(httpSessionId, dbUser);
		loginEvt.setState("Y");
		return loginEvt;

	}
}
