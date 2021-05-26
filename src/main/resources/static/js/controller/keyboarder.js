/**
 * Keyboarder 通过键盘监听事件来通过控制器来控制对象
 * @param container
 * @param client
 * @constructor
 */
const Keyboarder = function (container, client) {
    this.container = container;
    this.client = client;
}

Keyboarder.prototype.buildCmd = function (controller) {
    const cmd = new Cmd();
    cmd.cmd = CmdType.CHANGE_ROLE;
    cmd.data = new Move();
    cmd.data.x = controller.role.x;
    cmd.data.y = controller.role.y;
    return cmd;
}

Keyboarder.prototype.init = function () {
    const _this = this;
    const _client = this.client;

    document.onkeydown = function (e) {
        const ev = (typeof event != 'undefined') ? window.event : e;
        const _controller = _this.container.controllers.find(_this.container.sessionId);
        const cmd = _this.buildCmd(_controller);
        if (ev.keyCode == 40) {

            _controller.setDirection("D");
            cmd.data.direction = _controller.getDirection();
            console.log(JSON.stringify(cmd))
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
        const _controller = _this.container.controllers.find(_this.container.sessionId);
        const cmd = _this.buildCmd(_controller);
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