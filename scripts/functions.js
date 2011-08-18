function WarpMap(map, x, y) {
    if (x === undefined) {
        x = GetPersonX(player.name);
    }
    if (y === undefined) {
        y = GetPersonY(player.name);
    }
    FadeOut(500);
    ChangeMap(map);
    SetPersonX(player.name, x);
    SetPersonY(player.name, y);
    UpdateMapEngine();
    RenderMap();
    FadeIn(500);
}

function recover(type, amount) {
    panels.info.text = 'I recovered!';
}

function popup() {
    popup_entities = [];
}

popup.prototype.addPopup = function(x, y, w, h, text) {
    /**********
     * x[0] is for window, x[1] is for text
     * Refer to x for y
     * text[0] is closing buttons text, text[1] is the popups text
     *
     * x can be a preset (i.e. like error) if it's a preset, y becomes text.
     */
    if (typeof(x) == 'string') {
        this.text = y;
        switch (x) {
            case 'standard':
                this.w = font.getStringWidth(this.text[1])+10;
                popup_entities.push({window_x: (GetScreenWidth()-this.w-panels.info.dimensions.w)/2, window_y: GetScreenHeight()/2-50, text_x: this.w/2-font.getStringWidth(this.text[1])/2, text_y: 50/2-font.getHeight()/1.5, w: this.w, h: 50, closure_text: this.text[0], popup_text: this.text[1]});
                break;
        }
    } else {
        //popup_entities.push({window_x: x[0], window_y: y[0], text_x: x[1], text_y: y[1], w: w, h: h, closure_text: text[0], popup_text: text[1]});
    }
}

popup.prototype.removePopup = function(popup) {
    //if (popup === undefined) {
        popup_entities = [];
    /*} else {
        popup_entities[0] = undefined;
    }*/
}

popup.prototype.render = function() {
    for (var i in popup_entities) {
        windowStyle.drawWindow(popup_entities[i].window_x, popup_entities[i].window_y, popup_entities[i].w, popup_entities[i].h);
        font.drawTextBox(popup_entities[i].window_x+popup_entities[i].text_x, popup_entities[i].window_y+popup_entities[i].text_y, font.getStringWidth(popup_entities[i].popup_text), font.getStringHeight(popup_entities[i].popup_text, font.getStringWidth(popup_entities[i].popup_text)), 0, popup_entities[i].popup_text);
        link.addLink(popup_entities[i].window_x+(popup_entities[i].w-font.getStringWidth(popup_entities[i].closure_text))/2-14.5, popup_entities[i].window_y+popup_entities[i].h-10, popup_entities[i].closure_text, {callback: popup.removePopup, params: i});
    }
}
