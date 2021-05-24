package com.server.monitor;

import com.server.entity.Cmd;
import com.server.entity.CmdType;
import com.server.entity.GameModel;
import com.server.entity.GameModeType;
import com.server.entity.Move;
import com.server.entity.Player;
import com.server.container.GameMemoryContainer;
import com.server.socket.WebSocketServer;
import com.server.util.JSONUtil;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;

@Service
public class GameMonitor {


    @PostConstruct
    public void init() {
        GameMemoryContainer.setMONITOR(this);
    }

    /**
     * @param connection
     * @throws IOException
     * @step 1 找到当前登录的游戏角色 触发LOAD_SESSION表示有新的玩家登录。LOAD_SESSION是为了通知其他玩家
     * @step 2 将可视范围的对象下发到客户端。用于渲染地图对象
     */
    public void initGameResource(WebSocketServer connection) throws IOException {
        //step 1
        Cmd<GameModel> cmd = new Cmd();
        GameModel gameEvt = new GameModel();
        gameEvt.setId(connection.getHttpSessionId());
        gameEvt.setType(GameModeType.PLAYER);
        Player player = GameMemoryContainer.GAME_PLAYER_MAP.get(connection.getHttpSessionId());
        GameModel curGameModel = new GameModel();
        curGameModel.setId(connection.getHttpSessionId());
        if (null == player) {
            return;
        }
        curGameModel.setX(player.getMove().getX());
        curGameModel.setY(player.getMove().getY());
        cmd.setData(curGameModel);
        cmd.setCmd(CmdType.LOAD_SESSION);
        connection.unicast(JSONUtil.objectToJson(cmd));

        //step 2
        Cmd<Map<String, GameModel>> mapCmd = new Cmd();
        mapCmd.setData(GameMemoryContainer.GAME_SCENE_MAP);
        mapCmd.setCmd(CmdType.LOAD_MAP);
        connection.broadcast(JSONUtil.objectToJson(mapCmd));
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

    public void loadScene(WebSocketServer connection) throws IOException {
        Cmd<Map<String, GameModel>> result = new Cmd();
        result.setData(GameMemoryContainer.GAME_SCENE_MAP);
        result.setCmd(CmdType.LOAD_MAP);
        connection.unicast(JSONUtil.objectToJson(result));
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
}
