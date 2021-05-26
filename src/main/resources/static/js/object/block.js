const Block = function () {
    this.width = null;
    this.height = null;
    this.x = 0;
    this.y = 0;
    this.color = 'steelblue'
}
Block.prototype.init = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = parseFloat(x);
    this.y = parseFloat(y);
}

Block.prototype.draw = function (canvasCtx, x, y) {
    canvasCtx.save();
    canvasCtx.translate(x, y);
    canvasCtx.beginPath();
    canvasCtx.fillStyle = this.color;
    canvasCtx.fillRect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
    canvasCtx.closePath();
    canvasCtx.restore();
}