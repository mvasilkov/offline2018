/// <reference path="you_have_to.d.ts" />

interface Window {
    SOUND(settings: (number | undefined)[]): string
}

interface AASound {
    tick: number
    count: number
    pool: HTMLAudioElement[]
}

class AAudio {
    on: boolean
    sounds: { [name: string]: AASound }

    constructor() {
        this.on = true
        this.sounds = {}
    }

    add(name: string, count: number, settings: (number | undefined)[]) {
        this.sounds[name] = {
            tick: 0,
            count: count,
            pool: [],
        }

        for (let i = 0; i < count; ++i) {
            const audio = new Audio
            audio.src = window.SOUND(settings)
            this.sounds[name].pool.push(audio)
        }
    }

    play(name: string) {
        if (!this.on) return

        const sound: AASound = this.sounds[name]

        sound.pool[sound.tick].play()
        if (++sound.tick >= sound.count) {
            sound.tick = 0
        }
    }
}

const aa = new AAudio

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad/i) != null

if (isMobile) {
    aa.on = false
}
else {
    aa.add('bip', 9, [1,,0.1241,,0.1855,0.5336,,,,,,,,,,,,,1,,,0.1,,0.64])
    aa.add('jmp', 1, [0,,0.2086,,0.2238,0.3305,,0.236,,,,,,0.0687,,,,,0.5894,,,0.0532,,0.5])
    aa.add('las', 1, [0,,0.2949,0.2527,0.3167,0.6796,0.2,-0.2246,,,,,,0.8584,-0.586,,,,1,,,0.2201,,0.5])
    aa.add('hit', 1, [1,,0.2548,,0.1007,0.7539,0.0996,-0.5302,,,,,,0.7769,-0.4436,,,,1,,,,,0.5])
    aa.add('end', 1, [0,,0.0108,0.3989,0.4412,0.444,,,,,,0.5147,0.6024,,,,,,1,,,,,0.5])
}
