function chatToNPC(npc) {
    player.inChat = npcs[npc].id;
    if (npcs[npc].chat[0][1] == "response") {
        panels.npcChat.text = npcs[npc].chat[0][0];
        npcs[npc].need_response = true;
    } else {
        panels.npcChat.text = npcs[npc].chat[0][0];
    }
    npcs[npc].player_chat = 1;
    panels.npcChat.chat = new chatLinks();
    panels.npcChat.chat.addLink("next");
}

function chatNext(dialog) {
    panels.npcChat.chat.removeLinks();
    panels.npcChat.text = "";
    if (dialog === undefined) {
        dialog = npcs[player.inChat].player_chat;
    }
    
    if (npcs[player.inChat] !== false) {
        if (dialog < npcs[player.inChat].chat.length) {
            if (npcs[player.inChat].chat[dialog][1] == "response") {
                if (npcs[player.inChat].need_response) {
                    for (var i in npcs[player.inChat].chat[dialog][2]) {
                        panels.npcChat.chat.addLink(npcs[player.inChat].chat[dialog][2][i][0], {callback: chatNext, params: npcs[player.inChat].chat[dialog][2][i][1]});
                        npcs[player.inChat].need_response = false;
                    }
                } else {
                    panels.npcChat.text = npcs[player.inChat].chat[dialog][0];
                    npcs[player.inChat].need_response = true;
                    panels.npcChat.chat.addLink("next");
                }
            } else if (npcs[player.inChat].chat[dialog][1] == "next") {
                panels.npcChat.text = npcs[player.inChat].chat[dialog][0];
                npcs[player.inChat].player_chat++;
                panels.npcChat.chat.addLink("next");
            } else {
                panels.npcChat.text = npcs[player.inChat].chat[dialog][0];
                npcs[player.inChat].player_chat = npcs[player.inChat].chat.length;
                panels.npcChat.chat.addLink("next");
            }
        } else {
            player.inChat = false;
        }
    }
}

function chatLinks() {
    if (!this instanceof chatLinks) return new chatLinks();
    this.links = [];
}

chatLinks.prototype.addLink = function(link, callback) {
    if (link == "next") {
        link = "Click here to continue.";
    }
    if (callback === undefined) {
        callback = chatNext;
    }

    this.links.push({text: link, callback: callback});
}

chatLinks.prototype.removeLinks = function() {
    this.links = [];
}

chatLinks.prototype.render = function() {
    link.removeLinks();
    if (this.links.length > 1) {
        this.spacing = panels.chat.dimensions.h/this.links.length;
        for (var i in this.links) {
            link.addLink((panels.chat.dimensions.w-font.getStringWidth(this.links[i].text))/2, GetScreenHeight()-panels.chat.dimensions.h+this.spacing*i, this.links[i].text, this.links[i].callback);
        }
    } else if (this.links.length > 0) {
        link.addLink((panels.chat.dimensions.w-font.getStringWidth(this.links[0].text))/2, GetScreenHeight()-22, this.links[0].text, this.links[0].callback);
    }
}
