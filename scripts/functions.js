function WarpMap(map, x, y) {
    if (x === undefined) {
        x = GetPersonX(player.name);
    }
    if (y === undefined) {
        y = GetPersonY(player.name);
    }
    FadeOut(500);
    ChangeMap(map);
    SetPersonX(player.name, x);
    SetPersonY(player.name, y);
    UpdateMapEngine();
    RenderMap();
    FadeIn(500);
}

function recover(type, amount) {
    panels.info.text = 'I recovered!';
}
