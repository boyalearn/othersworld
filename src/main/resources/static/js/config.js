/**
 * get browser environment
 */
var gameScreenWidth; //浏览器宽
var gameScreenHeight;  //浏览器高
var backcanvas;  //画游戏背景图片
var fontcanvas;  //画游戏前景图片
var backctx;  //画游戏背景ctx
var fontctx;  //画游戏前景ctx
var box;  //放两个canvas的DIV

/**
 * 定义整个游戏地图大小是屏幕的多少倍
 */
var mapWidth;
var mapHeight;
var mapRate=10;
/**
 * 运行时系统变量
 */
var lastTime=Date.now();  //系统全局变量 上一帧时间
var intervalTime=0;    //游戏一帧用掉的时间 用于处理时间平移时间

/**
 * 游戏相关设置
 */
var speed=0.2;   //整体游戏运行速度


