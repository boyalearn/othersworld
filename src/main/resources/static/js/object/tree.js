const Tree = function () {
    this.width = null;
    this.height = null;
    this.x = 250;
    this.y = 250;
    this.imgs = new Image();
    this.imgs.src = "./images/background/tree.png";

}
Tree.prototype.init = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
}

Tree.prototype.draw = function (canvasCtx, x, y) {
    canvasCtx.save();
    canvasCtx.translate(x, y);
    canvasCtx.rotate(Math.PI)
    canvasCtx.drawImage(this.imgs, -this.width * 0.5, -this.height * 0.5, this.width, this.height);
    canvasCtx.restore();
}