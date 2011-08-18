RequireSystemScript("menu.js");
RequireSystemScript("screen.js");

RequireScript("link.js");
RequireScript("functions.js");
RequireScript("backpack.js");
RequireScript("menus.js");
RequireScript("panels.js");
RequireScript("npcs.js");
RequireScript("collision.js");
RequireScript("movement.js");
RequireScript("chat.js");
RequireScript("variables.js");
RequireScript("mouse.js");

function game() {
    menuMain();
}

function play() {
    SetTalkActivationKey(KEY_T);
    SetTalkDistance(31);
    link = new link();
    backpack = new backpack('Plain Backpack');

	CreatePerson(player.name, "character.rss", false);
    AttachCamera(player.name);
	AttachInput(player.name);

    switchInfoPanel(player.backpack.current_pocket);
    backpack.addItem([1,0], 'Potion');
    backpack.addItem([2,2], 'Gold*500');

    SetUpdateScript('update();');
    SetRenderScript('render();');
    MapEngine("main.rmp", 60);
}

function update() {
    /***********
     * Remove this block for delta version
     */
    var speed = 1;
    if (IsKeyPressed(KEY_R)) {
        speed = 3;
    }
    if (IsKeyPressed(KEY_I)) {
        panels.info.text = '';
    }
    if (IsKeyPressed(KEY_C)) {
        panels.chat.text = '';
    }

    if (IsKeyPressed(KEY_M)) {
        backpack.moveItem([1,0,3,1], 'Potion');
    }
    if (IsKeyPressed(KEY_D)) {
        backpack.removeItem([2,2]);
    }
    //End block

    movement(speed);
    for (var i in npcs) {
        if (npcs[i].movement) {
            npc_movement(npcs[i], 1);
        }
    }
}

function render() {
    panelButtons();
    switchInfoPanel(player.backpack.current_pocket);
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
