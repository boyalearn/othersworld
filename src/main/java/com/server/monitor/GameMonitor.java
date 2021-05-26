package com.server.monitor;

import com.server.container.GameMemoryContainer;
import com.server.dao.SceneMapInfoDao;
import com.server.entity.play.Cmd;
import com.server.entity.play.CmdType;
import com.server.entity.play.GameModeType;
import com.server.entity.play.GameModel;
import com.server.entity.play.Move;
import com.server.entity.play.Player;
import com.server.exception.UserNotFoundException;
import com.server.socket.WebSocketServer;
import com.server.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class GameMonitor {

    @Autowired
    private SceneMapInfoDao sceneMapInfoDao;

    @PostConstruct
    public void init() {
        GameMemoryContainer.setMONITOR(this);
    }


    public void loadSession(WebSocketServer connection) throws IOException {
        Player player = GameMemoryContainer.GAME_PLAYER_MAP.get(connection.getHttpSessionId());
        if (null == player) {
            throw new UserNotFoundException("user not found exception");
        }
        GameModel model = new GameModel();
        model.setId(connection.getHttpSessionId());
        model.setX(player.getMove().getX());
        model.setY(player.getMove().getY());
        model.setType(GameModeType.PLAYER);
        Cmd cmd = new Cmd();
        cmd.setCmd(CmdType.LOAD_SESSION);
        cmd.setData(model);
        connection.unicast(JSONUtil.objectToJson(cmd));
    }

    /**
     * @param connection
     * @throws IOException
     * @step 1 找到当前登录的游戏角色 触发LOAD_SESSION表示有新的玩家登录。LOAD_SESSION是为了通知其他玩家
     * @step 2 将可视范围的对象下发到客户端。用于渲染地图对象
     */
    public void initGameResource(WebSocketServer connection) throws IOException {
        Map<String, GameModel> scene = new HashMap();
        Cmd<Map<String, GameModel>> cmd = new Cmd();
        cmd.setCmd(CmdType.LOAD_RESOURCE);
        cmd.setData(scene);
        //step 1
        GameMemoryContainer.GAME_PLAYER_MAP.forEach((key, player) -> {
            GameModel model = new GameModel();
            model.setId(key);
            model.setX(player.getMove().getX());
            model.setY(player.getMove().getY());
            model.setType(GameModeType.PLAYER);
            scene.put(key, model);
        });
        //step 2
        GameMemoryContainer.GAME_SCENE_MAP.forEach((key, model) -> {
            scene.put(key, model);
        });
        connection.broadcast(JSONUtil.objectToJson(cmd));
    }

    public void removeUser(WebSocketServer connection) {
        GameMemoryContainer.GAME_PLAYER_MAP.remove(connection.getHttpSessionId());
        GameModel model = new GameModel();
        model.setId(connection.getHttpSessionId());
        Cmd<GameModel> cmd = new Cmd();
        cmd.setData(model);
        cmd.setCmd(CmdType.REMOVE_ROLE);
        connection.broadcast(JSONUtil.objectToJson(cmd));
    }

    public void changeRole(WebSocketServer connection, Move move) {
        move.setId(connection.getHttpSessionId());
        Cmd<Move> result = new Cmd();
        result.setData(move);
        result.setCmd(CmdType.CHANGE_ROLE);
        connection.broadcast(JSONUtil.objectToJson(result));
        Player player = GameMemoryContainer.GAME_PLAYER_MAP.get(connection.getHttpSessionId());
        player.getMove().setX(move.getX());
        player.getMove().setY(move.getY());
        player.getMove().setDirection(move.getDirection());
    }

    public void createModel(WebSocketServer connection, GameModel model) {
        sceneMapInfoDao.addGameModel(model);
        if (null != model.getId()) {
            GameMemoryContainer.GAME_SCENE_MAP.put(model.getId(), model);
            Cmd<Object> result = new Cmd();
            result.setData(GameMemoryContainer.GAME_SCENE_MAP);
            result.setCmd(CmdType.LOAD_RESOURCE);
            connection.broadcast(JSONUtil.objectToJson(result));
        }

    }
}
