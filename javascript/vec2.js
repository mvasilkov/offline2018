"use strict";
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
}
