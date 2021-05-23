/*

var controller=new Controller();
var chat=new Chat();
//用户当前角色不能动
var curPlayer=new Player();

var controllerMap=new Map();
function initGameRole() {
	client.init(serverurl);
	curPlayer.init(80,80,0,0);
	controller.init(curPlayer);
	printlnData(gameMap);
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

function printlnData(data){
	window.setInterval(function() {
		console.log(data);
	},2000);
	
}
*/
