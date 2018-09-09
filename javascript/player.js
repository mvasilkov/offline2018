"use strict";
/// <reference path="you_have_to.d.ts" />
var gravity = 48;
var jumpAccel = -900;
var walkSpeed = 7;
var playerSize = 40;
var playerStart = new Vec2(60, 160);
var Player = /** @class */ (function () {
    function Player() {
        this.dead = false;
        this.doubleJump = false;
        this.nDeaths = 0;
        this.onGround = false;
        this.pos = playerStart.copy();
        this.prevPos = playerStart.copy();
        this.r = 0.5 * playerSize;
        this.velocity = new Vec2(0, 0);
    }
    Player.prototype.restart = function () {
        this.dead = false;
        this.doubleJump = false;
        this.onGround = false;
        this.pos = playerStart.copy();
        this.prevPos = playerStart.copy();
        this.velocity.set(0, 0);
    };
    Player.prototype.standOn = function (floor) {
        this.doubleJump = true;
        this.onGround = true;
        this.pos.y = floor - this.r;
        this.velocity.x = walkSpeed;
        this.velocity.y = 0;
    };
    Player.prototype.kill = function () {
        this.dead = true;
        this.velocity.x *= 0.5;
        if (this.velocity.y < 0)
            this.velocity.y * 0.5;
    };
    Player.prototype.update = function (t, stage) {
        var jumping = controls[1][2 /* UP */] || controls[2][2 /* UP */];
        if (jumping && !this.dead) {
            if (this.onGround) {
                this.onGround = false;
                this.velocity.y = t * jumpAccel;
                aa.play('jmp');
            }
            else if (this.doubleJump) {
                this.doubleJump = false;
                this.velocity.y = t * jumpAccel;
                aa.play('jmp');
            }
            controls[1][2 /* UP */] = controls[2][2 /* UP */] = false;
        }
        this.prevPos.setTo(this.pos);
        this.velocity.y += t * gravity;
        this.pos.add(this.velocity);
        if (this.pos.x > stageEnd - this.r && !this.dead) {
            // stage.reset()
            // this.restart()
            return true;
        }
        if (!this.dead) {
            var _a = stage.getFloor(this.pos.x - this.r, this.pos.x + this.r), floor = _a[0], floor2 = _a[1];
            if (this.pos.y >= floor - this.r && this.prevPos.y <= floor - this.r) {
                this.standOn(floor);
            }
            else if (this.pos.y >= floor2 - this.r && this.prevPos.y <= floor2 - this.r) {
                this.standOn(floor2);
            }
            else {
                this.onGround = false;
            }
        }
        if (this.pos.y > cheight + this.r) {
            ++this.nDeaths;
            stage.reset();
            this.restart();
            aa.play('bip');
            return;
        }
        if (this.dead)
            return;
        var wall = stage.getWall(this.pos.x + this.r, this.pos.y + this.r);
        if (this.pos.x > wall - this.r) {
            this.pos.x = wall - this.r;
        }
    };
    Player.prototype.render = function (c, t) {
        var x = lerp(this.prevPos.x, this.pos.x, t);
        var y = lerp(this.prevPos.y, this.pos.y, t);
        c.fillStyle = this.dead ? '#90a4ae' : '#fff';
        c.fillRect(x - this.r, y - this.r, playerSize, playerSize);
        c.fillStyle = this.dead ? '#607d8b' : '#bdbdbd';
        c.fillRect(x, y - 10, 4, 10);
        c.fillRect(x + 10, y - 10, 4, 10);
    };
    return Player;
}());
