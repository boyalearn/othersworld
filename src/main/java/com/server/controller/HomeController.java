package com.server.controller;

import com.server.container.GameMemoryContainer;
import com.server.dao.UserInfoDao;
import com.server.entity.RespResult;
import com.server.entity.play.Move;
import com.server.entity.play.Player;
import com.server.entity.play.PlayerPosition;
import com.server.entity.user.LoginInfo;
import com.server.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class HomeController {

    private final static String SUCCESS = "Y";

    private final static String FAIL = "N";

    @Autowired
    private UserInfoDao userInfoDao;

    @RequestMapping("login")
    public RespResult<LoginInfo> doLogin(HttpServletRequest request, User loginUser) {
        String httpSessionId = request.getSession().getId();
        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setId(httpSessionId);
        if (StringUtils.isEmpty(loginUser.getAccount())) {
            loginInfo.setState(FAIL);
            return RespResult.build(loginInfo);
        }

        User user = userInfoDao.getPlayerByAccount(loginUser.getAccount());
        if (null == user) {
            loginInfo.setState(FAIL);
            return RespResult.build(loginInfo);
        }

        if (!checkPassword(loginUser.getPassword(), user.getPassword())) {
            loginInfo.setState(FAIL);
            return RespResult.build(loginInfo);
        }

        initCurrentUserGameInfo(user, httpSessionId);
        loginInfo.setState(SUCCESS);
        return RespResult.build(loginInfo);

    }

    @RequestMapping("register")
    public RespResult<String> register(User loginUser) {
        String password = DigestUtils.md5DigestAsHex(loginUser.getPassword().getBytes());
        loginUser.setPassword(password);
        userInfoDao.addPlayerInfo(loginUser);
        return RespResult.build(SUCCESS);
    }

    private boolean checkPassword(String source, String encode) {
        return DigestUtils.md5DigestAsHex(source.getBytes()).equals(encode);
    }

    private void initCurrentUserGameInfo(User user, String httpSessionId) {
        Player current = new Player();
        current.setId(user.getId());
        PlayerPosition position = new PlayerPosition();
        position.setUserId(user.getId());
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
    }
}
