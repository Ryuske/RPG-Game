function panelButtons() {
    windowStyle.drawWindow(panels.buttons.dimensions.x, panels.buttons.dimensions.y, panels.buttons.dimensions.w, panels.buttons.dimensions.h);
    font.drawTextBox(panels.buttons.dimensions.x, panels.buttons.dimensions.y, panels.buttons.dimensions.w, panels.buttons.dimensions.h, 0, '');

    panels.info.text = '';
    foreach(panels.buttons.button, "\
        link.addBlock(panels.buttons.button[i].x, panels.buttons.button[i].y, panels.buttons.button[i].w, panels.buttons.button[i].h, panels.buttons.button[i].visual, panels.buttons.button[i].callback); \
    ");
}

function panelInfo(operation) {
    windowStyle.drawWindow(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h);
    font.drawTextBox(panels.info.dimensions.x, panels.info.dimensions.y, panels.info.dimensions.w, panels.info.dimensions.h, 0, panels.info.text);
}

function panelGameChat() {
    windowStyle.drawWindow(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h);
    font.drawTextBox(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h, 0, panels.chat.text);
}

function panelNpcChat() {
    windowStyle.drawWindow(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h);
    font.drawTextBox(panels.chat.dimensions.x, panels.chat.dimensions.y, panels.chat.dimensions.w, panels.chat.dimensions.h, 0, panels.npcChat.text);
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
