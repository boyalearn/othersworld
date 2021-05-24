/**
 * Container 是个大染缸所有对象放到容器中就可以自动渲染。
 * @param canvasId
 * @param sessionId
 * @constructor
 */
const Container = function (canvasId, sessionId) {
    this.run = true;
    this.sessionId = sessionId;
    this.width = null;
    this.height = null;
    this.canvasCtx = null;
    this.objectContainer = new Map();
    this.controllers = new Map();
    this.player = null;
    this.canvasId = canvasId;
    this.intervalTime = 0;
    this.speed = 2;
    this.lastTime = new Date();
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
}

/**
 * 游戏循环
 */
Container.prototype.clockLoop = function () {
    if (this.run != true) {
        return;
    }
    var _this = this;
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
    const controller = new Controller(object);
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
        controller.run(_this);
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
        o.draw(this, position.x, position.y);
    }
}

Container.prototype.stop = function () {
    this.run = false;
}