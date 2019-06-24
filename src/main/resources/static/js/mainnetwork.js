var client=new socketClient();
var controller=new controllerObj();
var chat=new chatObj();
//用户当前角色不能动
var player=new playerObj();
var gameMap=new Map();
var controllerMap=new Map();
function initGameRole() {
	client.init(serverurl);
	player.init(80,80,0,0);
	controller.init(player);
}

function drawGameMap(){
	controllerMap.showAll(function(key,data){
		data.run(chat)
	});
	gameMap.showAll(function(key,data){
		drawWrap(player,data,fontctx);
	});
}
function drawBackground() {
	fontctx.beginPath();
	fontctx.fillRect(0, 0, gameScreenWidth, gameScreenHeight);
	controller.run(chat);
	drawGameMap();
	player.draw(fontctx);
}
