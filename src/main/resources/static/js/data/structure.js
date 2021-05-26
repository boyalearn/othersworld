var CmdType = {
    CHANGE_ROLE: "changeRole",
    REMOVE_ROLE: "removeRole",
    LOAD_RESOURCE: "loadResource",
    LOAD_SESSION: "loadSession",
    CREAT_MODEL: "createModel",
    RE_LOGIN : "reLogin"
}

var ModelType = {
    TREE: 1,
    PLAYER: 2,
    BLOCK: 3
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

var GameModel = function () {
    this.id = null;
    this.type = null;
    this.x = null;
    this.y = null;
};

var Position = function () {
    this.x = 0;
    this.y = 0;
}

var Tool = function (position, area, model, type) {
    this.position = position;
    this.area = area;
    this.model = model;
    this.type = type;
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
    var remove = this.datastore[key];
    delete this.datastore[key];
    return remove;
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