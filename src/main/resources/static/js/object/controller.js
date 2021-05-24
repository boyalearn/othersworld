var Controller = function () {
    this.role = null;
    this.direction = "S"  //S停 U上 D下 R右 L左 X旋转
}
Controller.prototype.init = function (role) {
    this.role = role;
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
    if (this.direction == "X") {
        //chat.draw(fontctx);
        //this.role.angle+=0.05*Math.PI;
    }
}

