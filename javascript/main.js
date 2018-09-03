"use strict";
/// <reference path="you_have_to.d.ts" />
const player = new Player;
const stage = new Stage;
function update(t) {
}
function render(t) {
    context.clearRect(0, 0, cwidth, cheight);
    player.render(context);
    stage.render(context);
}
startMainloop(update, render);
