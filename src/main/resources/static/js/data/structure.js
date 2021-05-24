var CmdType = {
    CHANGE_ROLE: "changeRole",
    REMOVE_ROLE: "removeRole",
    LOAD_MAP: "loadMap",
    LOAD_SESSION: "loadSession",
}

var ObjectType = {
    TREE: 1,
    PLAYER: 2,
}

var Cmd = function () {
    this.cmd = null;
    this.data = null;
};

var Move = function () {
    this.id;
    this.direction = null;
    this.x;
    this.y;
}

/** Map *************************************************************/
var Map = function () {
    this.datastore = new Array();
}

Map.prototype.add = function (key, value) {
    this.datastore[key] = value;
}

Map.prototype.find = function (key) {
    return this.datastore[key];
}

Map.prototype.remove = function (key) {
    delete this.datastore[key];
}

Map.prototype.showAll = function (callBack) {
    for (var key in this.datastore) {
        callBack(key, this.datastore[key]);

    }
}

Map.prototype.count = function () {
    let n = 0;
    for (const key in this.datastore) {
        ++n;
    }
    return n;
}

Map.prototype.clear = function () {
    for (const key in this.datastore) {
        delete this.datastore[key];
    }
}