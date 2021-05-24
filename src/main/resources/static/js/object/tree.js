const Tree = function () {
    this.width = null;
    this.height = null;
    this.x = 250;
    this.y = 250;
    this.imgs = null;

}
Tree.prototype.init = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.imgs = new Image();
    this.imgs.src = "./images/background/tree.png";
}

Tree.prototype.draw = function (stage, x, y) {
    stage.save();
    stage.translate(x, y);
    stage.rotate(Math.PI)
    stage.drawImage(this.imgs, -this.width * 0.5, -this.height * 0.5, this.width, this.height);
    stage.restore();
}