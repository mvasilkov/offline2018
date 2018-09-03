"use strict";
/// <reference path="you_have_to.d.ts" />
const stageFloor = 440;
const stageSize = 880;
class Stage {
    render(c) {
        c.fillStyle = '#fff';
        c.fillRect(40, stageFloor, stageSize, 4);
    }
}
