class Vec2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }

    copy(): Vec2 {
        return new Vec2(this.x, this.y)
    }
}
