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

    if (this.moving === true && !collision(player.name, this.alpha.x+this.beta.x, this.alpha.y+this.beta.y)) {
		QueuePersonCommand(player.name, COMMAND_ANIMATE, true);
        SetPersonX(player.name, this.alpha.x+this.beta.x);
        SetPersonY(player.name, this.alpha.y+this.beta.y);
        this.moving = false;
    }
}

/********************************
 * http://spheredev.org/smforums/index.php?topic=3822.0
 * Will need an array, declaring each NPC. Array should include name, starting x & y
 */
function npc_movement(npc, speed) {
    this.beta = {x: 0, y: 0};
    this.alpha = {x: GetPersonX(npc.name), y: GetPersonY(npc.name)};
    this.integer = {x: 0, y: 0};
    this.moving = Math.floor(Math.random()*2); //0 = false, 1 = true
    this.facing = false;;
    this.direction = [COMMAND_FACE_NORTH, COMMAND_FACE_EAST, COMMAND_FACE_SOUTH, COMMAND_FACE_WEST];
    solid = false;

    if (npc.in_movement > 0) {
        this.facing = npc.direction;
    } else {
        this.percentage = 20/(Math.abs(Math.round((this.alpha.x-npc.origin_x)/16)) + Math.abs(Math.round((this.alpha.y-npc.origin_y)/16))); //Likelihood that NPC will walk towards origin
        this.percentage = 10/(this.percentage*0.1);

        if (npc.origin_x == this.alpha.x) {
            if (Math.floor(Math.random()*2) == 0) {
                this.facing = 3;
            } else {
                this.facing = 1;
            }
        }
        if (npc.origin_y == this.alpha.y) {
            if (Math.floor(Math.random()*2) == 0) {
                this.facing = 0;
            } else {
                this.facing = 2;
            }
        }
        if (Math.floor(Math.random()*101+1) <= this.percentage && !this.facing) { //Walk towards origin
            if (Math.floor(Math.random()*2) == 0) { //Moving along x
                if (npc.origin_x < this.alpha.x) { //Origin is west of NPC
                    this.facing = 3;
                } else { //Origin is east of NPC
                    this.facing = 1;
                }
            } else { //Moving along y
                if (npc.origin_y < this.alpha.y) { //Origin is north of NPC
                    this.facing = 0;
                } else { //Origin is south of NPC
                    this.facing = 2;
                }
            }
        } else { //Walk away from origin
            if (Math.floor(Math.random()*2) == 0) { //Move along x
                if (npc.origin_x < this.alpha.x) { //Origin is west of NPC
                    this.facing = 1;
                } else { //Origin is east of NPC
                    this.facing = 3;
                }
            } else { //Move along y
                if (npc.origin_y < this.alpha.y) { //Origin is north of NPC
                    this.facing = 2;
                } else { //Origin is south of NPC
                    this.facing = 0;
                }
            }
        }
    }

    if (npc.last_moved == 180 || npc.in_movement > 0) {
        if (this.moving == 1 || npc.in_movement > 0) {
            switch (this.facing) {
                case 1: //East
                    this.beta.x = speed/GetPersonSpeedX(npc.name);
                    break;
                case 2: //South
                    this.beta.y = speed/GetPersonSpeedY(npc.name);
                    break;
                case 3: //West
                    this.beta.x = speed/GetPersonSpeedX(npc.name)*-1;
                    break;
                default: //North
                    this.beta.y = speed/GetPersonSpeedY(npc.name)*-1;
                    break;
            }
            
            if (!collision(npc.name, this.alpha.x+this.beta.x, this.alpha.y+this.beta.y)) {
                QueuePersonCommand(npc.name, this.direction[this.facing], true);
                QueuePersonCommand(npc.name, COMMAND_ANIMATE, true);
            
                SetPersonX(npc.name, this.alpha.x+this.beta.x);
                SetPersonY(npc.name, this.alpha.y+this.beta.y);
            }
        }
        if (npc.in_movement == 16) {
            npcs[npc.id].in_movement = 0;
        } else {
            npcs[npc.id].direction = this.facing;
            npcs[npc.id].in_movement++;
        }
        npcs[npc.id].current_x = GetPersonX(npc.name);
        npcs[npc.id].current_y = GetPersonY(npc.name);
        npcs[npc.id].last_moved = 0;
    } else {
        SetPersonFrame(npc.name, 1);
        npcs[npc.id].last_moved++;
    }
}
