var netWorkChange=function(evt){
	console.log(evt.data);
	var obj = eval('(' + evt.data + ')');
	console.log(obj);
	console.log(obj.optType);
	var data=obj.object;
	switch(obj.optType){
		case "loadMap":{
			
			
			for (var key in data) {
				//全局变量gameMap
				if("1"==data[key].type){
					var tree=new treeObj();
					tree.init(100,100,data[key].x,data[key].y);
					gameMap.add(key,tree);
				}
				else if("2"==data[key].type){
					if(JSESSIONID==data[key].id){
						continue;
					}
					var player=new playerObj();
					player.init(80,80,data[key].x,data[key].y);
					player.isPlayer=false;
					var controller=new controllerObj();
					controller.init(player);
					controllerMap.add(key,controller);
					gameMap.add(key,player);
				}
				
			}
			
			
		};break;
		
		
		
		case "loadSession":{
			
			JSESSIONID=data;
		};break;
		
		
		
		
		default:;break;
	}
	
}
function getCookie2(name){
	    var strcookie = document.cookie;//获取cookie字符串
	    var arrcookie = strcookie.split("; ");//分割
	    //遍历匹配
	    for ( var i = 0; i < arrcookie.length; i++) {
	        var arr = arrcookie[i].split("=");
	        if (arr[0] == name){
	            return arr[1];
	        }
	    }
	    return "";
	}
function getCookie(Name) {
	   var search = Name + "="//查询检索的值
	   var returnvalue = "";//返回值
	   if (document.cookie.length > 0) {
	     sd = document.cookie.indexOf(search);
	     if (sd!= -1) {
	        sd += search.length;
	        end = document.cookie.indexOf(";", sd);
	        if (end == -1)
	         end = document.cookie.length;
	         //unescape() 函数可对通过 escape() 编码的字符串进行解码。
	        returnvalue=unescape(document.cookie.substring(sd, end))
	      }
	   } 
	   return returnvalue;
}