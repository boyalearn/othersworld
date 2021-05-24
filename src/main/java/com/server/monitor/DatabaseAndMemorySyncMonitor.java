package com.server.monitor;

import com.server.container.GameMemoryContainer;
import com.server.dao.SceneMapInfoDao;
import com.server.dao.UserInfoDao;
import com.server.entity.GameModel;
import com.server.entity.Player;
import com.server.entity.PlayerPosition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class DatabaseAndMemorySyncMonitor implements ApplicationRunner {

    private final static Logger LOGGER = LoggerFactory.getLogger(DatabaseAndMemorySyncMonitor.class);

    private SceneMapInfoDao mapInfoDao;

    private UserInfoDao userInfoDao;

    public DatabaseAndMemorySyncMonitor(SceneMapInfoDao sceneMapInfoDao, UserInfoDao userInfoDao) {
        this.mapInfoDao = sceneMapInfoDao;
        this.userInfoDao = userInfoDao;
    }

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        LOGGER.info("初始化gameMap数据,启动参数为{}。", applicationArguments);
        loadSceneMapInfo();
        startScheduledUpdateModelToDatabase();
    }

    private void loadSceneMapInfo() {
        List<GameModel> list = mapInfoDao.findAllGameModel();
        for (GameModel gameEvt : list) {
            GameMemoryContainer.GAME_SCENE_MAP.put(gameEvt.getId(), gameEvt);
        }
    }

    private void startScheduledUpdateModelToDatabase() {
        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        service.scheduleWithFixedDelay(() -> {
            for (String httpSessionId : GameMemoryContainer.GAME_PLAYER_MAP.keySet()) {
                Player player = GameMemoryContainer.GAME_PLAYER_MAP.get(httpSessionId);
                PlayerPosition position = new PlayerPosition();
                position.setUserId(player.getId());
                position.setX(player.getMove().getX());
                position.setY(player.getMove().getY());
                userInfoDao.updatePlayerPositionInfo(position);
            }
        }, 2, 2, TimeUnit.SECONDS);
    }
}
