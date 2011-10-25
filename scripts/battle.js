function battle() {
    //Do some initalizng here >.<
}

battle.prototype.sinceEvent = {last: 0, player: {attacked: 0, splat: 0}};
battle.prototype.draw_type = {splat: '', hit: '', animation: {playing: false, alpha: {x: 0, y: 0}, beta: {x: 0, y: 0}, direction: {x: 0, y: 0}}};
battle.prototype.damage = 0;

battle.prototype.updateEvents = function() {
    this.sinceEvent.last++;
    this.sinceEvent.player.attacked++;
    this.sinceEvent.player.splat++;
}

battle.prototype.setStance = function(initalize) {
    player.weapon = items[items.indexOf(player.equipment.weapon)+1];

    if (player.weapon.char_class == 'Archer') {
        player.battle.attack.type = 'range';
    } else if (player.weapon.char_class == 'Mage') {
        player.battle.attack.type = 'mage';
    } else {
        player.battle.attack.type = 'melee';
    }

    if (initalize) {
        player.battle.attack.stance = 'controlled';
    } else {
        if (IsKeyPressed(KEY_1) && player.battle.attack.stance != 'controlled') { //Controlled attack
            player.battle.attack.stance = 'controlled';
        } else if (IsKeyPressed(KEY_2) && player.battle.attack.stance != 'rapid') { //Rapid attack
            player.battle.attack.stance = 'rapid';
        } else if (IsKeyPressed(KEY_3) && player.battle.attack.stance != 'defense') { //Defense attack
            player.battle.attack.stance = 'defense';
        }
    }
}

battle.prototype.isAttacking = function() {
    if (IsKeyPressed(KEY_A)) {
        this.sinceEvent.last = 0;
        player.battle.enemy = this.enemy();
        if (this.sinceEvent.player.attacked > 90) {
            this.attack();
            this.sinceEvent.player.attacked = 0;
        }
    }
    if (this.sinceEvent.last > 300) {
        //player.battle.enemy = '';
    }
}

battle.prototype.enemy = function() {
    switch (GetPersonDirection(player.name)) {
        case 'north':
            for (var y=0; y<=50; y++) {
                if (GetObstructingPerson(player.name, GetPersonX(player.name), GetPersonY(player.name)-y) != '') {
                    return GetObstructingPerson(player.name, GetPersonX(player.name), GetPersonY(player.name)-y);
                }
            }
            break;
        case 'east':
            for (var x=0; x<=50; x++) {
                if (GetObstructingPerson(player.name, GetPersonX(player.name)+x, GetPersonY(player.name))) {
                    return GetObstructingPerson(player.name, GetPersonX(player.name)+x, GetPersonY(player.name));
                }
            }
            break;
        case 'south':
            for (var y=0; y<=50; y++) {
                if (GetObstructingPerson(player.name, GetPersonX(player.name), GetPersonY(player.name)+y)) {
                    return GetObstructingPerson(player.name, GetPersonX(player.name), GetPersonY(player.name)+y);
                }
            }
            break;
        default: //West
            for (var x=0; x<=50; x++) {
                if (GetObstructingPerson(player.name, GetPersonX(player.name)-x, GetPersonY(player.name))) {
                    return GetObstructingPerson(player.name, GetPersonX(player.name)-x, GetPersonY(player.name));
                }
            }
            break;
    }

    return '';
}

battle.prototype.attack = function() {
    if (player.battle.attack.type == 'range') {
        this.draw_type.hit = 'range';
        if (this.draw_type.animation.playing == false) {
            this.draw_type.animation.alpha.x = MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.name));
            this.draw_type.animation.beta.x = this.draw_type.animation.alpha.x;
            this.draw_type.animation.alpha.y = MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.name));
            this.draw_type.animation.beta.y = this.draw_type.animation.alpha.y;
        }
        this.draw_type.animation.playing = true;
    } else if (player.battle.attack.type == 'mage') {
    } else { //Melee
        this.damage = Math.floor(Math.random()*10);
        if (this.damage < 3) {
            this.sinceEvent.player.splat = 0;
            this.draw_type.splat = 'miss';
        } else if (this.damage < 5) {
            this.sinceEvent.player.splat = 0;
            this.draw_type.splat = 'heal';
            npc.list.fromKey(player.battle.enemy).hp = npc.list.fromKey(player.battle.enemy).hp + this.damage;
        } else { //Hit
            this.sinceEvent.player.splat = 0;
            this.draw_type.splat = 'hit';
            if ((npc.list.fromKey(player.battle.enemy).hp-this.damage) < 0) {
                this.damage = npc.list.fromKey(player.battle.enemy).hp;
                npc.list.fromKey(player.battle.enemy).hp = 0;   
                this.killed(player.battle.enemy);
                player.battle.enemy = '';
            } else {
                this.draw_type.hit = 'melee';
                npc.list.fromKey(player.battle.enemy).hp = npc.list.fromKey(player.battle.enemy).hp - this.damage;
            }
        }
    }
}

battle.prototype.draw = function(type) {
    switch (type) {
        case 'hit':
            images.combat.red.blit(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-12), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-11), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24), 25, 15, 1, this.damage);
            break;
        case 'heal':
            images.combat.blue.blit(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-12), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-11), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24), 25, 15, 1, this.damage);
            break;
        case 'miss':
            images.combat.blue.blit(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-12), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-10), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-24), 30, 15, 1, 'Miss');
            break;
        case 'melee':
            images.combat.melee_animation.blit(MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)-3), MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)-3));
            break;
        case 'range':
            this.draw_type.animation.direction.x = MapToScreenX(GetPersonLayer(player.name), GetPersonX(player.battle.enemy)) - this.draw_type.animation.beta.x;
            this.draw_type.animation.direction.y = MapToScreenY(GetPersonLayer(player.name), GetPersonY(player.battle.enemy)) - this.draw_type.animation.beta.y;
            if (Math.abs(this.draw_type.animation.direction.x) > Math.abs(this.draw_type.animation.direction.y)) {
                if (this.draw_type.animation.direction.x < 0) {
                    this.draw_type.animation.beta.x--; //West
                } else {
                    this.draw_type.animation.beta.x++; //East
                }
            } else {
                if (this.draw_type.animation.direction.y < 0) {
                    //panels.info.text = 'North';
                    this.draw_type.animation.beta.y--; //North
                } else {
                    this.draw_type.animation.beta.y++; //South
                }
            }
            images.combat.range_animation.blit(this.draw_type.animation.beta.x, this.draw_type.animation.beta.y);
            if ((this.draw_type.animation.direction.x-7) <= 0 && 0 <= (this.draw_type.animation.direction.x+7) && (this.draw_type.animation.direction.y-7) <= 0 && 0 <= (this.draw_type.animation.direction.y+7)) {
                this.draw_type.animation.playing = false;
            }
        default:
            break;
    }
}

battle.prototype.killed = function(person) {
    DestroyPerson(person);
}
