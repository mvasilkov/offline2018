"use strict";
/// <reference path="you_have_to.d.ts" />
const gravity = 48;
const jumpAccel = -900;
const walkSpeed = 7;
const playerSize = 40;
const playerStart = new Vec2(60, 160);
class Player {
    constructor() {
        this.doubleJump = false;
        this.onGround = false;
        this.pos = playerStart.copy();
        this.prevPos = playerStart.copy();
        this.r = 0.5 * playerSize;
        this.velocity = new Vec2(0, 0);
    }
    restart() {
        this.doubleJump = false;
        this.onGround = false;
        this.pos = playerStart.copy();
        this.prevPos = playerStart.copy();
        this.velocity = new Vec2(0, 0);
    }
    standOn(floor) {
        this.doubleJump = true;
        this.onGround = true;
        this.pos.y = floor - this.r;
        this.velocity.x = walkSpeed;
        this.velocity.y = 0;
    }
    update(t, stage) {
        const jumping = controls[1][2 /* UP */] || controls[2][2 /* UP */];
        if (jumping) {
            if (this.onGround) {
                this.onGround = false;
                this.velocity.y = t * jumpAccel;
            }
            else if (this.doubleJump) {
                this.doubleJump = false;
                this.velocity.y = t * jumpAccel;
            }
            controls[1][2 /* UP */] = controls[2][2 /* UP */] = false;
        }
        this.prevPos.setTo(this.pos);
        this.velocity.y += t * gravity;
        this.pos.add(this.velocity);
        if (this.pos.x > stageEnd - this.r) {
            this.restart();
            return;
        }
        const [floor, floor2] = stage.getFloor(this.pos.x - this.r, this.pos.x + this.r);
        if (this.pos.y >= floor - this.r && this.prevPos.y <= floor - this.r) {
            this.standOn(floor);
        }
        else if (this.pos.y >= floor2 - this.r && this.prevPos.y <= floor2 - this.r) {
            this.standOn(floor2);
        }
        if (this.pos.y > cheight + this.r) {
            this.restart();
            return;
        }
        const wall = stage.getWall(this.pos.x + this.r, this.pos.y + this.r);
        if (this.pos.x > wall - this.r) {
            this.pos.x = wall - this.r;
        }
    }
    render(c, t) {
        const x = t * this.pos.x + (1 - t) * this.prevPos.x;
        const y = t * this.pos.y + (1 - t) * this.prevPos.y;
        c.fillStyle = '#fff';
        c.fillRect(x - this.r, y - this.r, playerSize, playerSize);
    }
}
