function npc() {
    if (!this instanceof npc) return new npc();
}

npc.prototype.list = [];

npc.prototype.add = function(character) {
    switch (character) {
        case 'Kai':
            this.list.push(
                        'Kai', {
                            id: 'Kai' + this.list.count('Kai'),
                            name: 'Kai',
                            hp: 25,
                            movement: false, //If the NPC should move or not
                            origin_x: GetPersonX('Kai'), //Where the NPC starts
                            origin_y: GetPersonY('Kai'), //Same as origin_x
                            direction: 0, //Current direction the NPC is headed
                            last_moved: 0, //Number of frames since last moved
                            in_movement: 0, //0 = false, 1 = true
                            player_chat: 0, //Used for keeping track of dialog location
                            need_response: false,
                            chat: [ //Chat dialog, refer to chat.js for better description
                                ['My name is Kai.', 'next'],
                                ['How\'re you?', 'response',
                                    [
                                        ['good', 2],
                                        ['bad', 3]
                                    ]
                                ],
                                ['Fantastic!', 'end'],
                                ['Aw, I\'m sorry.', 'end']
                            ]
                        }
                    );
            break;
        case 'banker':
            this.list.push(
                        'banker', {
                            name: 'banker',
                            movement: false,
                            player_chat: 0,
                            need_response: false,
                            chat: [
                                ['Welcome to the bank!', 'end']
                            ]
                        }
                    );
            break;
        case 'GS Clerk':
            this.list.push(
                        'GS Clerk', {
                            name: 'General Store Clerk',
                            movement: false,
                            player_chat: 0,
                            need_response: false,
                            chat: [
                                ['Can I help you?', 'end']
                            ]
                        }
                    );
            break;
    }
}

npc.prototype.empty = function() {
    this.list = [];
}
