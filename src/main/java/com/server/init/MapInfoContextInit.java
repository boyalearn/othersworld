package com.server.init;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.server.dao.MapInfoDao;
import com.server.entity.GameEvt;
import com.server.socket.WebSocketServer;

@Component
public class MapInfoContextInit implements ApplicationRunner{
	
	Logger logger=LoggerFactory.getLogger(MapInfoContextInit.class);
	
	@Autowired
	MapInfoDao mapInfoDao;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		
		logger.info("初始化gameMap数据,启动参数为{}。",args);
		
		List<GameEvt> list = mapInfoDao.getAllGameEvt();
		for(GameEvt gameEvt:list){
			WebSocketServer.gameMap.put(gameEvt.getId(), gameEvt);
		}
		
	}

}
