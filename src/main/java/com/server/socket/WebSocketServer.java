package com.server.socket;

import com.server.container.GameMemoryContainer;
import com.server.entity.play.Cmd;
import com.server.entity.play.CmdType;
import com.server.entity.play.GameModel;
import com.server.entity.play.Move;
import com.server.exception.UserNotFoundException;
import com.server.util.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint(value = "/worldserver", configurator = GetHttpSessionConfigurator.class)
public class WebSocketServer {

    Logger logger = LoggerFactory.getLogger(WebSocketServer.class);

    private String httpSessionId;

    /**
     * concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，
     * 可以使用Map来存放，其中Key可以为用户标识
     */
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet();

    private Session session;

    public String getHttpSessionId() {
        return httpSessionId;
    }

    /**
     * 连接建立成功调用的方法
     *
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     * @throws IOException
     * @step1 获取httpSessionId来确认是同一个浏览器的请求。
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        logger.info("有新连接加入！当前在线人数为{}", getOnlineCount());
        this.session = session;
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        this.httpSessionId = httpSession.getId();
        webSocketSet.add(this); // 加入set中
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        webSocketSet.remove(this); // 从set中删除
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());

        GameMemoryContainer.findGameMonitor().removeUser(this);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        logger.info("来自客户端的消息:{}", message);

        Cmd<Object> cmd = (Cmd<Object>) JSONUtil.jsonToPoJo(message, Cmd.class);
        switch (cmd.getCmd()) {
            case CmdType.LOAD_RESOURCE:
                GameMemoryContainer.findGameMonitor().initGameResource(this);
                break;
            case CmdType.CHANGE_ROLE:
                Map<String, Object> data = (LinkedHashMap) cmd.getData();
                Move move = new Move();
                move.setX(String.valueOf(data.get("x")));
                move.setY(String.valueOf(data.get("y")));
                move.setDirection(String.valueOf(data.get("direction")));
                move.setId(this.getHttpSessionId());
                GameMemoryContainer.findGameMonitor().changeRole(this, move);
                break;
            case CmdType.CREAT_MODEL:
                Map<String, Object> modelData = (LinkedHashMap) cmd.getData();
                GameModel model = new GameModel();
                model.setX(String.valueOf(modelData.get("x")));
                model.setY(String.valueOf(modelData.get("y")));
                model.setType(Integer.valueOf(String.valueOf(modelData.get("type"))));
                GameMemoryContainer.findGameMonitor().createModel(this, model);
                break;
            case CmdType.LOAD_SESSION:
                GameMemoryContainer.findGameMonitor().loadSession(this);
                break;
            default:
                broadcast(message);
                break;
        }
    }

    public void broadcast(String msg) {
        for (WebSocketServer item : webSocketSet) {
            try {
                item.unicast(msg);
            } catch (IOException e) {
                logger.error("消息发送异常:{}", e.getMessage());
                continue;
            }
        }
    }

    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) throws IOException {
        if (error.getCause() instanceof UserNotFoundException) {
            Cmd cmd = new Cmd();
            cmd.setCmd(CmdType.RE_LOGIN);
            this.unicast(JSONUtil.objectToJson(cmd));
            return;
        }
        if (error.getCause() instanceof IOException) {
            logger.info("one player break off connect .. session id is {}", session.getId());
            return;
        }
        logger.error("发生错误:{}", error.getMessage(), error);
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     *
     * @param message
     * @throws IOException
     */
    public void unicast(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public static int getOnlineCount() {
        return webSocketSet.size();
    }

}
