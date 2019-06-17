/********************************* define all global variable ********************************/

/********************************* main method ***********************************************/
function game(){
    init();
    gameloop();	
}
/********************************* game resources init ***************************************/
function init(){
	/****** set canvas context 2D **********/
    //setCanvasContext("2d");
	
	/****** init picture resoucre **********/
    //initPictureResources();	
}
/********************************* game loop way *********************************************/
function gameloop(){
	requestAnimationFrame(gameloop);
		
	/********** get interval time **********/
    getIntervalTime();
	/********** draw background ************/
	drawBackground();
}
