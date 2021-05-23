var Player=function(){
	this.width;
	this.height;
    this.x=0;
    this.y=0;
	this.imgs;
	this.isPlayer=true;
	this.angle=0*Math.PI;

}
Player.prototype.init=function(width, height, x, y){
	this.width=width;
	this.height=height;
	this.x=parseFloat(x);
	this.y=parseFloat(y);
    this.imgs=[];
    this.imgs[0]=new Image();
    this.imgs[0].src="./images/role/player1.png";
    this.imgs[1]=new Image();
    this.imgs[1].src="./images/role/player2.png";
}

Player.prototype.draw=function(stage, x, y){
    stage.save();
	if(this.isPlayer){
        stage.translate(gameScreenWidth/2,gameScreenHeight/2);
	}else{
		stage.translate(x,y);
	}
	stage.rotate(this.angle)
    stage.drawImage(this.imgs[Math.abs(parseInt(this.x)%2)],-this.width*0.5,-this.height*0.5,this.width,this.height);
    stage.restore();
}