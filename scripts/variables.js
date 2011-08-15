var player = {
    name: 'Ryuske',
    inChat: false,
    gold: '500',
    attack_level: 1,
    defense_level: 1
};

var npcs = []; //Refer to npcs.js for explaination on how this array is built

var panels = {
    info: { //Need to make map 11 tiles wider than actually wanted.
        dimensions: {
            x: GetScreenWidth()-164,
            y: 10,
            w: 164,
            h: GetScreenHeight()
        },
        text: "Name: " + player.name + "\nGold: " + player.gold + "\n\nAttack Level: " + player.attack_level + "\nDefense Level: " + player.defense_level + "\n\n\nMore Stuff To Be Added Later..."
    },
    chat: { //Need to make map 5 tiles heigher than actually wanted.
        dimensions: {
            x: 9,
            y: GetScreenHeight()-68,
            w: GetScreenWidth()-196,
            h: 68
        },
        text: "Welcome to some RPG game!"
    },
    npcChat: {text: null, chat: null}
};

var mouse = {
    image: GetSystemArrow(),
    render: null,
    destroy: null,
    draw: null,
    leftClick: null,
    rightClick: null,
    leftButtonDown: null,
    rightButtonDown: null
};

var link; //Link object, defined in play()

var windowStyle = GetSystemWindowStyle();
var font = GetSystemFont();
