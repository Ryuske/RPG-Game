/*******************
 * Classes: Refer to Google Docs 'Character Information' for a list of available classes
 * Occupations: Refer to Google Docs 'Character Information' for a list of available occupations
 *
 * All weights are in pounds, at the moment
 */
var player = {
    name: 'Ryuske',
    gender: 'Male',
    weight: '155',
    inChat: false,
    char_class: 'Ninja',
    occupation: 'Blacksmith',
    battle: {
        attack: {
            type: '',
            stance: ''
        },
        enemy: ''
    },
    emotions: {
        happiness: '100', //Effects combat, if happy and moral is good: stats +; if happy and moral is evil: stats -
        anger: '0', //Effects combat, if moral is good, lower number = greater stats boost; Visa versa for evil moral
        depression: '0', //Effects combat, lower number = greater stats boost, regardless of moral
        hunger: '0', //Effects combat, lower number = greater stats boost, regeadless of moral; If number >= 75 effects health similarly to poision
        romantics: { //Not sure what this effects as of yet
            name: 'No-one', //Player name/id
            deepness: '0' //How in-love you are
        }
    },
    stats: {
        moral: '0', //Negative is evil, positive is good. -100-100
        infection: 'none', //Refer to Google Docs 'Character Information'
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
        carpentry: '1',
        smithery: '1',
        mining: '1',
        herbology: '1',
        cooking: '1'
    },
    backpack: {current_pocket: 'S/E', pockets: ''},
    equipment: {
        weapon: 'Copper Ninjato',
        armor: 'Silk Shozoku',
        amulet: 'None',
        ring: 'None',
    }
};

var items = [
    //Union items
    'Gold',
    {
        description: 'It\'s kind of heavy, but it sure looks pretty!'
    },
    'Potion',
    {
        description: 'Heals some health',
        price: '150',
        callback: [recover, 'health', 10]
    },
    'Elixr',
    {
        description: 'Recovers some endurance',
        price: '150',
        callback: [recover, 'edurence', 10]
    },
    'Copper Ore',
    {
        name: 'Copper Ore',
        description: 'Some raw copper',
        price: '50'
    },
    //Weapons
    'Copper Ninjato',
    {
        description: 'A flimsy, short, straight sword',
        char_class: 'Ninja',
        weight: '5',
        attack: '1'
    },
    'Copper Katana',
    {
        description: 'A sword, used for cutting through bambo... And enemies.',
        char_class: 'Samurai',
        weight: '7',
        attack: '1'
    },
    'Copper Broad Sword',
    {
        description: 'A giant sword made of copper.',
        char_class: 'Warrior',
        weight: '14',
        attack: '2'
    },
    'Pine Bow',
    {
        description: 'A bow for an archer',
        char_class: 'Archer',
        weight: '3',
        attack: '1'
    },
    'Pine Arrow',
    {
        description: 'An arrow crafted out of pine wood',
        char_class: 'Archer',
        weight: '0.5',
        attack: '1'
    },
    'Pine Staff',
    {
        description: 'A staff with magical powers flowing through it',
        char_class: 'Mage',
        weight: '5',
        attack: '1'
    },
    //Armor
    'Silk Shozoku',
    {
        description: 'A fine cloak for a fine Ninja',
        char_class: 'Ninja',
        weight: '1',
        defense: '1'
    },
    'Copper Wafu',
    {
        description: 'Now that\'s scary looking...',
        char_class: 'Samurai',
        weight: '10',
        defense: '1'
    },
    'Copper Platemail',
    {
        description: 'Looks heavy',
        char_class: 'Warrior',
        weight: '10',
        defense: '1'
    },
    'Silk Tunic',
    {
        description: 'Looks a little fancy for forrest fighting...',
        char_class: 'Archer',
        weight: '1',
        defense: '1'
    },
    'Silk Robe',
    {
        description: 'Looks magical',
        char_class: 'Mage',
        weight: '1',
        defense: '1'
    }
];

var windowStyle = GetSystemWindowStyle();
var font = GetSystemFont();

var panels = {
    buttons: { //Used to change info panel infomation
        dimensions: {
            x: GetScreenWidth()-164,
            y: 10,
            w: 164,
            h: 35
        },
        button: [
            {x: [GetScreenWidth()-37.3*5, 33/2-font.getStringWidth('S/E')/2], y: [-1.5, font.getHeight()/1.5], w: 33, h: 30, visual: ['0, 0, 0', 'S/E'], callback: {callback: switchInfoPanel, params: 'S/E'}},
            {x: [GetScreenWidth()-38*4, 33/2-font.getStringWidth('SKL')/2], y: [-1.5, font.getHeight()/1.5], w: 33, h: 30, visual: ['0, 0, 0', 'SKL'], callback: {callback: switchInfoPanel, params: 'SKL'}},
            {x: [GetScreenWidth()-38.9*3, 33/2-font.getStringWidth('BPK')/2], y: [-1.5, font.getHeight()/1.5], w: 33, h: 30, visual: ['0, 0, 0', 'BPK'], callback: {callback: switchInfoPanel, params: 'BPK'}},
            {x: [GetScreenWidth()-40.9*2, 33/2-font.getStringWidth('EQP')/2], y: [-1.5, font.getHeight()/1.5], w: 33, h: 30, visual: ['0, 0, 0', 'EQP'], callback: {callback: switchInfoPanel, params: 'EQP'}},
            {x: [GetScreenWidth()-46.5, 33/2-font.getStringWidth('CBT')/2], y: [-1.5, font.getHeight()/1.5], w: 33, h: 30, visual: ['0, 0, 0', 'CBT'], callback: {callback: switchInfoPanel, params: 'CBT'}}
        ]
    },
    info: { //Need to make map 11 tiles wider than actually wanted.
        dimensions: {
            x: GetScreenWidth()-164,
            y: 45,
            w: 164,
            h: GetScreenHeight()
        },
        text: ''
    },
    chat: { //Need to make map 5 tiles heigher than actually wanted.
        dimensions: {
            x: 9,
            y: GetScreenHeight()-68,
            w: GetScreenWidth()-196,
            h: 68
        },
        text: 'Welcome to some RPG game!'
    },
    npcChat: {text: null}
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

var images = {
    combat: {
        red: LoadImage('../images/combat/red_splat.jpg'),
        blue: LoadImage('../images/combat/blue_splat.jpg'),
        melee_animation: LoadImage('../images/combat/melee_animation.jpg')
    }
}

var link; //Link object, defined in play()
var backpack; //Backpack object, defined in play()
var chat; //Chat object, defined in play()
var popup; //Popup object
var popup_entities;
var npc; //NPC object
