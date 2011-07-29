mouse.render = function() {
    this.destroyed = false;
    mouse.draw();
}

mouse.destroy = function() {
    this.destroyed = true;
    FlipScreen();
}

mouse.draw = function() {
    if (!this.destroyed) {
        this.x = GetMouseX();
        this.y = GetMouseY();
        this.image.blit(this.x, this.y);

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
