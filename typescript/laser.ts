/// <reference path="you_have_to.d.ts" />

const laserActive = 0.82
const laserFadeOut = 0.24
const laserPrefire = 0.4
const laserSize = 120

const prefireColor = '#ff1507'
const laserPalette = ['#ffdc26', '#fdec4a', '#fff699', '#fffee6']

class Laser {
    activation: number
    end: number
    killing: boolean
    paletteIndex: number
    r: number
    rPrev: number
    t: number
    y: number

    a: number
    b: number

    constructor(activation: number, y: number) {
        this.activation = activation
        this.end = activation + laserPrefire + laserActive
        this.killing = false
        this.paletteIndex = 0
        this.r = 0.5 * laserSize
        this.rPrev = this.r
        this.t = 0
        this.y = y

        this.a = 1 / laserFadeOut
        this.b = this.end / laserFadeOut
    }

    reset() {
        this.killing = false
        this.paletteIndex = 0
        this.r = 0.5 * laserSize
        this.rPrev = this.r
        this.t = 0
    }

    kills(p: Player): boolean {
        return this.killing && Math.abs(this.y - p.pos.y) < this.r + p.r
    }

    update(t: number) {
        this.t += t

        this.killing = this.t > this.activation + laserPrefire && this.t < this.end

        this.rPrev = this.r
        this.r = 0.5 * laserSize * clamp(-this.a * this.t + this.b, 0, 1)
    }

    render(c: CanvasRenderingContext2D, t: number) {
        this.paletteIndex = (this.paletteIndex + 1) % 4

        if (this.t < this.activation || this.t > this.end) return

        if (this.t < this.activation + laserPrefire) {
            if (this.paletteIndex & 2) return
            c.fillStyle = prefireColor
            c.fillRect(0, this.y - 1, cwidth, 3)
        }
        else {
            const r = lerp(this.rPrev, this.r, t)
            c.fillStyle = laserPalette[this.paletteIndex]
            c.fillRect(0, this.y - r, cwidth, 2 * r)
        }
    }
}
