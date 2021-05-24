package com.server.init;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.server.dao.SceneMapInfoDao;
import com.server.dao.UserInfoDao;

@Component
public class MapInfoContextInit implements ApplicationRunner {

	private final static Logger LOGGER = LoggerFactory.getLogger(MapInfoContextInit.class);

	@Autowired
    SceneMapInfoDao mapInfoDao;

	@Autowired
	UserInfoDao userInfoDao;

	@Override
	public void run(ApplicationArguments args) throws Exception {



	}

}
