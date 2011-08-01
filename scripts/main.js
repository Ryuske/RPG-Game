RequireSystemScript("menu.js");

RequireScript("variables.js");
RequireScript("mouse.js");
RequireScript("functions.js");
RequireScript("menus.js");
RequireScript("panels.js");
RequireScript("npcs.js");
RequireScript("collision.js");
RequireScript("movement.js");
RequireScript("chat.js");

function game() {
    menuMain();
}

function play() {
    SetTalkActivationKey(KEY_T);
    link = new link();

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
    if (player.inChat === false) {
        panelGameChat();
    } else {
        panelNpcChat();
        panels.npcChat.chat.render();
    }
    link.checkLinks();
    mouse.draw();
}
