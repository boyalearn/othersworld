package com.server.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.dao.UserInfoDao;
import com.server.entity.PlayerEvt;
import com.server.entity.UserEvt;
import com.server.socket.ServerRunInfo;

@RestController
public class HomeController {
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	@RequestMapping("doLogin")
	public String doLogin(HttpServletRequest request,UserEvt user){
		if(StringUtils.isEmpty(user.getAccount())){
			return "N";
		}
		PlayerEvt dbUser = userInfoDao.getPlayerEvtByAccount(user.getAccount());
		if(null==dbUser){
		    userInfoDao.addPlayerInfo(user);
		    dbUser=userInfoDao.getPlayerEvtByAccount(user.getAccount());
		}
		String httpSessionId=request.getSession().getId();
		PlayerEvt current=new PlayerEvt();
		current.setId(dbUser.getId());
		PlayerEvt playerMap = userInfoDao.getPlayerMapInfo(current);
		if(null==playerMap){
			current.setX("0");
			current.setY("0");
			userInfoDao.addPlayerMapInfo(current);
			dbUser.setX("0");
			dbUser.setY("0");
		}
		ServerRunInfo.USERGAMEINFO.put(httpSessionId, dbUser);
		
		return "Y";
		
	}
}
