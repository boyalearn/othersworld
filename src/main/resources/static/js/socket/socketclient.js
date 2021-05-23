var SocketClient = function (container) {
    this.ws;
    this.url;
    this.lock;
    this.container = container;
}

/**
 * opt loadMap
 */
SocketClient.prototype.init = function (url) {
    this.url = url;
    var _this = this;
    if (!"WebSocket" in window) {
        alert("您的浏览器不支持 WebSocket!");
    }
    this.ws = new WebSocket(url);

    this.ws.onopen = function () {
        this.send("{\"optType\":\"loadMap\"}");
    };

    this.ws.onmessage = function (evt) {
        netWorkChange(evt, _this.container);
    };

    this.ws.onclose = function () {
        console.log("onclose")
        _this.reconnect();
    };
}
SocketClient.prototype.send = function (msg) {
    this.ws.send(msg);
}
SocketClient.prototype.reconnect = function () {

    var _this = this;
    if (_this.lock) return;
    _this.lock = true;

    console.log("reconnect");
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
        try {
            _this.init(_this.url);
        } catch (e) {
            _this.reconnect()
        }
        _this.lock = false;
    }, 5000);
}
