function panelInfo(text) {
    this.windowStyle = GetSystemWindowStyle();
    this.font = GetSystemFont();
    this.dimensions = {x: GetScreenWidth()-170, y: 10, w: 170, h: GetScreenHeight()};
    this.windowStyle.drawWindow(this.dimensions.x, this.dimensions.y, this.dimensions.w, this.dimensions.h);
    this.font.drawTextBox(this.dimensions.x, this.dimensions.y, this.dimensions.w, this.dimensions.h, 0, text);
}

function panelChat(text) {
    this.windowStyle = GetSystemWindowStyle();
    this.font = GetSystemFont();
    this.dimensions = {x: 10, y: GetScreenHeight()-60, w: GetScreenWidth()-202, h: 60};
    this.windowStyle.drawWindow(this.dimensions.x, this.dimensions.y, this.dimensions.w, this.dimensions.h);
    this.font.drawTextBox(this.dimensions.x, this.dimensions.y, this.dimensions.w, this.dimensions.h, 0, text);
}
