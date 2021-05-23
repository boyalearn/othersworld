var Chat=function(){
	this.width;
	this.height;
    this.x=250;
    this.y=250;
	this.words;

}
Chat.prototype.init=function(x, y, words){
	this.x=x;
	this.y=y;
	this.words=words;

}
Chat.prototype.draw=function(stage){
    stage.save();
    stage.translate(this.x,this.y);
    stage.font = '20px "微软雅黑"';
	stage.fillStyle = "red";
	stage.textBaseline = "top";
	stage.fillText("特效:"+this.words, -70, -90);
    stage.restore();
}