var player = {name: 'Ryuske', gold: '500', attack_level: 1, defense_level: 1};  
var panel_text = {
    chat: "Welcome to some RPG game!",
    info: "Name: " + player.name + "\nGold: " + player.gold + "\n\nAttack Level: " + player.attack_level + "\nDefense Level: " + player.defense_level + "\n\n\nMore Stuff To Be Added Later..."
};
var mouse = {image: GetSystemArrow(), destroyed: false, render: null, destroy: null, draw: null, leftClick: null, rightClick: null, leftButtonDown: null, rightButtonDown: null};
var solid; //Need to figure out what to do with these. Make change it to a dictionary, such as tile_actions or something
