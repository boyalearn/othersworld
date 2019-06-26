package com.server.init;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.server.dao.MapInfoDao;
import com.server.dao.UserInfoDao;
import com.server.entity.GameEvt;
import com.server.entity.PlayerEvt;
import com.server.socket.ServerRunInfo;
import com.server.socket.WebSocketServer;

@Component
public class MapInfoContextInit implements ApplicationRunner{
	
	Logger logger=LoggerFactory.getLogger(MapInfoContextInit.class);
	
	@Autowired
	MapInfoDao mapInfoDao;
	
	@Autowired
	UserInfoDao userInfoDao;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		
		logger.info("初始化gameMap数据,启动参数为{}。",args);
		
		List<GameEvt> list = mapInfoDao.getAllGameEvt();
		for(GameEvt gameEvt:list){
			WebSocketServer.gameMap.put(gameEvt.getId(), gameEvt);
		}
		
		
		ScheduledExecutorService service=Executors.newSingleThreadScheduledExecutor();
		service.scheduleWithFixedDelay(new Runnable(){
			@Override
			public void run() {

				for(String httpSessionId:WebSocketServer.userMap.keySet()){
					
					logger.info("更新用户信息入库id:{},info:{}",httpSessionId,WebSocketServer.userMap.get(httpSessionId));
					PlayerEvt userDbInfo = ServerRunInfo.USERGAMEINFO.get(httpSessionId);
					GameEvt userGameInfo = WebSocketServer.userMap.get(httpSessionId);
					userDbInfo.setX(userGameInfo.getX());
					userDbInfo.setY(userGameInfo.getY());
					userInfoDao.updatePlayerMapInfo(userDbInfo);
				}
			}
			
		}, 2, 2, TimeUnit.SECONDS);
		
	}
	 

}
