RequireSystemScript("menu.js");

RequireScript("variables.js");
RequireScript("mouse.js");
RequireScript("menus.js");
RequireScript("panels.js");
RequireScript("collision.js");
RequireScript("movement.js");

function game() {
    menuMain();
}

function play() {
	CreatePerson(player.name, "character.rss", false);
    AttachCamera(player.name);
	AttachInput(player.name);
    SetUpdateScript('update();');
    SetRenderScript('render();');
    MapEngine("main.rmp", 60);
}

function update() {
    movement(1);
    for (var i in npcs) {
        npc_movement(npcs[i], 1);
    }
}

function render() {
    panelInfo();
    panelChat();
    
    mouse.draw();
}
