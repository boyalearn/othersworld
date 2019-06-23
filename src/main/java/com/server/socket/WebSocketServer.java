package com.server.socket;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.server.entity.GameEvt;
import com.server.entity.OptTypeEvt;
import com.server.util.JSONUtil;

@Component
@ServerEndpoint(value="/worldserver",configurator=GetHttpSessionConfigurator.class)
public class WebSocketServer {
	
	Logger logger=LoggerFactory.getLogger(WebSocketServer.class);
	//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
	private static int onlineCount = 0;
	
	//concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();
    
    
    public static Map<String,GameEvt> gameMap=new ConcurrentHashMap<String,GameEvt>(2000);
	
    private Session session;
	/**
	 * 连接建立成功调用的方法
	 * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	 */
	@OnOpen
    public void onOpen(Session session,EndpointConfig config){
		this.session = session;
		@SuppressWarnings("unused")
		HttpSession httpSession= (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
	    webSocketSet.add(this);     //加入set中
	    addOnlineCount();           //在线数加1
	   
	    logger.info("有新连接加入！当前在线人数为{}" + getOnlineCount());
	}
	/**
	 * 连接关闭调用的方法
	 */
	@OnClose
	public void onClose(){
		webSocketSet.remove(this);  //从set中删除
	    subOnlineCount();           //在线数减1
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
	}
	/**
	 * 收到客户端消息后调用的方法
	 * @param message 客户端发送过来的消息
	 * @param session 可选的参数
	 */
	@OnMessage
	public void onMessage(String message, Session session) {
		logger.info("来自客户端的消息:{}",message);
		@SuppressWarnings("unchecked")
		OptTypeEvt<String> optType =(OptTypeEvt<String>)JSONUtil.jsonToPoJo(message, OptTypeEvt.class);
		switch(optType.getOptType()){
			case "loadMap":{
				try {
					OptTypeEvt<Map<String,GameEvt>> result=new OptTypeEvt<Map<String,GameEvt>>();
					result.setObject(gameMap);
					result.setOptType("loadMap");
					this.sendMessage(JSONUtil.objectToJson(result));
				} catch (IOException e) {
					logger.error("消息发送异常:{}" + e.getMessage());
				}
			} break;
			
			default:{
				//群发消息
				for(WebSocketServer item: webSocketSet){
					try {
						item.sendMessage(message);
					} catch (IOException e) {
						logger.error("消息发送异常:{}" + e.getMessage());
						continue;
			        }
		        }
			} ;
		}
		
    }

    /**
	 * 发生错误时调用
	 * @param session
	 * @param error
	 */
	@OnError
    public void onError(Session session, Throwable error){
		logger.error("发生错误:{}",error.getMessage());
	}
	/**
	 * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
	 * @param message
	 * @throws IOException
	 */
	public void sendMessage(String message) throws IOException{
		this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
	}
	public static synchronized int getOnlineCount() {
		return onlineCount;
	}
	public static synchronized void addOnlineCount() {
		WebSocketServer.onlineCount++;
	}
	public static synchronized void subOnlineCount() {
		WebSocketServer.onlineCount--;
	}

}
