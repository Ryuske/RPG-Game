/************************
 *Need to work on collision detection. Should make a collision function, needs more accurate detecting, right now it's too "specific"
 */

function movement(speed) {
    this.beta = {x: 0, y: 0};
    this.alpha = {x: GetPersonX(player.name), y: GetPersonY(player.name)};
    this.moving = false;
    this.facing;
    this.direction = {north: COMMAND_FACE_NORTH, east: COMMAND_FACE_EAST, south: COMMAND_FACE_SOUTH, west: COMMAND_FACE_WEST};
    solid = false;

    if (IsKeyPressed(KEY_UP) && !this.moving) {
        this.beta.y = speed/GetPersonSpeedY(player.name)*-1;
        this.facing = this.direction.north;
        QueuePersonCommand(player.name, this.facing, true);
        this.moving = true;
    } else if (IsKeyPressed(KEY_DOWN) && !this.moving) {
        this.beta.y = speed/GetPersonSpeedY(player.name);
        this.facing = this.direction.south;
        QueuePersonCommand(player.name, this.facing, true);
        this.moving = true;
    } else if (IsKeyPressed(KEY_RIGHT) && !this.moving) {
        this.beta.x = speed/GetPersonSpeedX(player.name);
        this.facing = this.direction.east;
        QueuePersonCommand(player.name, this.facing, true);
        this.moving = true;
    } else if (IsKeyPressed(KEY_LEFT) && !this.moving) {
        this.beta.x = speed/GetPersonSpeedX(player.name)*-1;
        this.facing = this.direction.west;
        QueuePersonCommand(player.name, this.facing, true);
        this.moving = true;
    } else {
		SetPersonFrame(player.name, 1);
    }

		if (((this.facing == this.direction.north || this.facing == this.direction.east) && IsTriggerAt(this.alpha.x+this.beta.x+16, this.alpha.y+this.beta.y, 0))) {
		    ExecuteTrigger(this.alpha.x+this.beta.x+16, this.alpha.y+this.beta.y, 0);
		} else if (this.facing == this.direction.south && IsTriggerAt(this.alpha.x+this.beta.x, this.alpha.y+this.beta.y+16, 0)) {
			ExecuteTrigger(this.alpha.x+this.beta.x, this.alpha.y+this.beta.y+16, 0);
		} else if (this.facing == this.direction.west && IsTriggerAt(this.alpha.x+this.beta.x, this.alpha.y+this.beta.y, 0)) {
			ExecuteTrigger(this.alpha.x+this.beta.x, this.alpha.y+this.beta.y, 0);
		}
    if (this.moving === true && !solid) {
		QueuePersonCommand(player.name, COMMAND_ANIMATE, true);
        SetPersonX(player.name, this.alpha.x+this.beta.x);
        SetPersonY(player.name, this.alpha.y+this.beta.y);
        this.moving = false;
    }
}
