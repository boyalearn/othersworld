
function game(){
	runTag=true;
    init();
    gameloop();	
}
function stop(){
	runTag=false;
}
function init(){
	initEnvironment();
	//预留使用方式
	//loadMap();
	initGameRole();
}
/**
 * 游戏循环
 */
function gameloop(){
	if(runTag!=true){
		return ;
	}
	requestAnimationFrame(gameloop);
    getIntervalTime();
	drawBackground();
}
function initEnvironment(){
  gameScreenWidth=document.documentElement.clientWidth;
  gameScreenHeight=document.documentElement.clientHeight;
  //set canvas container fullscreen
  box=document.getElementById("allcanvas");
  box.style.Width=gameScreenWidth+'px';
  box.style.height=gameScreenHeight+'px';
  //set canvas fullscreen
  backcanvas=document.getElementById("backcanvas");
  fontcanvas=document.getElementById("fontcanvas");
  backcanvas.setAttribute("width", gameScreenWidth);
  fontcanvas.setAttribute("width", gameScreenWidth);
  backcanvas.setAttribute("height", gameScreenHeight);
  fontcanvas.setAttribute("height", gameScreenHeight);
  setCanvasContext("2d");
}

function setCanvasContext(type){
    backctx=backcanvas.getContext(type);
    fontctx=fontcanvas.getContext(type);
}

function loadMap(){
  mapWidth=gameScreenWidth*mapRate;
  mapHeight=mapWidth*0.75;
}

function getIntervalTime(){
	intervalTime=Date.now()-lastTime;
	lastTime=Date.now();
}


/**
 * @param r  主角儿对象
 * @param o  非主角儿对象
 * @returns 非主角儿再屏幕上的x,y坐表
 */
function getOtherPosition(r,o){
	var position=new positionObj();
	/**
	 * gameScreenWidth   
     * gameScreenHeight 
	 */
	position.x=gameScreenWidth/2-(r.x-o.x);
	position.y=gameScreenHeight/2-(r.y-o.y);
	return position;
}

/**
 * @param r  主角儿对象
 * @param o  非主角儿对象
 * @param stage canvasCtx
 */
function drawWrap(r,o,stage){
	var position=getOtherPosition(r,o);
	if(position.x>0 && position.x<gameScreenWidth && position.y>0 && position.y< gameScreenHeight){
		o.draw(stage,position.x,position.y);
	}
}