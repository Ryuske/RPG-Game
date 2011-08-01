mouse.render = function(where) {
    this.on = where;
    panels.chat.text = this.on;
    this.draw();
}

mouse.destroy = function() {
    this.on = "destroyed";
    FlipScreen();
}

mouse.draw = function() {
    if (this.on != "destroyed") {
        this.image.blit(GetMouseX(), GetMouseY());

        if (!IsMouseButtonPressed(MOUSE_LEFT)) this.leftButtonDown = false;
        if (!IsMouseButtonPressed(MOUSE_RIGHT)) this.rightButtonDown = false;
    }
}

mouse.leftClick = function() {
    if (IsMouseButtonPressed(MOUSE_LEFT) && !this.leftButtonDown) {
        this.leftButtonDown = true;
        return true;
    }

    return false;
}

mouse.rightClick = function() {
    if (IsMouseButtonPressed(MOUSE_RIGHT) && !this.rightButtonDown) {
        this.rightButtonDown = true;
        return true;
    }

    return false;
}
