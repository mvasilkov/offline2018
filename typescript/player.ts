/// <reference path="you_have_to.d.ts" />

const gravity = 48
const jumpAccel = -900
const walkSpeed = 7

const playerSize = 40
const playerStart = new Vec2(60, 160)

class Player {
    doubleJump: boolean
    onGround: boolean
    pos: Vec2
    prevPos: Vec2
    r: number
    velocity: Vec2

    constructor() {
        this.doubleJump = false
        this.onGround = false
        this.pos = playerStart.copy()
        this.prevPos = playerStart.copy()
        this.r = 0.5 * playerSize
        this.velocity = new Vec2(0, 0)
    }

    update(t: number, stage: Stage) {
        const jumping = controls[1][Actions.UP] || controls[2][Actions.UP]

        if (jumping) {
            if (this.onGround) {
                this.onGround = false
                this.velocity.y = t * jumpAccel
            }
            else if (this.doubleJump) {
                this.doubleJump = false
                this.velocity.y = t * jumpAccel
            }

            controls[1][Actions.UP] = controls[2][Actions.UP] = false
        }

        this.prevPos.setTo(this.pos)
        this.velocity.y += t * gravity
        this.pos.add(this.velocity)

        if (this.pos.x > stageEnd - this.r) {
            this.doubleJump = false
            this.onGround = false
            this.pos = playerStart.copy()
            this.prevPos = playerStart.copy()
            this.velocity = new Vec2(0, 0)
            return
        }

        const floor = stage.getFloor(this.pos.x - this.r, this.pos.x + this.r)

        if (this.pos.y >= floor - this.r) {
            this.doubleJump = true
            this.onGround = true
            this.pos.y = floor - this.r
            this.velocity.x = walkSpeed
            this.velocity.y = 0
        }
    }

    render(c: CanvasRenderingContext2D, t: number) {
        const x = t * this.pos.x + (1 - t) * this.prevPos.x
        const y = t * this.pos.y + (1 - t) * this.prevPos.y

        c.fillStyle = '#fff'
        c.fillRect(x - this.r, y - this.r, playerSize, playerSize)
    }
}
