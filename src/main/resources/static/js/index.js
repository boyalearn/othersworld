var box = document.getElementById("allcanvas");
box.style.Width = document.documentElement.clientWidth + 'px';
box.style.height = document.documentElement.clientHeight + 'px';
var loginBox = document.getElementById("loginbox");
loginBox.style.Width = document.documentElement.clientWidth + 'px';
loginBox.style.height = document.documentElement.clientHeight + 'px';

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
    const account = document.getElementById("account").value;
    const client = new HttpClient();
    client.sendPost("/doLogin", "account=" + account, function (data) {
        const jsonData = eval('(' + data + ')');
        if ("Y" == jsonData.state) {
            JSESSIONID = jsonData.httpSessionId;
            box.style.zIndex = "999";
            startGame();
        }
    });
}

function startGame() {
    const container = new Container("fontCanvas", "backCanvas", JSESSIONID);
    container.start();
    const monitor = new NetworkMonitor(container);
    const socketClient = new SocketClient(container, serverurl, monitor);
    socketClient.init();
    new Keyboarder(container, socketClient).init();
    const mouseController = new MouseController(container, socketClient);
    const userConsole = new GameConsole(mouseController,container);
    const resource = new Resource(userConsole);
    resource.init();
}

