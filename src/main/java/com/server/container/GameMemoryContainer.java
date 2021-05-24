package com.server.container;

import com.server.entity.GameModel;
import com.server.entity.Player;
import com.server.monitor.GameMonitor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class GameMemoryContainer {

    /**
     * 游戏监听控制器
     */
    private static GameMonitor MONITOR;

    /**
     * 游戏场景相关的内存容器
     */
    public final static Map<String, GameModel> GAME_SCENE_MAP = new ConcurrentHashMap<String, GameModel>(2000);

    /**
     * 用户保存当前在线玩家数据
     */
    public final static Map<String, Player> GAME_PLAYER_MAP = new ConcurrentHashMap(2000);


    public static void setMONITOR(GameMonitor monitor) {
        MONITOR = monitor;
    }

    public static GameMonitor findGameMonitor() {
        return MONITOR;
    }

}
