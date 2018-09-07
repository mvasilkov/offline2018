"use strict";
/// <reference path="you_have_to.d.ts" />
const stageFloor = 440;
const stageSize = 880;
const stagePadding = 0.5 * (cwidth - stageSize);
const stageEnd = stagePadding + stageSize;
const colSize = 40;
const colCount = stageSize / colSize;
class Stage {
    constructor(lvl) {
        this.columns = lvl.cols;
        this.lasers = lvl.lasers.map(a => new (a.v ? LaserV : Laser)(a.act, a.v ? stagePadding + a.pos : stageFloor - a.pos));
        this.staticImage = makeSprite(cwidth, cheight, this.renderOnce.bind(this));
        renderBackground(bcontext, lvl.title, lvl.ez);
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
    reset() {
        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].reset();
        }
    }
    kills(p) {
        for (let n = 0; n < this.lasers.length; ++n) {
            if (this.lasers[n].kills(p))
                return true;
        }
        return false;
    }
    update(t) {
        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].update(t);
        }
    }
    render(c, t) {
        c.drawImage(this.staticImage, 0, 0);
        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].render(c, t);
        }
    }
    renderOnce(c) {
        for (let n = 0; n < colCount; ++n) {
            const left = stagePadding + n * colSize;
            if (this.columns[n] == HOLE) {
                c.fillStyle = '#fff';
                if (n != 0 && this.columns[n - 1] != HOLE) {
                    // c.fillRect(left - 2, stageFloor + 4, 2, 96)
                    c.fillRect(left - 2, stageFloor + 4, 2, 36);
                    c.fillRect(left - 2, stageFloor + 55, 2, 20);
                    c.fillRect(left - 2, stageFloor + 90, 2, 10);
                }
                if (n != colCount - 1 && this.columns[n + 1] != HOLE) {
                    // c.fillRect(left + colSize, stageFloor + 4, 2, 96)
                    c.fillRect(left + colSize, stageFloor + 4, 2, 36);
                    c.fillRect(left + colSize, stageFloor + 55, 2, 20);
                    c.fillRect(left + colSize, stageFloor + 90, 2, 10);
                }
            }
            else {
                const top = stageFloor - this.columns[n];
                c.fillStyle = '#fff';
                c.fillRect(left, stageFloor, colSize, 4);
                c.fillStyle = '#f1f1f1';
                c.fillRect(left, top, colSize, this.columns[n]);
            }
        }
    }
}
