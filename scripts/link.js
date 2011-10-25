function link() {
    this.links = [];
}

link.prototype.addLink = function(x, y, text, callback) {
    font.drawText(x+14.5, y+4, text);
    this.links.push({type: 'text', x: x, y: y, text: text, callback: callback});
}

link.prototype.addBlock = function(x, y, w, h, visual, callback) {
    /*******************
     * x[0] is the x for the image, x[1] is the x for the text inside the image
     * See x for information on y
     * visual[0] is the image, visual[1] is text to be drawn
     */
    if (visual[0].search(/[.]/) == -1) {
        this.color = visual[0].split(',');
        this.surface = CreateSurface(w, h, CreateColor(this.color[0], this.color[1], this.color[2]));
    } else {
        this.surface = LoadSurface(visual[0]);
    }
    if (visual[1] !== undefined) {
        this.surface.drawText(font, x[1], y[1], visual[1]);
    }
    this.surface.blit(x[0]+14.5, y[0]+4);
    this.links.push({type: 'block', x: x[0], y: y[0], w: w, h: h, callback: callback});
}

link.prototype.removeLinks = function() {
    this.links = [];
}

link.prototype.executeLink = function(i) {
    if (this.links[i].type == 'block') {
        this.dimensions = {w: this.links[i].w, h: this.links[i].h};
    } else {
        this.dimensions = {w: font.getStringWidth(this.links[i].text), h: font.getHeight()};
    }
    if (GetMouseX() >= this.links[i].x && GetMouseX() <= (this.links[i].x+this.dimensions.w) && GetMouseY() >= this.links[i].y && GetMouseY() <= (this.links[i].y+this.dimensions.h)) {
        if (typeof(this.links[i].callback) != 'function') {
            this.links[i].callback.callback(this.links[i].callback.params); //Need to find a way to have any number of params based on the array
        } else {
            this.links[i].callback();
        }
    }
}

link.prototype.checkLinks = function() {
    if (mouse.leftClick()) {
        foreach(this.links, 'link.executeLink(i);');
    }
}
