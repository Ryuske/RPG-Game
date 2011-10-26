RequireSystemScript('menu.js');
RequireSystemScript('screen.js');

RequireScript('link.js');
RequireScript('functions.js');
RequireScript('backpack.js');
RequireScript('menus.js');
RequireScript('panels.js');
RequireScript('npc.js');
RequireScript('collision.js');
RequireScript('movement.js');
RequireScript('chat.js');
RequireScript('variables.js');
RequireScript('mouse.js');
RequireScript('battle.js');

function game() {
    menuMain();
}

function play() {
    SetTalkActivationKey(KEY_T);
    SetTalkDistance(31);
    link = new link();
    backpack = new backpack('Plain Backpack');
    npc = new npc();
    chat = new chat();
    popup = new popup();
    battle = new battle();
    battle.setStance(true);

	CreatePerson(player.name, 'character.rss', false);
    AttachCamera(player.name);
	AttachInput(player.name);

    switchInfoPanel(player.backpack.current_pocket);
    backpack.addItem([1,0], 'Potion');
    backpack.addItem([2,2], 'Gold*500');

    SetUpdateScript('update();');
    SetRenderScript('render();');
    MapEngine('main.rmp', 60);
    player.layer = player.name;
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

    if (IsKeyPressed(KEY_P)) {
        popup.addPopup('standard', ['Close', 'So how does this work?']);
    }

    if (IsKeyPressed(KEY_E)) {
        panels.chat.text = battle.sinceEvent.last + "\n" + battle.sinceEvent.player.attacked + "\n" + battle.sinceEvent.player.hit;
    }
    //End block

    movement(speed);
    for (var i in npc.list) {
        if (npc.list[i].movement) {
            npc_movement(npc.list[i], 1);
        }
    }

    battle.setStance();
    battle.isAttacking();
    battle.updateEvents();
}

function render() {
    popup.render();
    panelButtons();
    switchInfoPanel(player.backpack.current_pocket);
    panelInfo();
    if (player.inChat === false) {
        panelGameChat();
    } else {
        panelNpcChat();
        chat.links.render();
    }
    link.checkLinks();
    mouse.draw();
    if (player.battle.enemy != '') {
        if (battle.sinceEvent.player.splat < 60) {
            battle.draw(battle.draw_type.splat);
        }
        if (battle.sinceEvent.player.splat < 15) {
            battle.draw(battle.draw_type.hit);
        }
        if (battle.draw_type.animation.playing == true) {
            battle.draw(battle.draw_type.hit);
        }
    }
}
