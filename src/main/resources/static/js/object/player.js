const Player = function () {
    this.width = null;
    this.height = null;
    this.x = 0;
    this.y = 0;
    this.imgs = null;
    this.isPlayer = true;
    this.angle = 0 * Math.PI;

}
Player.prototype.init = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.imgs = [];
    this.imgs[0] = new Image();
    this.imgs[0].src = "./images/role/player1.png";
    this.imgs[1] = new Image();
    this.imgs[1].src = "./images/role/player2.png";
}

Player.prototype.draw = function (container, x, y) {
    container.canvasCtx.save();
    if (this.isPlayer) {
        container.canvasCtx.translate(container.width / 2, container.height / 2);
    } else {
        container.canvasCtx.translate(x, y);
    }
    container.canvasCtx.rotate(this.angle)
    container.canvasCtx.drawImage(this.imgs[Math.abs(parseInt(this.x) % 2)], -this.width * 0.5, -this.height * 0.5, this.width, this.height);
    container.canvasCtx.restore();
}