/// <reference path="you_have_to.d.ts" />

const player = new Player
const stage = new Stage

function update(t: number) {
    player.update(t)
}

function render(t: number) {
    context.clearRect(0, 0, cwidth, cheight)

    player.render(context, t)
    stage.render(context)
}

startMainloop(update, render)
