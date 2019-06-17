var client=new socketClient();
var player = new playerObj();
var controller = new controllerObj();
var tree1 = new treeObj();
var tree2 = new treeObj();
var tree3 = new treeObj();
var tree4 = new treeObj();
var tree5 = new treeObj();
var chat = new chatObj();

function initGameRole() {
	client.init("ws://localhost:8080/worldserver");
	chat.init(gameScreenWidth / 2, gameScreenHeight / 2, "爱的魔力转圈圈");
	player.init(80, 80);
	controller.init(player);
	tree1.init(100, 100, 300, 400);
	tree2.init(100, 100, 400, 400);
	tree3.init(100, 100, 500, 400);
	tree4.init(100, 100, 600, 400);
	tree5.init(100, 100, 700, 400);
}
function drawBackground() {
	fontctx.beginPath();
	fontctx.fillRect(0, 0, gameScreenWidth, gameScreenHeight);
	controller.run(chat);
	player.draw(fontctx);
	drawWrap(player, tree1, fontctx);
	drawWrap(player, tree2, fontctx);
	drawWrap(player, tree3, fontctx);
	drawWrap(player, tree4, fontctx);
	drawWrap(player, tree5, fontctx);
}
