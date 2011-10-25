function chat() {
    if (!this instanceof chat) return new chat();
}

chat.prototype.links = function() {}

chat.prototype.links.list = [];

chat.prototype.npc = '';

chat.prototype.init = function(character) {
    player.inChat = true;
    chat.npc = npc.list.fromKey(character);
    if (npc.list.fromKey(character).chat[0][1] == 'response') {
        panels.npcChat.text = npc.list.fromKey(character).chat[0][0];
        npc.list.fromKey(character).need_response = true;
    } else {
        panels.npcChat.text = npc.list.fromKey(character).chat[0][0];
    }
    npc.list.fromKey(character).player_chat = 1;
    chat.links.add('next');
}

chat.prototype.next = function(dialog) {
    chat.links.remove();
    panels.npcChat.text = '';
    if (dialog === undefined) {
        dialog = chat.npc.player_chat;
    }
    
    if (chat.npc !== false) {
        if (dialog < chat.npc.chat.length) {
            if (chat.npc.chat[dialog][1] == 'response') {
                if (chat.npc.need_response) {
                    for (var i=0; i<chat.npc.chat[dialog][2].length; i++) {
                        chat.links.add(chat.npc.chat[dialog][2][i][0], {callback: chat.next, params: chat.npc.chat[dialog][2][i][1]});
                    }
                    chat.npc.need_response = false;
                } else {
                    panels.npcChat.text = chat.npc.chat[dialog][0];
                    chat.npc.need_response = true;
                    chat.links.add('next');
                }
            } else if (chat.npc.chat[dialog][1] == 'next') {
                panels.npcChat.text = chat.npc.chat[dialog][0];
                chat.npc.player_chat++;
                chat.links.add('next');
            } else {
                panels.npcChat.text = chat.npc.chat[dialog][0];
                chat.npc.player_chat = chat.npc.chat.length;
                chat.links.add('next');
            }
        } else {
            player.inChat = false;
            chat.links.remove();
            link.removeLinks();
        }
    }
}

chat.prototype.links.add = function(link, callback) {
    if (link == 'next') {
        link = 'Click here to continue.';
    }
    if (callback === undefined) {
        callback = chat.next;
    }

    chat.links.list.push({text: link, callback: callback});
}

chat.prototype.links.remove = function() {
    chat.links.list = [];
}

chat.prototype.links.render = function() {
    link.removeLinks();
    if (chat.links.list.length > 1) {
        chat.links.render.spacing = panels.chat.dimensions.h/chat.links.list.length;
        foreach(chat.links.list, '\
            link.addLink((panels.chat.dimensions.w-font.getStringWidth(chat.links.list[i].text))/2, GetScreenHeight()-panels.chat.dimensions.h+chat.links.render.spacing*i, chat.links.list[i].text, chat.links.list[i].callback); \
        ');
    } else if (chat.links.list.length > 0) {
        link.addLink((panels.chat.dimensions.w-font.getStringWidth(chat.links.list[0].text))/2, GetScreenHeight()-22, chat.links.list[0].text, chat.links.list[0].callback);
    }
}
