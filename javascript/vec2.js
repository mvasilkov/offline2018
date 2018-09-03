"use strict";
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    setTo(other) {
        this.x = other.x;
        this.y = other.y;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
}
