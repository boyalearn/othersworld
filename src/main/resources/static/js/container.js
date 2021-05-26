/**
 * Container 是个大染缸所有对象放到容器中就可以自动渲染。
 * @param canvasId
 * @param sessionId
 * @constructor
 */
const Container = function (fontCanvasId, backCanvasId, sessionId) {
    this.run = true;
    this.sessionId = sessionId;
    this.width = null;
    this.height = null;
    this.fontCanvasId = fontCanvasId;
    this.fontCanvas = null;
    this.fontCanvasCtx = null;
    this.backCanvasId = backCanvasId;
    this.backCanvas = null;
    this.backCanvasCtx = null;
    this.objectContainer = new Map();
    this.controllers = new Map();
    this.player = null;
    this.intervalTime = 0;
    this.speed = 0.5;
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
    this.initResource();
    this.initEnvironment();
}

Container.prototype.initResource=function(){

}

/**
 * 游戏循环
 */
Container.prototype.clockLoop = function () {
    if (this.run != true) {
        return;
    }
    const _this = this;
    this.calculateIntervalTime();
    this.drawGameWindow();
    window.requestAnimationFrame(function () {
        _this.clockLoop();
    });
}

Container.prototype.drawGameWindow = function () {
    this.backCanvasCtx.beginPath();
    this.backCanvasCtx.fillRect(0, 0, this.width, this.height);
    this.drawObjectInContainer();
}

Container.prototype.addObjectInContainer = function (key, object) {
    const controller = new Controller(object);
    this.controllers.add(key, controller);
    this.objectContainer.add(key, object);
}

Container.prototype.drawObjectInContainer = function () {
    const _player = this.player;
    const _this = this;
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
    this.backCanvas = document.getElementById(this.backCanvasId);
    this.backCanvas.setAttribute("width", this.width);
    this.backCanvas.setAttribute("height", this.height);
    this.backCanvasCtx = this.backCanvas.getContext("2d");
    this.fontCanvas = document.getElementById(this.fontCanvasId);
    this.fontCanvas.setAttribute("width", this.width);
    this.fontCanvas.setAttribute("height", this.height);
    this.fontCanvasCtx = this.fontCanvas.getContext("2d");
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
Container.prototype.calculateRelativePosition = function (r, o) {
    const position = new Position();
    position.x = this.width / 2 - (r.x - o.x);
    position.y = this.height / 2 - (r.y - o.y);
    return position;
}

Container.prototype.calculateAbsolutelyPosition = function (o) {
    const position = new Position();
    position.x = o.x - this.width / 2 + this.player.x;
    position.y = o.y - this.height / 2 + this.player.y;
    return position;
}

/**
 * @param r  主角儿对象
 * @param o  非主角儿对象
 */
Container.prototype.drawWrap = function (r, o) {
    const position = this.calculateRelativePosition(r, o);
    if (position.x > 0 && position.x < this.width && position.y > 0 && position.y < this.height) {
        o.draw(this.backCanvasCtx, position.x, position.y);
    }
}

Container.prototype.stop = function () {
    this.run = false;
}