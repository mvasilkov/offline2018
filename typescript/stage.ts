/// <reference path="you_have_to.d.ts" />

const stageFloor = 440
const stageSize = 880
const stagePadding = 0.5 * (cwidth - stageSize)
const stageEnd = stagePadding + stageSize

const colSize = 40
const colCount = stageSize / colSize

const HOLE = -255

class Stage {
    columns: number[]
    lasers: Laser[]

    constructor() {
        this.columns = [0, 0, 0, 0, 0, 0, 0, HOLE, HOLE, HOLE, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.lasers = [
            new Laser(0.4, stageFloor - 60),
            new LaserV(1, stagePadding + 220),
        ]
    }

    getFloor(x: number, x2: number): number[] {
        const a = stageFloor - this.columns[Math.floor((x - stagePadding) / colSize)]
        const b = stageFloor - this.columns[Math.floor((x2 - stagePadding) / colSize)]
        return a < b ? [a, b] : [b, a]
    }

    getWall(x: number, y: number): number {
        const n = Math.floor((x - stagePadding) / colSize)

        if (y > stageFloor - this.columns[n]) {
            return stagePadding + n * colSize
        }

        return x
    }

    reset() {
        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].reset()
        }
    }

    kills(p: Player): boolean {
        for (let n = 0; n < this.lasers.length; ++n) {
            if (this.lasers[n].kills(p)) return true
        }
        return false
    }

    update(t: number) {
        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].update(t)
        }
    }

    render(c: CanvasRenderingContext2D, t: number) {
        for (let n = 0; n < colCount; ++n) {
            if (this.columns[n] != HOLE) {
                const left = stagePadding + n * colSize
                const top = stageFloor - this.columns[n]

                c.fillStyle = '#fff'
                c.fillRect(left, stageFloor, colSize, 4)

                c.fillStyle = '#aaa'
                c.fillRect(left, top, colSize, this.columns[n])
            }
        }

        for (let n = 0; n < this.lasers.length; ++n) {
            this.lasers[n].render(c, t)
        }
    }
}
