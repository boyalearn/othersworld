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
        const cmd = new Cmd();
        cmd.cmd = CmdType.CHANGE_ROLE
        this.send(JSON.stringify(cmd));
    };

    this.ws.onmessage = function (evt) {
        this.monitor.monitor(evt, _this.container);
    };

    this.ws.onclose = function () {
        console.log("onclose")
        _this.reconnect();
    };
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
