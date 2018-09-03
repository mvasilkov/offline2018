"use strict";
/// <reference path="you_have_to.d.ts" />
const playerSize = 40;
const playerStart = new Vec2(60, 250);
class Player {
    constructor() {
        this.pos = playerStart.copy();
    }
    render(c) {
        c.fillStyle = '#fff';
        c.fillRect(this.pos.x - 0.5 * playerSize, this.pos.y - 0.5 * playerSize, playerSize, playerSize);
    }
}
