var client=new socketClient();
var controller=new controllerObj();
var chat=new chatObj();
//用户当前角色不能动
var player=new playerObj();
var gameMap=new Map();
function initGameRole() {
	client.init("ws://localhost:8080/worldserver");
	player.init(80,80);
	controller.init(player);
}

function drawGameMap(){
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
