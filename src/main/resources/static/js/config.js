/**
 * get browser environment
 */
var gameScreenWidth;
var gameScreenHeight;
var backcanvas;  //画游戏背景图片
var fontcanvas;  //画游戏前景图片
var backctx;  //画游戏背景ctx
var fontctx;  //画游戏前景ctx

var box;

/**
 * 定义整个游戏地图大小是屏幕的多少倍
 */
var mapWidth;
var mapHeight;
var mapRate=10;

var lastTime=Date.now();  //系统全局变量

var intervalTime=0;    //游戏一帧用掉的时间 用于处理时间平移时间


