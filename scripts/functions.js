function link() {
    this.links = [];
}

link.prototype.addLink = function(x, y, text, callback) {
    font.drawText(x+14.5, y+4, text);

    this.links.push({type: 'text', x: x, y: y, text: text, callback: callback});
}

link.prototype.addBlock = function(x, y, w, h, visual, callback) {
    /*******************
     * x[0] is the x for the image, x[1] is the x for the text inside the image
     * See x for information on y
     * visual[0] is the image, visual[1] is text to be drawn
     */
    if (visual[0].search(/[.]/) == -1) {
        this.color = visual[0].split(',');
        this.surface = CreateSurface(w, h, CreateColor(this.color[0], this.color[1], this.color[2]));
    } else {
        this.surface = LoadSurface(visual[0]);
    }
    if (visual[1] !== undefined) {
        this.surface.drawText(font, x[1], y[1], visual[1]);
    }
    this.surface.blit(x[0]+14.5, y[0]+4);

    this.links.push({type: 'block', x: x[0], y: y[0], w: w, h: h, callback: callback});
}

link.prototype.removeLinks = function() {
    this.links = [];
}

link.prototype.checkLinks = function() {
    if (mouse.leftClick()) {
        for (var i in this.links) {
            if (this.links[i].type == 'block') {
                this.dimensions = {w: this.links[i].w, h: this.links[i].h};
            } else {
                this.dimensions = {w: font.getStringWidth(this.links[i].text), h: font.getHeight()};
            }

            if (GetMouseX() >= this.links[i].x && GetMouseX() <= (this.links[i].x+this.dimensions.w) && GetMouseY() >= this.links[i].y && GetMouseY() <= (this.links[i].y+this.dimensions.h)) {
                if (typeof(this.links[i].callback) != "function") {
                    this.links[i].callback.callback(this.links[i].callback.params); //Need to find a way to have any number of params based on the array
                } else {
                    this.links[0].callback();
                }
            }
        }
    }
}

function switchInfoPanel(to) {
    player.backpack.current_pocket = to;

    switch (to) {
        case 'S/E':
            panels.info.text = "Moral: " + player.stats.moral + "\nIntelligence: " + player.stats.intelligence + "\nCharisma: " + player.stats.charisma + "\nEducation: " + player.stats.education + "\n\nHappiness: " + player.emotions.happiness + "\nAnger: " + player.emotions.anger + "\nDepression: " + player.emotions.depression + "\nHunger: " + player.emotions.hunger + "\nRomance (" + player.emotions.romantics.name + "): " + player.emotions.romantics.deepness;
            break;
        case 'SKL':
            panels.info.text = "Health: " + player.combat_skills.health + "\nAttack: " + player.combat_skills.attack + "\nStrength: " + player.combat_skills.strength + "\nDefense: " + player.combat_skills.defense + "\nMagic: " + player.combat_skills.magic + "\nRange: " + player.combat_skills.range + "\nAgility: " + player.combat_skills.agility + "\nEndurence: " + player.combat_skills.endurence + "\n\nThievery: " + player.union_skills.thievery + "\nCarpentry: " + player.union_skills.carpentry + "\nSmithery: " + player.union_skills.smithery + "\nMining: " + player.union_skills.mining + "\nHerbology: " + player.union_skills.herbology + "\nCooking: " + player.union_skills.cooking;
            break;
        case 'BPK':
            panels.info.text = '';
            for (var i=1; i<=player.backpack.pockets[0]; i++) {
                panels.info.text = panels.info.text + "Pocket " + i + "\n";
                for (var j=0; j<player.backpack.pockets[i][0]; j++) {
                    panels.info.text = panels.info.text + player.backpack.pockets[i][1][j] + "\n---\n";
                }
                panels.info.text = panels.info.text + "\n";
            }
            break;
        case 'EQP':
            panels.info.text = "Weapon: " + player.equipment.weapon + "\nArmor: " + player.equipment.armor + "\nAmulet: " + player.equipment.amulet + "\nRing: " + player.equipment.ring;
            break;
        case 'CBT':
            panels.info.text = 'Combat Menu\nWill be added along with the battle system...';
            break;
    }
}

function WarpMap(map, x, y) {
    if (x === undefined) {
        x = GetPersonX(player.name);
    }
    if (y === undefined) {
        y = GetPersonY(player.name);
    }
    FadeOut(500);
    ChangeMap(map);
    SetPersonX(player.name, x);
    SetPersonY(player.name, y);
    UpdateMapEngine();
    RenderMap();
    FadeIn(500);
}

function recover(type, amount) {
    panels.info.text = 'I recovered!';
}

function backpack(operation, action, item) {
    /**
     * player.backpack.pockets[0] is the number of pockets
     * player.backpack.pockets[1] is the first pocket; player.backpack.pockets[5] is the fifth pocket, etc;
     * player.backpack.pockets[2][0] is how many items the second pocket can hold.
     * player.backpack.pockets[1][1][0]-player.backpack.pockets[1][1][2] are all items.
     */
    if (operation == 'initalize') {
        switch(action) {
            case 'Plain Backpack':
                player.backpack.pockets = [3];
                player.backpack.pockets[1] = [3, ['', '', '']];
                player.backpack.pockets[2] = [3, ['', '', '']];
                player.backpack.pockets[3] = [3, ['', '', '']];
                break;
            case 'Deluxe Backpack':
                player.backpack.pockets = [10];
                player.backpack.pockets[1] = [10, ['', '', '', '', '', '', '', '', '', '']];
                player.backpack.pockets[2] = [10, ['', '', '', '', '', '', '', '', '', '']];
                player.backpack.pockets[3] = [5, ['', '', '', '', '']];
                player.backpack.pockets[4] = [5, ['', '', '', '', '']];
                player.backpack.pockets[5] = [5, ['', '', '', '', '']];
                player.backpack.pockets[6] = [3, ['', '', '']];
                player.backpack.pockets[7] = [3, ['', '', '']];
                player.backpack.pockets[8] = [3, ['', '', '']];
                player.backpack.pockets[9] = [3, ['', '', '']];
                player.backpack.pockets[10] = [3, ['', '', '']];
                break;
            default:
                //Error reporting window goes here
        }
    } else if (operation == 'add') {
        //action is an array; 0 is the pocket 1 is the position
        player.backpack.pockets[action[0]][1][action[1]] = item;
    } else if (operation == 'move') {
        //action is an array; 0 is the existing pocket, 1 is the existing position, 2 is the new pocket, and 3 is the new position
        backpack('remove', [action[0], action[1]], item);
        player.backpack.pockets[action[2]][1][action[3]] = item;
    } else if (operation == 'remove') {
        player.backpack.pockets[action[0]][1][action[1]] = '';
    }
}
