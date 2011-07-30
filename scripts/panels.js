function panelInfo(operation) {
    windowStyle.drawWindow(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h);
    font.drawTextBox(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h, 0, panels.info.text);
}

function panelChat() {
    windowStyle.drawWindow(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h);
    font.drawTextBox(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h, 0, panels.chat.text);
}
