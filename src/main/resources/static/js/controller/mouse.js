const MouseController = function (container, client) {
    this.currTool = null;
    this.toolContainer = new Map();
    this.currKey = "current-char-and-num-key";
    this.container = container;
    this.option = false;
    this.client = client;
}

/**
 * 在控制器中加入工具
 *
 * @param key 无意义用于区分不同对象
 * @param tool Tool对象
 *
 */
MouseController.prototype.addGameTool = function (key, tool) {
    this.toolContainer.add(key, tool);
}
MouseController.prototype.init = function () {
    const _this = this;
    setTimeout(function () {
        _this.draw();
        _this.initEvent();
    }, 200);
}
MouseController.prototype.draw = function () {
    const ctx = this.container.fontCanvasCtx;
    ctx.clearRect(0, 0, this.container.width, this.container.height);
    for (const key in this.toolContainer.datastore) {
        const tool = this.toolContainer.datastore[key];
        tool.model.init(tool.area.w, tool.area.h, tool.position.x, tool.position.y);
        tool.model.draw(ctx, tool.position.x, tool.position.y);
    }
}
MouseController.prototype.window2Canvas = function (x, y) {
    const bbox = this.container.fontCanvas.getBoundingClientRect();
    return {x: x - bbox.left, y: y - bbox.top}
}
MouseController.prototype.isInGameTool = function (e) {
    const mouse = this.window2Canvas(e.clientX, e.clientY);
    for (const key in this.toolContainer.datastore) {
        const tool = this.toolContainer.datastore[key];
        if (this.isGameToolOver(mouse, tool)) {
            this.currTool = tool;
            return true;
        }
    }
    return false;
}
MouseController.prototype.isGameToolOver = function (mouse, tool) {
    const hw = tool.area.w * 0.5;
    const hh = tool.area.h * 0.5;
    if (mouse.x < tool.position.x - hw || mouse.x > tool.position.x + tool.area.w - hw) {
        return false;
    }
    if (mouse.y < tool.position.y - hh || mouse.y > tool.position.y + tool.area.h - hh) {
        return false;
    }
    return true;
}
MouseController.prototype.initEvent = function () {
    const _this = this;
    this.container.fontCanvas.onmousemove = function (e) {
        _this.cursorMouseMove(e);
    };
    this.container.fontCanvas.onmousedown = function (e) {
        _this.mouseDown(e);
    }
    this.container.fontCanvas.onmouseup = function (e) {
        _this.mouseUp(e);
    }
}
MouseController.prototype.cursorMouseMove = function (e) {//当鼠标移到绘制图形上的时候改变鼠标的状态
    if (this.isInGameTool(e)) {
        this.container.fontCanvas.style.cursor = 'move';
    } else {
        this.container.fontCanvas.style.cursor = 'default';
    }
}
MouseController.prototype.mouseDown = function (e) {//当鼠标按下时调用
    if (this.isInGameTool(e)) {
        const initMouse = this.window2Canvas(e.clientX, e.clientY);
        const startPositionX = initMouse.x - this.currTool.position.x;
        const startPositionY = initMouse.y - this.currTool.position.y;

        const _this = this;
        const newTool = this.clone(_this.currTool);
        this.addGameTool(this.currKey, newTool);
        this.option = true;
        this.container.fontCanvas.onmousemove = function (e) {//鼠标移动的时候
            const currMouse = _this.window2Canvas(e.clientX, e.clientY);
            newTool.position.x = currMouse.x - startPositionX;
            newTool.position.y = currMouse.y - startPositionY;
            //判断绘制的图形是否超出canvas的边界
            const hw = newTool.area.w * 0.5;
            const hh = newTool.area.h * 0.5;
            if (newTool.position.x - hw < 0) newTool.position.x = hw;

            if (newTool.position.x + newTool.area.w - hw > _this.container.width)
                newTool.position.x = _this.container.width - newTool.area.w - hw;

            if (newTool.position.y - hh < 0) _this.position.y = hh;

            if (newTool.position.y + newTool.area.h - hh > _this.container.height)
                newTool.position.y = _this.container.height - newTool.area.h - hh;
            //边移动边在新的位置绘制图形
            _this.draw();
        }
    }
}

MouseController.prototype.clone = function (tool) {
    if (ModelType.TREE == tool.type) {
        const newTool = new Tool();
        newTool.position = {x: tool.position.x, y: tool.position.y}
        newTool.area = {w: tool.area.w, h: tool.area.h}
        newTool.type = ModelType.TREE;
        newTool.model = new Tree();
        return newTool;
    }
    if (ModelType.PLAYER == tool.type) {
        const newTool = new Tool();
        newTool.position = {x: tool.position.x, y: tool.position.y}
        newTool.area = {w: tool.area.w, h: tool.area.h}
        newTool.type = ModelType.PLAYER;
        newTool.model = new Player(this.container);
        newTool.model.isPlayer = false;
        return newTool;
    }
    if (ModelType.BLOCK == tool.type) {
        const newTool = new Tool();
        newTool.position = {x: tool.position.x, y: tool.position.y}
        newTool.area = {w: tool.area.w, h: tool.area.h}
        newTool.type = ModelType.BLOCK;
        newTool.model = new Block();
        return newTool;
    }
    return null;

}
MouseController.prototype.mouseUp = function (e) {//鼠标抬起的时候调用
    const _this = this;
    const object = _this.toolContainer.remove(_this.currKey);
    if (this.option) {
        _this.addGameToolInContainer(object);
        this.option = false;
    }
    _this.draw();
    this.container.fontCanvas.onmousemove = null;
    this.container.fontCanvas.onmousemove = function (e) {
        _this.cursorMouseMove(e);
    }
}

MouseController.prototype.addGameToolInContainer = function (toolModel) {
    const position = this.container.calculateAbsolutelyPosition(toolModel.position);
    const cmd = new Cmd();
    cmd.cmd = CmdType.CREAT_MODEL;
    const model = new GameModel();
    model.type = toolModel.type;
    model.x = position.x;
    model.y = position.y;
    cmd.data = model;
    this.client.send(JSON.stringify(cmd));
}
