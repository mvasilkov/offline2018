"use strict";
/// <reference path="you_have_to.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var laserActive = 0.82;
var laserFadeOut = 0.24;
var laserPrefire = 0.4;
var laserSize = 120;
var prefireColor = '#ff1507';
var laserPalette = ['#ffdc26', '#fdec4a', '#fff699', '#fffee6'];
var Laser = /** @class */ (function () {
    function Laser(activation, y) {
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
        this.sound = true;
    }
    Laser.prototype.reset = function () {
        this.killing = false;
        this.paletteIndex = 0;
        this.r = 0.5 * laserSize;
        this.rPrev = this.r;
        this.t = 0;
        this.sound = true;
    };
    Laser.prototype.kills = function (p) {
        return this.killing && !p.dead && Math.abs(this.y - p.pos.y) < this.r + p.r;
    };
    Laser.prototype.update = function (t) {
        this.t += t;
        this.killing = this.t > this.activation + laserPrefire && this.t < this.end;
        this.rPrev = this.r;
        this.r = 0.5 * laserSize * clamp(-this.a * this.t + this.b, 0, 1);
    };
    Laser.prototype.render = function (c, t) {
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
            var r = lerp(this.rPrev, this.r, t);
            c.fillStyle = laserPalette[this.paletteIndex];
            this._paint(c, r);
            if (this.sound) {
                this.sound = false;
                aa.play('las');
            }
        }
    };
    Laser.prototype._paint = function (c, r) {
        c.fillRect(0, this.y - r, cwidth, 2 * r);
    };
    Laser.prototype._paintPrefire = function (c) {
        c.fillRect(0, this.y - 1, cwidth, 3);
    };
    return Laser;
}());
var LaserV = /** @class */ (function (_super) {
    __extends(LaserV, _super);
    function LaserV() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LaserV.prototype.kills = function (p) {
        return this.killing && !p.dead && Math.abs(this.y - p.pos.x) < this.r + p.r;
    };
    LaserV.prototype._paint = function (c, r) {
        c.fillRect(this.y - r, 0, 2 * r, cheight);
    };
    LaserV.prototype._paintPrefire = function (c) {
        c.fillRect(this.y - 1, 0, 3, cheight);
    };
    return LaserV;
}(Laser));
