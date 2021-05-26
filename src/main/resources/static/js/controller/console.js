const GameConsole = function (mouseController, container) {
    this.mouseController = mouseController;
    this.container = container;
    this.size = 50;
    this.tools = [];
}

GameConsole.prototype.addTools = function (type, model) {
    const _this = this;
    const position = {'x': 100, 'y': 100};//图形的起始点
    const area = {'w': _this.size, 'h': _this.size};
    this.tools.push(new Tool(position, area, model, type));
}
GameConsole.prototype.init = function () {
    this.addTools(ModelType.PLAYER, new Player(this.container));
    this.addTools(ModelType.TREE, new Tree());
    this.addTools(ModelType.BLOCK, new Block());
    const y = this.container.height - this.size / 2;
    const x = (this.container.width - this.size * this.tools.length) * 0.5 + this.size * 0.5;
    for (let i = 0; i < this.tools.length; i++) {
        this.tools[i].position.y = y;
        this.tools[i].position.x = x + i * this.size;
        this.mouseController.addGameTool(this.tools[i].type, this.tools[i]);
    }
    this.mouseController.init();
}

