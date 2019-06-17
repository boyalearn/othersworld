var httpClient=function(){
	this.ajax=new XMLHttpRequest();
	
}
httpClient.prototype.sendGet=function(url,data,callback){
	//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
	this.ajax.open('get','getStar.php?+data);
	//步骤三:发送请求
	this.ajax.send();
	//步骤四:注册事件 onreadystatechange 状态改变就会调用
	this.ajax.onreadystatechange = function () {
	   if (this.ajax.readyState==4 &&this.ajax.status==200) {
	    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
	　　　　callback(this.ajax.responseText);//输入相应的内容
	  　　}
	}
}
httpClient.prototype.sendPost=function(url,data,callback){
	this.ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    this.ajax.open('post', '02.post.php' );
	//发送请求
    this.ajax.send(data);
    this.ajax.onreadystatechange = function () {
    //这步为判断服务器是否正确响应
    if (this.ajax.readyState == 4 && this.ajax.status == 200) {
    	callback(this.ajax.responseText);
    }
}