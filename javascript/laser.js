"use strict";
/// <reference path="you_have_to.d.ts" />
const laserActive = 0.82;
const laserFadeOut = 0.24;
const laserPrefire = 0.4;
const laserSize = 120;
const prefireColor = '#ff1507';
const laserPalette = ['#ffdc26', '#fdec4a', '#fff699', '#fffee6'];
class Laser {
    constructor(activation, y) {
        this.activation = activation;
        this.end = activation + laserPrefire + laserActive;
        this.killing = false;
        this.paletteIndex = 0;
        this.r = 0.5 * laserSize;
        this.rPrev = this.r;
        this.t = 0;
        this.y = y;
        this.a = 1 / laserFadeOut;
        this.b = this.end / laserFadeOut;
    }
    reset() {
        this.killing = false;
        this.paletteIndex = 0;
        this.r = 0.5 * laserSize;
        this.rPrev = this.r;
        this.t = 0;
    }
    kills(p) {
        return this.killing && !p.dead && Math.abs(this.y - p.pos.y) < this.r + p.r;
    }
    update(t) {
        this.t += t;
        this.killing = this.t > this.activation + laserPrefire && this.t < this.end;
        this.rPrev = this.r;
        this.r = 0.5 * laserSize * clamp(-this.a * this.t + this.b, 0, 1);
    }
    render(c, t) {
        this.paletteIndex = (this.paletteIndex + 1) % 4;
        if (this.t < this.activation || this.t > this.end)
            return;
        if (this.t < this.activation + laserPrefire) {
            if (this.paletteIndex & 2)
                return;
            c.fillStyle = prefireColor;
            this._paintPrefire(c);
        }
        else {
            const r = lerp(this.rPrev, this.r, t);
            c.fillStyle = laserPalette[this.paletteIndex];
            this._paint(c, r);
        }
    }
    _paint(c, r) {
        c.fillRect(0, this.y - r, cwidth, 2 * r);
    }
    _paintPrefire(c) {
        c.fillRect(0, this.y - 1, cwidth, 3);
    }
}
class LaserV extends Laser {
    kills(p) {
        return this.killing && !p.dead && Math.abs(this.y - p.pos.x) < this.r + p.r;
    }
    _paint(c, r) {
        c.fillRect(this.y - r, 0, 2 * r, cheight);
    }
    _paintPrefire(c) {
        c.fillRect(this.y - 1, 0, 3, cheight);
    }
}
