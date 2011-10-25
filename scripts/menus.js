/**********************
 * Used for stuff like shop menus, or anything else I might need a menu for...
 */

function menuMain() {
    this.menu = new Menu();
    this.menu.addItem('Play', play);
    this.menu.addItem('Exit', Exit);
    this.menu.execute(GetScreenWidth()/2-80, GetScreenHeight()/2-40, 160, 80);
}
