RequireSystemScript("menu.js");

RequireScript("variables.js");
RequireScript("mouse.js");
RequireScript("menus.js");
RequireScript("panels.js");
RequireScript("movement.js");

function game() {
    menuMain();
}

function play() {
	CreatePerson(player.name, "character.rss", false);
	AttachCamera(player.name);
	AttachInput(player.name);
    SetUpdateScript('movement(1);');
    SetRenderScript('update();');
    MapEngine("main.rmp", 60);
}

function update() {
    mouse.draw();
    //************Showcasing Mouse Destroying & Rendering, not used for anything*****************/
    if (IsKeyPressed(KEY_F1)) {
        mouse.destroy();
    }
    if (IsKeyPressed(KEY_F2)) {
        mouse.render();
    }
    //********************************End Showcase**********************************************/
    panelInfo(panel_text.info);
    panelChat(panel_text.chat);
}
