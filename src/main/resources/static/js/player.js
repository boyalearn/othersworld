var playerObj=function(){
	this.width;
	this.height;
    this.x=300;
    this.y=400;
	this.imgs;
	this.isPlayer=true;
	this.angle=0*Math.PI;

}
playerObj.prototype.init=function(width,height){
	this.width=width;
	this.height=height;
    this.imgs=new Image();
    this.imgs.src="./images/role/player.png";
}

playerObj.prototype.draw=function(stage){
	console.log("x:"+this.x+"y:"+this.y)
    stage.save();
	if(this.isPlayer){
        stage.translate(gameScreenWidth/2,gameScreenHeight/2);
	}else{
		stage.translate(this.x,this.y);
	}
	stage.rotate(this.angle)
    stage.drawImage(this.imgs,-this.width*0.5,-this.height*0.5,this.width,this.height);
    stage.restore();
}