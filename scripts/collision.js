function collision(person, x, y) {
    if (IsPersonObstructed(person, x, y)) {
        return true;
    } else {
        return false;
    }
}
