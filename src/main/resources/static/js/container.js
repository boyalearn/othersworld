var Container = function (canvasId, sessionId) {
    this.run = true;
    this.sessionId = sessionId;
    this.width;
    this.height;
    this.canvasCtx;
    this.objectContainer = new Map();
    this.controllers = new Map();
    this.player = new Player();
    this.canvasId = canvasId;
    this.intervalTime;
    this.speed = 2;
    this.lastTime;
}

Container.prototype.start = function () {
    this.run = true;
    this.init();
    this.clockLoop();
}

Container.prototype.stop = function () {
    this.run = false;
}

Container.prototype.init = function () {
    this.initEnvironment();
    this.initGameRole();
}


Container.prototype.initGameRole = function () {
    this.player.init(80, 80, 0, 0);
    this.objectContainer.add(this.sessionId, this.player);
    const controller = new Controller();
    controller.init(this.player);
    this.controllers.add(this.sessionId, controller);
}
/**
 * 游戏循环
 */
Container.prototype.clockLoop = function () {
    if (this.run != true) {
        return;
    }
    var _this = this;
    console.log("loop")
    this.calculateIntervalTime();
    this.drawGameWindow();
    window.requestAnimationFrame(function () {
        _this.clockLoop();
    });
}

Container.prototype.drawGameWindow = function () {
    this.canvasCtx.beginPath();
    this.canvasCtx.fillRect(0, 0, this.width, this.height);
    this.drawObjectInContainer();
}

Container.prototype.addObjectInContainer = function (key, object) {
    var controller = new Controller();
    controller.init(object);
    this.controllers.add(key, controller);
    this.objectContainer.add(key, object);
}

Container.prototype.drawObjectInContainer = function () {
    var _player = this.player;
    var _this = this;
    this.objectContainer.showAll(function (key, object) {
        _this.drawWrap(_player, object);
    });
    this.controllers.showAll(function (key, controller) {
        controller.run(this);
    })

}

Container.prototype.initEnvironment = function () {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    var canvas = document.getElementById(this.canvasId);
    canvas.setAttribute("width", this.width);
    canvas.setAttribute("height", this.height);
    this.canvasCtx = canvas.getContext("2d");
}

Container.prototype.calculateIntervalTime = function () {
    this.intervalTime = Date.now() - this.lastTime;
    this.lastTime = Date.now();
}

/**
 * @param r  主角儿对象
 * @param o  非主角儿对象
 * @returns Position
 */
Container.prototype.calculateOtherPosition = function (r, o) {
    const position = new Position();
    position.x = this.width / 2 - (r.x - o.x);
    position.y = this.height / 2 - (r.y - o.y);
    return position;
}

/**
 * @param r  主角儿对象
 * @param o  非主角儿对象
 */
Container.prototype.drawWrap = function (r, o) {
    const position = this.calculateOtherPosition(r, o);
    if (position.x > 0 && position.x < this.width && position.y > 0 && position.y < this.height) {
        o.draw(this.canvasCtx, position.x, position.y, this);
    }
}

Container.prototype.stop = function () {
    this.run = false;
}