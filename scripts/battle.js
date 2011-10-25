function battle() {
    //Do some initalizng here >.<
}

battle.prototype.setStance = function(initalize) {
    player.weapon = items.indexOf(player.equipment.weapon)+1;

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
    //If 3 seconds go by, and nothing combat-related has happened, set player.battle.enemy = '';
    if (IsKeyPressed(KEY_A)) {
        player.battle.enemy = battle.enemy();
        //Move persons towards each-other
        //Stop enemy from moving
        //Comense combatacle
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
}
