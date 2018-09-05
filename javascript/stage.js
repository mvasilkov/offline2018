"use strict";
/// <reference path="you_have_to.d.ts" />
const stageFloor = 440;
const stageSize = 880;
const stagePadding = 0.5 * (cwidth - stageSize);
const stageEnd = stagePadding + stageSize;
const colSize = 40;
class Stage {
    constructor() {
        this.columns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    getFloor(x, x2) {
        const a = stageFloor - this.columns[Math.floor((x - stagePadding) / colSize)];
        const b = stageFloor - this.columns[Math.floor((x2 - stagePadding) / colSize)];
        return a < b ? [a, b] : [b, a];
    }
    getWall(x, y) {
        const n = Math.floor((x - stagePadding) / colSize);
        if (y > stageFloor - this.columns[n]) {
            return stagePadding + n * colSize;
        }
        return x;
    }
    render(c) {
        c.fillStyle = '#fff';
        c.fillRect(stagePadding, stageFloor, stageSize, 4);
        c.fillStyle = '#aaa';
        for (let n = 0; n < 20; ++n) {
            const left = stagePadding + n * colSize;
            const top = stageFloor - this.columns[n];
            c.fillRect(left, top, colSize, this.columns[n]);
        }
    }
}
