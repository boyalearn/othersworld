var netWorkChange = function (evt, container) {
    var obj = eval('(' + evt.data + ')');
    var data = obj.object;
    switch (obj.optType) {
        case "loadMap": {


            for (var key in data) {
                //全局变量gameMap
                // type=1 为 树
                // type=2 为 玩家
                if ("1" == data[key].type) {
                    var tree = new Tree();
                    tree.init(100, 100, data[key].x, data[key].y);
                    container.addObjectInContainer(key, tree)
                } else if ("2" == data[key].type) {
                    if (JSESSIONID == data[key].id) {
                        continue;
                    }
                    var player = new Player();
                    player.init(80, 80, data[key].x, data[key].y);
                    player.isPlayer = false;
                    container.addObjectInContainer(key, player)
                }

            }


        }
            break;
        case "removeRole": {
            controllerMap.remove(data.id);
            gameMap.remove(data.id);

        }
            break;

        case "roleChange": {


            if (data.id != JSESSIONID) {
                var controller = controllerMap.find(data.id);

                controller.setDirection(data.direction);
                if ("S" == data.direction) {
                    controller.setXY(data.x, data.y);
                }
            }
        }
            break;

        case "loadSession": {
			var player = new Player();
			player.init(80,80,data.x,data.y);
			player.isPlayer = true;
			container.addObjectInContainer(JSESSIONID, player)
        }
            break;


        default: {
            alert("please relogin !!!");
            stop();
        }
            ;
            break;
    }

}