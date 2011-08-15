function link() {
    this.links = [];
}

link.prototype.addLink = function(x, y, text, callback) {
    font.drawText(x+14.5, y+4, text);

    this.links.push({x: x, y: y, text: text, callback: callback});
}

link.prototype.removeLinks = function() {
    this.links = [];
}

link.prototype.checkLinks = function() {
    if (mouse.leftClick()) {
        for (var i in this.links) {
            this.dimensions = {w: font.getStringWidth(this.links[i].text), h: font.getHeight()};
    
            if (GetMouseX() >= this.links[i].x && GetMouseX() <= (this.links[i].x+this.dimensions.w) && GetMouseY() >= this.links[i].y && GetMouseY() <= (this.links[i].y+this.dimensions.h)) {
                if (typeof(this.links[i].callback) != "function") {
                    this.links[i].callback.callback(this.links[i].callback.params); //Need to find a way to have any number of params based on the array
                } else {
                    this.links[0].callback();
                }
            }
        }
    }
}

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
