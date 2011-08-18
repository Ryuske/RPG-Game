function battle() {
    this.variables = {
        player: {
            attack: {
                type: '',
                stance: ''
            },
            weapon: ''
        }
    };
}

battle.prototype.setStance = function(initalize) {
    this.variables.player.weapon = items.indexOf(player.equipment.weapon)+1;

    if (this.variables.player.weapon.char_class == 'Archer') {
        this.variables.player.attack.type = 'range';
    } else if (this.variables.player.weapon.char_class == 'Mage') {
        this.variables.player.attack.type = 'mage';
    } else {
        this.variables.player.attack.type = 'melee';
    }

    if (initalize) {
        this.variables.player.attack.stance = 'controlled';
    } else {
        if (IsKeyPressed(KEY_1) && this.variables.player.attack.stance != 'controlled') { //Controlled attack
            this.variables.player.attack.stance = 'controlled';
            panels.chat.text = "Stance switched to: " + this.variables.player.attack.stance + "\n" + panels.chat.text;
        } else if (IsKeyPressed(KEY_2) && this.variables.player.attack.stance != 'rapid') { //Rapid attack
            this.variables.player.attack.stance = 'rapid';
            panels.chat.text = "Stance switched to: " + this.variables.player.attack.stance + "\n" + panels.chat.text;
        } else if (IsKeyPressed(KEY_3) && this.variables.player.attack.stance != 'defense') { //Defense attack
            this.variables.player.attack.stance = 'defense';
            panels.chat.text = "Stance switched to: " + this.variables.player.attack.stance + "\n" + panels.chat.text;
        }
    }
}

battle.prototype.isAttacking = function() {
    if (IsKeyPressed(KEY_A)) {
        popup.addPopup('standard', ['Attack!', 'Type: ' + this.variables.player.attack.type + '; Stance: ' + this.variables.player.attack.stance]);
    }
}

battle.prototype.attackType = function() {
}

battle.prototype.enemy = function() {
}

battle.prototype.attack = function() {
}
