"use strict";
/// <reference path="you_have_to.d.ts" />
var stageFloor = 440;
var stageSize = 880;
var stagePadding = 0.5 * (cwidth - stageSize);
var stageEnd = stagePadding + stageSize;
var colSize = 40;
var colCount = stageSize / colSize;
var Stage = /** @class */ (function () {
    function Stage(lvl) {
        this.columns = lvl.cols;
        this.lasers = lvl.lasers.map(function (a) {
            return new (a.v ? LaserV : Laser)(a.act, a.v ? stagePadding + a.pos : stageFloor - a.pos);
        });
        this.staticImage = makeSprite(cwidth, cheight, this.renderOnce.bind(this));
        if (lvl.render)
            lvl.render(this.staticImage.getContext('2d'));
        renderBackground(bcontext, lvl.title, lvl.ez);
        if (lvl.renderBackground)
            lvl.renderBackground(bcontext);
    }
    Stage.prototype.getFloor = function (x, x2) {
        var a = stageFloor - this.columns[Math.floor((x - stagePadding) / colSize)];
        var b = stageFloor - this.columns[Math.floor((x2 - stagePadding) / colSize)];
        return a < b ? [a, b] : [b, a];
    };
    Stage.prototype.getWall = function (x, y) {
        var n = Math.floor((x - stagePadding) / colSize);
        if (y > stageFloor - this.columns[n]) {
            return stagePadding + n * colSize;
        }
        return x;
    };
    Stage.prototype.reset = function () {
        for (var n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].reset();
        }
    };
    Stage.prototype.kills = function (p) {
        for (var n = 0; n < this.lasers.length; ++n) {
            if (this.lasers[n].kills(p))
                return true;
        }
        return false;
    };
    Stage.prototype.update = function (t) {
        for (var n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].update(t);
        }
    };
    Stage.prototype.render = function (c, t) {
        c.drawImage(this.staticImage, 0, 0);
        for (var n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].render(c, t);
        }
    };
    Stage.prototype.renderOnce = function (c) {
        for (var n = 0; n < colCount; ++n) {
            var left = stagePadding + n * colSize;
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
                var top_1 = stageFloor - this.columns[n];
                c.fillStyle = '#fff';
                c.fillRect(left, stageFloor, colSize, 4);
                c.fillStyle = '#f1f1f1';
                c.fillRect(left, top_1, colSize, this.columns[n]);
            }
        }
    };
    return Stage;
}());
