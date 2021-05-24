/**
 * NetworkMonitor 是个网络监听器。通过网络事件来控制容器的渲染
 * @param container
 * @constructor
 */
const NetworkMonitor = function (container) {
    this.container = container;
};
NetworkMonitor.prototype.loadContainer = function (data) {
    for (const key in data) {
        if (ObjectType.TREE == data[key].type) {
            const tree = new Tree();
            tree.init(100, 100, data[key].x, data[key].y);
            this.container.addObjectInContainer(key, tree)
            continue;
        }
        if (ObjectType.PLAYER == data[key].type) {
            if (this.container.sessionId == data[key].id) {
                continue;
            }
            const player = new Player();
            player.init(80, 80, data[key].x, data[key].y);
            player.isPlayer = false;
            this.container.addObjectInContainer(key, player)
            continue;
        }
    }
}
NetworkMonitor.prototype.removeMonitor = function (data) {
    this.container.objectContainer.remove(data.id);
    this.container.controllers.remove(data.id);
}

NetworkMonitor.prototype.changeRole = function (data) {
    if (data.id != this.container.sessionId) {
        const controller = this.container.controllers.find(data.id);
        controller.setDirection(data.direction);
        if ("S" == data.direction) {
            controller.setXY(data.x, data.y);
        }
    }
}

NetworkMonitor.prototype.loadSession = function (data) {
    const player = new Player();
    player.init(80, 80, data.x, data.y);
    player.isPlayer = true;
    this.container.player = player;
    this.container.addObjectInContainer(this.container.sessionId, player)
}


NetworkMonitor.prototype.monitor = function (evt) {
    const cmd = eval('(' + evt.data + ')');
    const data = cmd.data;
    switch (cmd.cmd) {
        case CmdType.LOAD_MAP:
            this.loadContainer(data);
            break;
        case CmdType.REMOVE_ROLE:
            this.removeMonitor(data);
            break;
        case CmdType.CHANGE_ROLE:
            this.changeRole(data);
            break;
        case CmdType.LOAD_SESSION:
            this.loadSession(data);
            break;
        default:
            this.container.stop();
            break;
    }
}