"use strict";
/// <reference path="you_have_to.d.ts" />
const player = new Player;
const stage = new Stage;
function update(t) {
    player.update(t, stage);
    stage.update(t);
}
function render(t) {
    context.clearRect(0, 0, cwidth, cheight);
    player.render(context, t);
    stage.render(context, t);
    if (stage.kills(player)) {
        stage.reset();
        player.restart();
    }
}
startMainloop(update, render);
