var client=new socketClient();
var controller=new controllerObj();
var chat=new chatObj();
//用户当前角色不能动
var curPlayer=new playerObj();
var gameMap=new Map();
var controllerMap=new Map();
function initGameRole() {
	client.init(serverurl);
	curPlayer.init(80,80,0,0);
	controller.init(curPlayer);
}

function drawGameMap(){
	controllerMap.showAll(function(key,data){
		data.run(chat)
	});
	gameMap.showAll(function(key,data){
		drawWrap(curPlayer,data,fontctx);
	});
}
function drawBackground() {
	fontctx.beginPath();
	fontctx.fillRect(0, 0, gameScreenWidth, gameScreenHeight);
	controller.run(chat);
	drawGameMap();
	curPlayer.draw(fontctx);
}
