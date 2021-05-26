package com.server.controller;

import com.server.container.GameMemoryContainer;
import com.server.dao.UserInfoDao;
import com.server.entity.LoginInfo;
import com.server.entity.Move;
import com.server.entity.Player;
import com.server.entity.PlayerPosition;
import com.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class HomeController {

    @Autowired
    private UserInfoDao userInfoDao;

    @RequestMapping("doLogin")
    @ResponseBody
    public LoginInfo doLogin(HttpServletRequest request, User user) {
        String httpSessionId = request.getSession().getId();
        LoginInfo loginEvt = new LoginInfo();
        loginEvt.setHttpSessionId(httpSessionId);
        if (StringUtils.isEmpty(user.getAccount())) {
            loginEvt.setState("N");
            return loginEvt;
        }
        User dbUser = userInfoDao.getPlayerByAccount(user.getAccount());
        if (null == dbUser) {
            userInfoDao.addPlayerInfo(user);
            dbUser = userInfoDao.getPlayerByAccount(user.getAccount());
        }
        Player current = new Player();
        current.setId(dbUser.getId());
        PlayerPosition position = new PlayerPosition();
        position.setUserId(dbUser.getId());
        PlayerPosition playerPosition = userInfoDao.findPlayerPositionInfo(position);
        if (null == playerPosition) {
            position.setX("0");
            position.setY("0");
            userInfoDao.addPlayerPositionInfo(position);
            current.setMove(new Move());
            current.getMove().setX("0");
            current.getMove().setY("0");
        } else {
            current.setMove(new Move());
            current.getMove().setX(playerPosition.getX());
            current.getMove().setY(playerPosition.getY());
        }
        GameMemoryContainer.GAME_PLAYER_MAP.put(httpSessionId, current);
        loginEvt.setState("Y");
        return loginEvt;

    }
}
