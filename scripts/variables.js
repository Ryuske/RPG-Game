var player = {name: 'Ryuske', gold: '500', attack_level: 1, defense_level: 1};  
var npcs = []; //id (array location of NPC), name, origin_x, origin_y, current_x, current_y direction (if moving, go this way), since_moved (number of frames since last moved), in_movement
var panels = {
    chat: {dimensions: {x: 10, y: GetScreenHeight()-60, w: GetScreenWidth()-202, h: 60}, text: "Welcome to some RPG game!"},
    info: {dimensions: {x: GetScreenWidth()-170, y: 10, w: 170, h: GetScreenHeight()}, text: "Name: " + player.name + "\nGold: " + player.gold + "\n\nAttack Level: " + player.attack_level + "\nDefense Level: " + player.defense_level + "\n\n\nMore Stuff To Be Added Later..."}
};
var mouse = {image: GetSystemArrow(), on: "main", render: null, destroy: null, draw: null, leftClick: null, rightClick: null, leftButtonDown: null, rightButtonDown: null};

var windowStyle = GetSystemWindowStyle();
var font = GetSystemFont();
