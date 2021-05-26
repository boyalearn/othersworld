const Player = function (container) {
    this.width = null;
    this.height = null;
    this.x = 0;
    this.y = 0;
    this.isPlayer = false;
    this.angle = 0 * Math.PI;
    this.container = container;
    this.imgs = [];
    this.imgs[0] = new Image();
    this.imgs[0].src = "./images/role/player1.png";
    this.imgs[1] = new Image();
    this.imgs[1].src = "./images/role/player2.png";

}
Player.prototype.init = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = parseFloat(x);
    this.y = parseFloat(y);

}

Player.prototype.draw = function (canvasCtx, x, y) {
    canvasCtx.save();
    if (this.isPlayer) {
        canvasCtx.translate(this.container.width / 2, this.container.height / 2);
    } else {
        canvasCtx.translate(x, y);
    }
    canvasCtx.rotate(this.angle)
    canvasCtx.drawImage(this.imgs[Math.abs(parseInt(this.x) % 2)], -this.width * 0.5, -this.height * 0.5, this.width, this.height);
    canvasCtx.restore();
}