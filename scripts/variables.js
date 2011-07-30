var player = {name: 'Ryuske', gold: '500', attack_level: 1, defense_level: 1};  
var npcs = []; //id (array location of NPC), name, origin_x, origin_y, current_x, current_y direction (if moving, go this way), since_moved (number of frames since last moved), in_movement
var panel_text = {
    chat: "Welcome to some RPG game!",
    info: "Name: " + player.name + "\nGold: " + player.gold + "\n\nAttack Level: " + player.attack_level + "\nDefense Level: " + player.defense_level + "\n\n\nMore Stuff To Be Added Later..."
};
var mouse = {image: GetSystemArrow(), destroyed: false, render: null, destroy: null, draw: null, leftClick: null, rightClick: null, leftButtonDown: null, rightButtonDown: null};
