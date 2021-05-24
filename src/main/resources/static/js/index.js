var box = document.getElementById("allcanvas");
box.style.Width = document.documentElement.clientWidth + 'px';
box.style.height = document.documentElement.clientHeight + 'px';
var JSESSIONID;
var serverurl = "/worldserver";

document.body.onload = function () {
    if ("https:" == window.location.protocol) {
        serverurl = "wss://" + window.location.host + serverurl;
    } else {
        serverurl = "ws://" + window.location.host + serverurl;
    }
}

function doLogin() {
    var account = document.getElementById("account").value;
    var client = new httpClient();
    client.sendPost("/doLogin", "account=" + account, function (data) {
        var jsonData = eval('(' + data + ')');
        if ("Y" == jsonData.state) {
            JSESSIONID = jsonData.httpSessionId;
            game();
        }
    });
}

function game() {
    var container = new Container("canvas", JSESSIONID);
    container.start();
    var socketClient = new SocketClient(container);
    socketClient.init(serverurl);
    new Keyboarder(JSESSIONID, container, socketClient).init();
}

