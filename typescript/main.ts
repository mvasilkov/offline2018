/// <reference path="you_have_to.d.ts" />

const player = new Player
const stage = new Stage

function update(t: number) {
    player.update(t, stage)
    stage.update(t)
}

function render(t: number) {
    context.clearRect(0, 0, cwidth, cheight)

    stage.render(context, t)
    player.render(context, t)

    if (stage.kills(player)) {
        player.kill()
    }
}

renderBackground(bcontext)
startMainloop(update, render)
