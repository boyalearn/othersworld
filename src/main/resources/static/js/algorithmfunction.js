var positionObj=function(){
    this.x=0;
    this.y=0;
}
function getOtherPosition(r,o){
	var position=new positionObj();
	/**
	 * var gameScreenWidth;
     & var gameScreenHeight;
	 */
	position.x=gameScreenWidth/2-(r.x-o.x);
	position.y=gameScreenHeight/2-(r.y-o.y);
	return position;
}
/**
 *
 *
 **/
function drawWrap(r,o,stage){
	var position=getOtherPosition(r,o);
	if(position.x>0 && position.x<gameScreenWidth && position.y>0 && position.y< gameScreenHeight){
		o.draw(stage,position.x,position.y);
	}
}

