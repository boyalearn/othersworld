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
controllerObj.prototype.setXY=function(cx,cy){
	this.role.x=parseFloat(cx);
	this.role.y=parseFloat(cy);
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
		//this.role.angle+=0.05*Math.PI;
	}
}

document.onkeydown = function(e) {
	var ev = (typeof event!= 'undefined') ? window.event : e;
	if(ev.keyCode == 40) {
		
		controller.setDirection("D");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"D\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	//Right
	if(ev.keyCode == 39) {
		controller.setDirection("R");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"R\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	if(ev.keyCode == 38) {
		controller.setDirection("U");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"U\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	//Left
	if(ev.keyCode == 37) {
		controller.setDirection("L");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"L\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	//X
	if(ev.keyCode == 88) {
		controller.setDirection("X");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"X\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}

}
document.onkeyup = function(e) {
	var ev = (typeof event!= 'undefined') ? window.event : e;
	if(ev.keyCode == 40) {
		controller.setDirection("S");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	//Right
	if(ev.keyCode == 39) {
		controller.setDirection("S");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");
	}
	if(ev.keyCode == 38) {
		controller.setDirection("S");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");

	}
	//Left
	if(ev.keyCode == 37) {
		controller.setDirection("S");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");

	}
	if(ev.keyCode == 88) {
		controller.setDirection("S");
		client.send("{\"optType\":\"roleChange\",\"object\":{\"direction\":\"S\",\"x\":\""+controller.role.x+"\",\"y\":\""+controller.role.y+"\"}}");

	}

}
