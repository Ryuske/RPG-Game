function battle() {
    //Do some initalizng here >.<
}

battle.prototype.sinceEvent = {last: 91, player: {attacked: 0, splat: 0}};
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
    //Somehow NPCs need to be able to attack...
    if (player.battle.attack.type == 'range') {
        this.draw_type.hit = 'range';
        if (this.draw_type.animation.playing == false) {
            this.draw_type.animation.alpha.x = MapToScreenX(player.layer, GetPersonX(player.name));
            this.draw_type.animation.beta.x = this.draw_type.animation.alpha.x;
            this.draw_type.animation.alpha.y = MapToScreenY(player.layer, GetPersonY(player.name));
            this.draw_type.animation.beta.y = this.draw_type.animation.alpha.y;
        }
        this.draw_type.animation.playing = true;

        npc.list.fromKey(player.battle.enemy).hp = npc.list.fromKey(player.battle.enemy).hp - this.calc('damage');
        if (npc.list.fromKey(player.battle.enemy).hp <= 0) {
            this.killed(player.battle.enemy);
            player.battle.enemy = '';
        }
    } else if (player.battle.attack.type == 'mage') {
        this.draw_type.hit = 'mage';
        if (this.draw_type.animation.playing == false) {
            this.draw_type.animation.alpha.x = MapToScreenX(player.layer, GetPersonX(player.name));
            this.draw_type.animation.beta.x = this.draw_type.animation.alpha.x;
            this.draw_type.animation.alpha.y = MapToScreenY(player.layer, GetPersonY(player.name));
            this.draw_type.animation.beta.y = this.draw_type.animation.alpha.y;
        }
        this.draw_type.animation.playing = true;
        
        npc.list.fromKey(player.battle.enemy).hp = npc.list.fromKey(player.battle.enemy).hp - this.calc('damage');                                                              
        if (npc.list.fromKey(player.battle.enemy).hp <= 0) {
            this.killed(player.battle.enemy);
            player.battle.enemy = '';
        }
    } else { //Melee
        this.draw_type.hit = 'melee';
        npc.list.fromKey(player.battle.enemy).hp = npc.list.fromKey(player.battle.enemy).hp - this.calc('damage');
        if (npc.list.fromKey(player.battle.enemy).hp <= 0) {
            this.killed(player.battle.enemy);
            player.battle.enemy = '';
        }
    }
}

battle.prototype.calc = function(type, person) {
    //person is optional, depending on the type
    switch (type) {
        case 'damage':
            this.sinceEvent.player.splat = 0;
            this.damage = Math.floor(Math.random()*10);
            if (this.damage < 3) {
                this.draw_type.splat = 'miss';
                return 0;
            } else if (this.damage < 5) {
                this.draw_type.splat = 'heal';
                return this.damage;
            } else {
                this.draw_type.splat = 'hit';
                return this.damage;
            }
        default: break;
    }
}

battle.prototype.draw = function(type) {
    switch (type) {
        case 'hit':
            images.combat.red.blit(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-12), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-11), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24), 30, 15, 1, this.damage);
            break;
        case 'heal':
            images.combat.blue.blit(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-12), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-11), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24), 30, 15, 1, this.damage);
            break;
        case 'miss':
            images.combat.blue.blit(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-12), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24));
            font.drawTextBox(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-10), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-24), 30, 15, 1, 'Miss');
            break;
        case 'melee':
            images.combat.melee_animation.blit(MapToScreenX(player.layer, GetPersonX(player.battle.enemy)-3), MapToScreenY(player.layer, GetPersonY(player.battle.enemy)-3));
            break;
        case 'range':
            this.animate_attack();
            images.combat.range_animation.blit(this.draw_type.animation.beta.x, this.draw_type.animation.beta.y);
            break;
        case 'mage':
            this.animate_attack();
            images.combat.mage_animation.blit(this.draw_type.animation.beta.x, this.draw_type.animation.beta.y);
            break;
        default:
            break;
    }
}

battle.prototype.animate_attack = function() {
    this.draw_type.animation.direction.x = MapToScreenX(player.layer, GetPersonX(player.battle.enemy)) - this.draw_type.animation.beta.x;        
    this.draw_type.animation.direction.y = MapToScreenY(player.layer, GetPersonY(player.battle.enemy)) - this.draw_type.animation.beta.y;
    if (Math.abs(this.draw_type.animation.direction.x) > Math.abs(this.draw_type.animation.direction.y)) {
        if (this.draw_type.animation.direction.x < 0) {
            this.draw_type.animation.beta.x--; //West
        } else {
            this.draw_type.animation.beta.x++; //East
        }
    } else {
        if (this.draw_type.animation.direction.y < 0) {
            this.draw_type.animation.beta.y--; //North
        } else {
            this.draw_type.animation.beta.y++; //South
        }
    }
    
    if ((this.draw_type.animation.direction.x) <= 0 && 0 <= (this.draw_type.animation.direction.x) && (this.draw_type.animation.direction.y) <= 0 && 0 <= (this.draw_type.animation.direction.y)) {
        this.draw_type.animation.playing = false;
    }
}

battle.prototype.killed = function(person) {
    DestroyPerson(person);
}
