"use strict";
/// <reference path="you_have_to.d.ts" />
const gravity = 48;
const jumpAcceleration = -900;
const playerSize = 40;
const playerStart = new Vec2(60, 200);
class Player {
    constructor() {
        this.doubleJump = false;
        this.onGround = false;
        this.pos = playerStart.copy();
        this.prevPos = playerStart.copy();
        this.r = 0.5 * playerSize;
        this.velocity = new Vec2(0, 0);
    }
    update(t) {
        const jumping = controls[1][2 /* UP */] || controls[2][2 /* UP */];
        if (jumping) {
            if (this.onGround) {
                this.onGround = false;
                this.velocity.y = t * jumpAcceleration;
            }
            else if (this.doubleJump) {
                this.doubleJump = false;
                this.velocity.y = t * jumpAcceleration;
            }
            controls[1][2 /* UP */] = controls[2][2 /* UP */] = false;
        }
        this.prevPos.setTo(this.pos);
        this.velocity.y += t * gravity;
        this.pos.add(this.velocity);
        if (this.pos.y >= stageFloor - this.r) {
            this.doubleJump = true;
            this.onGround = true;
            this.pos.y = stageFloor - this.r;
            this.velocity.y = 0;
        }
    }
    render(c, t) {
        const x = t * this.pos.x + (1 - t) * this.prevPos.x;
        const y = t * this.pos.y + (1 - t) * this.prevPos.y;
        c.fillStyle = '#fff';
        c.fillRect(x - this.r, y - this.r, playerSize, playerSize);
    }
}
