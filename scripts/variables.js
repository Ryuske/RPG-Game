/*******************
 * Classes: Refer to Google Docs "Character Information" for a list of available classes
 * Occupations: Refer to Google Docs "Character Information" for a list of available occupations
 */
var player = {
    name: 'Ryuske',
    gender: 'male',
    weight: '155lbs',
    inChat: false,
    gold: '500',
    class: 'ninja',
    occupation: 'blacksmith',
    emotions: {
        happiness: '100', //Effects combat, if happy and moral is good: stats +; if happy and moral is evil: stats -
        anger: '0', //Effects combat, if moral is good, lower number = greater stats boost; Visa versa for evil moral
        depression: '0', //Effects combat, lower number = greater stats boost, regardless of moral
        hunger: '0', //Effects combat, lower number = greater stats boost, regeadless of moral; If number >= 75 effects health similarly to poision
        romatics: { //Not sure what this effects as of yet
            name: 'none', //Player name/id
            deepness: '0' //How in-love you are
        }
    }
    stats: {
        moral: '0', //Negative is evil, positive is good. -100-100
        infection: 'none', //Refer to Google Docs "Character Information"
        intelligence: '1', //Need to decide how to level this
        charisma: '1', //Need to decide how to level this
        education: '1' //Need to decide how to level this
    },
    combat_skills: {
        health: '10',
        attack: '1',
        strength: '1',
        defense: '1',
        magic: '1',
        range: '1',
        agility: '1',
        endurence: '1'
    },
    union_skills: {
        thievery: '1',
        education: '1',
        carpentry: '1',
        smithery: '1',
        mining: '1',
        herbology: '1',
        cooking: '1'
    }
}

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
