/**
 * SocketClient 是网络通信工具用于网络数据的传输与接收
 * @param container
 * @param url
 * @param monitor
 * @constructor
 */
const SocketClient = function (container, url, monitor) {
    this.ws = null;
    this.url = url;
    this.lock = false;
    this.container = container;
    this.monitor = monitor;
}

SocketClient.prototype.init = function () {
    const _this = this;
    if (!"WebSocket" in window) {
        alert("you browser not support WebSocket!");
    }
    this.ws = new WebSocket(this.url);

    this.ws.onopen = function () {
        _this.onOpen();
    };

    this.ws.onmessage = function (evt) {
        _this.monitor.monitor(evt, _this);
    };

    this.ws.onclose = function () {
        console.log("close connection ...")
        _this.reconnect();
    };
}

SocketClient.prototype.onOpen = function () {
    const cmd = new Cmd();
    cmd.cmd = CmdType.LOAD_SESSION;
    this.send(JSON.stringify(cmd));
}

SocketClient.prototype.send = function (data) {
    this.ws.send(data);
}
SocketClient.prototype.reconnect = function () {
    const _this = this;
    if (_this.lock) {
        return;
    }
    _this.lock = true;
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
        try {
            _this.init(_this.url);
        } catch (e) {
            _this.reconnect()
        }
        _this.lock = false;
    }, 5000);
}
