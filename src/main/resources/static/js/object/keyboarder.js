var Keyboarder = function (sessionId, container, client) {
    this.sessionId = sessionId;
    this.container = container;
    this.client = client;
}

Keyboarder.prototype.init = function () {
    const _controller = this.container.controllers.find(this.sessionId);
    const _client = this.client;
    document.onkeydown = function (e) {
        var ev = (typeof event != 'undefined') ? window.event : e;

        var cmd = new Cmd();
        cmd.cmd = CmdType.CHANGE_ROLE;
        cmd.data = new Move();
        cmd.data.x = _controller.role.x;
        cmd.data.y = _controller.role.y;
        if (ev.keyCode == 40) {

            _controller.setDirection("D");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        //Right
        if (ev.keyCode == 39) {
            _controller.setDirection("R");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        if (ev.keyCode == 38) {
            _controller.setDirection("U");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        //Left
        if (ev.keyCode == 37) {
            _controller.setDirection("L");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        //X
        if (ev.keyCode == 88) {
            _controller.setDirection("X");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }

    }
    document.onkeyup = function (e) {
        const ev = (typeof event != 'undefined') ? window.event : e;
        if (ev.keyCode == 40) {
            _controller.setDirection("S");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        //Right
        if (ev.keyCode == 39) {
            _controller.setDirection("S");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
        if (ev.keyCode == 38) {
            _controller.setDirection("S");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));

        }
        //Left
        if (ev.keyCode == 37) {
            _controller.setDirection("S");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));

        }
        if (ev.keyCode == 88) {
            _controller.setDirection("S");
            cmd.data.direction = _controller.getDirection();
            _client.send(JSON.stringify(cmd));
        }
    }
}