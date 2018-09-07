/// <reference path="you_have_to.d.ts" />

const player = new Player
const stage = new Stage

const parallax = 0.09
const parallay = 0.04

function update(t: number) {
    player.update(t, stage)
    stage.update(t)

    if (stage.kills(player)) {
        player.kill()
    }
}

function render(t: number) {
    context.clearRect(0, 0, cwidth, cheight)

    context.save()

    const x = lerp(player.prevPos.x, player.pos.x, t)
    const y = lerp(player.prevPos.y, player.pos.y, t)
    context.translate((0.5 * cwidth - x) * parallax, (0.5 * cheight - y) * parallay)

    stage.render(context, t)
    player.render(context, t)

    context.restore()
}

renderBackground(bcontext)
startMainloop(update, render)
