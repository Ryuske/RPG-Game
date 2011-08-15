RequireSystemScript("menu.js");
RequireSystemScript("screen.js");

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
    var speed = 1; //Remove for delta version
    if (IsKeyPressed(KEY_R)) {
        speed = 3;
    }
    movement(speed);
    for (var i in npcs) {
        if (npcs[i].movement) {
            npc_movement(npcs[i], 1);
        }
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
    if (IsKeyPressed(GetTalkActivationKey())) {
        for (var i=0; i<=31; i++) {
            SetTalkDistance(i);
        }
    }
    link.checkLinks();
    mouse.draw();
}
