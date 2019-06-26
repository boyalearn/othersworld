package com.server.socket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import com.server.entity.PlayerEvt;

public class ServerRunInfo {
	public static final Map<String,PlayerEvt> USERGAMEINFO=new ConcurrentHashMap<String,PlayerEvt>();
}
