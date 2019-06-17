var socketClient=function(){
	this.ws;
}
socketClient.prototype.init=function(url){
	if (!"WebSocket" in window) {
		alert("您的浏览器不支持 WebSocket!");
	}
	this.ws=new WebSocket(url);
	
	this.ws.onopen = function() {
		this.send("发送数据");
	};

	this.ws.onmessage = function(evt) {
		console.log(this);
		netWorkChange(evt);
	};

	this.ws.onclose = function() {
		console.log("onclose")
	};
}
socketClient.prototype.send=function(msg){
	this.ws.send(msg);
}