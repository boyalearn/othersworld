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
				
			}
		};break;
		default:;break;
	}
	
}