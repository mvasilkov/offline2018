"use strict";
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vec2.prototype.setTo = function (other) {
        this.x = other.x;
        this.y = other.y;
    };
    Vec2.prototype.copy = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
    };
    return Vec2;
}());
