var controllerObj=function(){
	this.role;
	this.direction="S"  //S停 U上 D下 R右 L左 X旋转
}
controllerObj.prototype.init=function(role){
	this.role=role;
}
controllerObj.prototype.setDirection=function(direction){
	this.direction=direction;
}
controllerObj.prototype.run=function(chat){
	if(this.direction=="U"){
		this.role.y-=speed*intervalTime;
	}
	if(this.direction=="D"){
		this.role.y+=speed*intervalTime;
	}
	if(this.direction=="L"){
		this.role.x-=speed*intervalTime;
	}
	if(this.direction=="R"){
		this.role.x+=speed*intervalTime;
	}
	if(this.direction=="X"){
	    chat.draw(fontctx);
		this.role.angle+=0.05*Math.PI;
	}
}
var speed=0.1;
document.onkeydown = function(e) {
	var ev = (typeof event!= 'undefined') ? window.event : e;
	if(ev.keyCode == 40) {
		controller.setDirection("D");
	}
	//Right
	if(ev.keyCode == 39) {
		controller.setDirection("R");
	}
	if(ev.keyCode == 38) {
		controller.setDirection("U");
	}
	//Left
	if(ev.keyCode == 37) {
		controller.setDirection("L");
	}
	//X
	if(ev.keyCode == 88) {
		controller.setDirection("X");
	}

}
document.onkeyup = function(e) {
	var ev = (typeof event!= 'undefined') ? window.event : e;
	if(ev.keyCode == 40) {
		controller.setDirection("S");
	}
	//Right
	if(ev.keyCode == 39) {
		controller.setDirection("S");
	}
	if(ev.keyCode == 38) {
		controller.setDirection("S");
	}
	//Left
	if(ev.keyCode == 37) {
		controller.setDirection("S");
	}
	if(ev.keyCode == 88) {
		controller.setDirection("S");
	}

}
