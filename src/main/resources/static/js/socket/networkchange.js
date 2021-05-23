var netWorkChange=function(evt){
	var obj = eval('(' + evt.data + ')');
	var data=obj.object;
	switch(obj.optType){
		case "loadMap":{
			
			
			for (var key in data) {
				//全局变量gameMap
				// type=1 为 树
				// type=2 为 玩家
				if("1"==data[key].type){
					var tree=new Tree();
					tree.init(100,100,data[key].x,data[key].y);
					gameMap.add(key,tree);
				}
				else if("2"==data[key].type){
					if(JSESSIONID==data[key].id){
						continue;
					}
					var player=new Player();
					player.init(80,80,data[key].x,data[key].y);
					player.isPlayer=false;
					var controller=new Controller();
					controller.init(player);
					controllerMap.add(key,controller);
					gameMap.add(key,player);
				}
				
			}
			
			
		}
		break;
		case "removeRole":{
			controllerMap.remove(data.id);
			gameMap.remove(data.id);
			
		}
		break;
		
        case "roleChange":{
        	

        	if(data.id!=JSESSIONID){
            	var controller=controllerMap.find(data.id);
            	
            	controller.setDirection(data.direction);
            	if("S"==data.direction){
            		controller.setXY(data.x,data.y);
            	}
        	}
		}
		break;
		
		case "loadSession":{
			curPlayer.init(80,80,data.x,data.y);
		}
		break;
		
		
		default:{
			alert("please relogin !!!");
			stop();
		};break;
	}
	
}