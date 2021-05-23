var Keyboarder = function (sessionId, container, client) {
    this.sessionId = sessionId;
    this.container = container;
    this.client = client;
}

Keyboarder.prototype.init = function () {
    var _controller = this.container.controllers.find(this.sessionId);
    var _client = this.client;
    document.onkeydown = function (e) {
        var ev = (typeof event != 'undefined') ? window.event : e;
        if (ev.keyCode == 40) {

            _controller.setDirection("D");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"D\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        //Right
        if (ev.keyCode == 39) {
            _controller.setDirection("R");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"R\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        if (ev.keyCode == 38) {
            _controller.setDirection("U");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"U\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        //Left
        if (ev.keyCode == 37) {
            _controller.setDirection("L");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"L\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        //X
        if (ev.keyCode == 88) {
            _controller.setDirection("X");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"X\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }

    }
    document.onkeyup = function (e) {
        var ev = (typeof event != 'undefined') ? window.event : e;
        if (ev.keyCode == 40) {
            _controller.setDirection("S");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        //Right
        if (ev.keyCode == 39) {
            _controller.setDirection("S");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
        if (ev.keyCode == 38) {
            _controller.setDirection("S");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");

        }
        //Left
        if (ev.keyCode == 37) {
            _controller.setDirection("S");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");

        }
        if (ev.keyCode == 88) {
            _controller.setDirection("S");
            _client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\"" + _controller.role.x + "\",\"y\":\"" + _controller.role.y + "\"}}");
        }
    }
}