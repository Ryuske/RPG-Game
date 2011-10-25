function movement(speed) {
    this.beta = {x: 0, y: 0};
    this.alpha = {x: GetPersonX(player.name), y: GetPersonY(player.name)};
    this.moving = false;
    this.facing;
    this.direction = {north: COMMAND_FACE_NORTH, east: COMMAND_FACE_EAST, south: COMMAND_FACE_SOUTH, west: COMMAND_FACE_WEST};
    this.enemy = {beta: {x: 0, y: 0}, alpha: {x: false, y: 0}};
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
    } else if (player.battle.enemy != '') {
        this.enemy.alpha.x = GetPersonX(player.battle.enemy);
        this.enemy.alpha.y = GetPersonY(player.battle.enemy);
        this.enemy.beta.x = this.enemy.alpha.x-this.alpha.x;
        this.enemy.beta.y = this.enemy.alpha.y-this.alpha.y;
        if (Math.abs(this.enemy.beta.x) > Math.abs(this.enemy.beta.y)) {
            if (this.enemy.beta.x < 0) {
                this.beta.x = speed/GetPersonSpeedX(player.name)*-1;
                this.facing = this.direction.west;
                QueuePersonCommand(player.name, this.facing, true);
                this.moving = true;
            } else {
                this.beta.x = speed/GetPersonSpeedX(player.name);
                this.facing = this.direction.east;
                QueuePersonCommand(player.name, this.facing, true);
                this.moving = true;
            }
        } else {
            if (this.enemy.beta.y < 0) {
                this.beta.y = speed/GetPersonSpeedY(player.name)*-1;
                this.facing = this.direction.north;
                QueuePersonCommand(player.name, this.facing, true);
                this.moving = true;
            } else {
                this.beta.y = speed/GetPersonSpeedY(player.name);
                this.facing = this.direction.south;
                QueuePersonCommand(player.name, this.facing, true);
                this.moving = true;
            }
        }
    } else {
		SetPersonFrame(player.name, 1);
    }

    if (this.moving === true && !collision(player.name, this.alpha.x+this.beta.x, this.alpha.y+this.beta.y) && player.inChat === false) {
		QueuePersonCommand(player.name, COMMAND_ANIMATE, true);
        if (player.battle.enemy != '' && this.enemy.alpha.x != false) {
            SetPersonX(player.name, this.alpha.x+this.beta.x);
            SetPersonY(player.name, this.alpha.y+this.beta.y);
        } else {
            SetPersonX(player.name, this.alpha.x+this.beta.x);
            SetPersonY(player.name, this.alpha.y+this.beta.y);
        }
        this.moving = false;
    }
}

function npc_movement(character, speed) {
    this.beta = {x: 0, y: 0};
    this.alpha = {x: GetPersonX(character.name), y: GetPersonY(character.name)};
    this.enemy = {x: 0, y: 0}
    this.integer = {x: 0, y: 0};
    this.moving = Math.floor(Math.random()*2); //0 = false, 1 = true
    this.facing = false;
    this.direction = [COMMAND_FACE_NORTH, COMMAND_FACE_EAST, COMMAND_FACE_SOUTH, COMMAND_FACE_WEST];
    solid = false;

    if (character.in_movement > 0) {
        this.facing = character.direction;
    } else if (player.battle.enemy == character.name) {
        this.enemy.x = GetPersonX(player.name)-this.alpha.x;
        this.enemy.y = GetPersonY(player.name)-this.alpha.y;
        if (Math.abs(this.enemy.x) > Math.abs(this.enemy.y)) {
            if (this.enemy.x < 0) {
                this.facing = 3;
            } else {
                this.facing = 1;
            }
        } else {
            if (this.enemy.y < 0) {
                this.facing = 0;
            } else {
                this.facing = 2;
            }
        }
    } else {
        this.percentage = 20/(Math.abs(Math.round((this.alpha.x-character.origin_x)/16)) + Math.abs(Math.round((this.alpha.y-character.origin_y)/16))); //Likelihood that NPC will walk towards origin
        this.percentage = 10/(this.percentage*0.1);

        if (character.origin_x == this.alpha.x) {
            if (Math.floor(Math.random()*2) == 0) {
                this.facing = 3;
            } else {
                this.facing = 1;
            }
        }
        if (character.origin_y == this.alpha.y) {
            if (Math.floor(Math.random()*2) == 0) {
                this.facing = 0;
            } else {
                this.facing = 2;
            }
        }
        if (Math.floor(Math.random()*101+1) <= this.percentage && !this.facing) { //Walk towards origin
            if (Math.floor(Math.random()*2) == 0) { //Moving along x
                if (character.origin_x < this.alpha.x) { //Origin is west of NPC
                    this.facing = 3;
                } else { //Origin is east of NPC
                    this.facing = 1;
                }
            } else { //Moving along y
                if (character.origin_y < this.alpha.y) { //Origin is north of NPC
                    this.facing = 0;
                } else { //Origin is south of NPC
                    this.facing = 2;
                }
            }
        } else { //Walk away from origin
            if (Math.floor(Math.random()*2) == 0) { //Move along x
                if (character.origin_x < this.alpha.x) { //Origin is west of NPC
                    this.facing = 1;
                } else { //Origin is east of NPC
                    this.facing = 3;
                }
            } else { //Move along y
                if (character.origin_y < this.alpha.y) { //Origin is north of NPC
                    this.facing = 2;
                } else { //Origin is south of NPC
                    this.facing = 0;
                }
            }
        }
    }

    if (character.last_moved == 180 || character.in_movement > 0 || player.battle.enemy == character.name) {
        if (this.moving == 1 || character.in_movement > 0 || player.battle.enemy == character.name) {
            switch (this.facing) {
                case 1: //East
                    this.beta.x = speed/GetPersonSpeedX(character.name);
                    break;
                case 2: //South
                    this.beta.y = speed/GetPersonSpeedY(character.name);
                    break;
                case 3: //West
                    this.beta.x = speed/GetPersonSpeedX(character.name)*-1;
                    break;
                default: //North
                    this.beta.y = speed/GetPersonSpeedY(character.name)*-1;
                    break;
            }
            
            if (!collision(character.name, this.alpha.x+this.beta.x, this.alpha.y+this.beta.y)) {
                QueuePersonCommand(character.name, this.direction[this.facing], true);
                QueuePersonCommand(character.name, COMMAND_ANIMATE, true);
            
                SetPersonX(character.name, this.alpha.x+this.beta.x);
                SetPersonY(character.name, this.alpha.y+this.beta.y);
            }
        }
        if (character.in_movement == 16) {
            npc.list.fromKey(character.name).in_movement = 0;
        } else {
            npc.list.fromKey(character.name).direction = this.facing;
            npc.list.fromKey(character.name).in_movement++;
        }
        npc.list.fromKey(character.name).current_x = GetPersonX(character.name);
        npc.list.fromKey(character.name).current_y = GetPersonY(character.name);
        npc.list.fromKey(character.name).last_moved = 0;
    } else {
        SetPersonFrame(character.name, 1);
        npc.list.fromKey(character.name).last_moved++;
    }
}
