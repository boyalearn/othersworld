/**
 * 控制器 每个对象需要一个控制器。来控制被包装的角色
 * @param role
 * @constructor
 */
const Controller = function (role) {
    this.role = role;
    this.direction = "S"  //S停 U上 D下 R右 L左 X旋转
}
Controller.prototype.setDirection = function (direction) {
    this.direction = direction;
}
Controller.prototype.getDirection = function () {
    return this.direction;
}
Controller.prototype.setXY = function (cx, cy) {
    this.role.x = parseFloat(cx);
    this.role.y = parseFloat(cy);
}
Controller.prototype.run = function (container) {
    if (this.direction == "U") {
        this.role.y -= container.speed * container.intervalTime;
    }
    if (this.direction == "D") {
        this.role.y += container.speed * container.intervalTime;
    }
    if (this.direction == "L") {
        this.role.x -= container.speed * container.intervalTime;
    }
    if (this.direction == "R") {
        this.role.x += container.speed * container.intervalTime;
    }
}

const Resource = function (console) {
    this.image = [];
    this.index = 0;
    this.console = console;
}

Resource.prototype.init = function () {
    this.image.push("./images/background/tree.png");
    this.image.push("./images/role/player1.png");
    this.image.push("./images/role/player2.png");
    this.loadResource();
}
Resource.prototype.loadResource = function () {
    const _this = this;
    if (this.index < this.image.length) {
        var image = new Image();
        image.src = this.image[this.index];
        image.onload = function () {
            _this.loadResource();
        }
        this.index++
    } else {
        this.console.init();
    }
}
