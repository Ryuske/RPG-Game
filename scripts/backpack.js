function backpack(type) {
    /**
     * player.backpack.pockets[0] is the number of pockets
     * player.backpack.pockets[1] is the first pocket; player.backpack.pockets[5] is the fifth pocket, etc;
     * player.backpack.pockets[2][0] is how many items the second pocket can hold.
     * player.backpack.pockets[1][1][0]-player.backpack.pockets[1][1][2] are all items.
     */
    switch(type) {
        case 'Plain Backpack':
            player.backpack.pockets = [3];
            player.backpack.pockets[1] = [3, ['', '', '']];
            player.backpack.pockets[2] = [3, ['', '', '']];
            player.backpack.pockets[3] = [3, ['', '', '']];
            break;
        case 'Deluxe Backpack':
            player.backpack.pockets = [10];
            player.backpack.pockets[1] = [10, ['', '', '', '', '', '', '', '', '', '']];
            player.backpack.pockets[2] = [10, ['', '', '', '', '', '', '', '', '', '']];
            player.backpack.pockets[3] = [5, ['', '', '', '', '']];
            player.backpack.pockets[4] = [5, ['', '', '', '', '']];
            player.backpack.pockets[5] = [5, ['', '', '', '', '']];
            player.backpack.pockets[6] = [3, ['', '', '']];
            player.backpack.pockets[7] = [3, ['', '', '']];
            player.backpack.pockets[8] = [3, ['', '', '']];
            player.backpack.pockets[9] = [3, ['', '', '']];
            player.backpack.pockets[10] = [3, ['', '', '']];
            break;
        default:
            //Error reporting window goes here
    }
}

backpack.prototype.addItem = function(position, item) {
    //position is an array; 0 is the pocket 1 is the position
    player.backpack.pockets[position[0]][1][position[1]] = item;
}

backpack.prototype.moveItem = function(position, item) {
    //position is an array; 0 is the existing pocket, 1 is the existing position, 2 is the new pocket, and 3 is the new position
    backpack.removeItem([position[0], position[1]], item);
    player.backpack.pockets[position[2]][1][position[3]] = item;
}

backpack.prototype.removeItem = function(position) {
    player.backpack.pockets[position[0]][1][position[1]] = '';
}
