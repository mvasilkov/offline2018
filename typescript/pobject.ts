/// <reference path="offline.d.ts" />

const FRICTION = 0.001

class PObject {
    // Coordinates
    current: Vec2
    previous: Vec2
    visual: Vec2

    r: number

    constructor(x: number, y: number, r: number) {
        this.current = new Vec2(x, y)
        this.previous = new Vec2(x, y)
        this.visual = new Vec2(x, y)

        this.r = r
    }

    verlet() {
        let x = 2 * this.current.x - this.previous.x
        let y = 2 * this.current.y - this.previous.y

        // Friction: undo part of the update
        x += (this.current.x - x) * FRICTION
        y += (this.current.y - y) * FRICTION

        const t = this.previous
        this.previous = this.current
        this.current = t.set(x, y)
    }
}
