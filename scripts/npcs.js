function addNpc(npc) {
    switch (npc) {
        case "Kai":
            npcs[0] = {
                        id: 0, //NPCs id number
                        name: "Kai",
                        origin_x: GetPersonX("Kai"), //Where the NPC starts
                        origin_y: GetPersonY("Kai"), //Same as origin_x
                        current_x: GetPersonX("Kai"), //The current map position of the NPC (might be deprecated)
                        current_y: GetPersonY("Kai"), //Same as current_x
                        direction: 0, //Current direction the NPC is headed
                        last_moved: 0, //Number of frames since last moved
                        in_movement: 0, //0 = false, 1 = true
                        player_chat: 0,
                        need_response: false,
                        chat: [ //Chat dialog, refer to chat.js for better description
                            ["My name is Kai.", "next"],
                            ["How're you?", "response",
                                [
                                    ["good", 2],
                                    ["bad", 3]
                                ]
                            ],
                            ["Fantastic!", "end"],
                            ["Aw, I'm sorry.", "end"]
                        ] //Chat dialog for this NPC, refer to chat.js
                    };
            break;
    }
}