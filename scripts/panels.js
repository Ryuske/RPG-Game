function panelButtons() {
    windowStyle.drawWindow(panels.buttons.dimensions.x, panels.buttons.dimensions.y, panels.buttons.dimensions.w, panels.buttons.dimensions.h);
    font.drawTextBox(panels.buttons.dimensions.x, panels.buttons.dimensions.y, panels.buttons.dimensions.w, panels.buttons.dimensions.h, 0, '');

    for (var i in panels.buttons.button) {
        link.addBlock(panels.buttons.button[i].x, panels.buttons.button[i].y, panels.buttons.button[i].w, panels.buttons.button[i].h, panels.buttons.button[i].visual, panels.buttons.button[i].callback);
    }
}

function panelInfo(operation) {
    windowStyle.drawWindow(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h);
    font.drawTextBox(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h, 0, panels.info.text);
}

function panelGameChat() {
    windowStyle.drawWindow(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h);
    font.drawTextBox(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h, 0, panels.chat.text);
}

function panelNpcChat() {
    windowStyle.drawWindow(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h);
    font.drawTextBox(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h, 0, panels.npcChat.text);
}
