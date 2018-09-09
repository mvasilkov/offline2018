"use strict";
/// <reference path="you_have_to.d.ts" />
const player = new Player;
let nowPlaying = 17; // Title screen
let stage = new Stage(LEVELS[nowPlaying]);
const parallax = 0.09;
const parallay = 0.04;
function update(t) {
    const nextLevel = player.update(t, stage);
    if (nextLevel) {
        if (nowPlaying != LEVELS.length - 1)
            ++nowPlaying;
        stage = new Stage(LEVELS[nowPlaying]);
        player.restart();
        return;
    }
    stage.update(t);
    if (stage.kills(player)) {
        player.kill();
    }
}
function render(t) {
    context.clearRect(0, 0, cwidth, cheight);
    context.save();
    const x = lerp(player.prevPos.x, player.pos.x, t);
    const y = lerp(player.prevPos.y, player.pos.y, t);
    context.translate((0.5 * cwidth - x) * parallax, (0.5 * cheight - y) * parallay);
    stage.render(context, t);
    player.render(context, t);
    context.restore();
    if (player.nDeaths) {
        setFontSize(context, 20);
        paintTextBlob(context, 'Deaths: ' + player.nDeaths, 500);
    }
}
const loadingScreen = document.getElementById('load');
const startScreen = document.getElementById('home');
const startButton = document.getElementById('start');
function start() {
    container.removeChild(startScreen);
    nowPlaying = 0;
    stage = new Stage(LEVELS[nowPlaying]);
    startMainloop(update, render);
}
startButton.addEventListener('mousedown', start);
startButton.addEventListener('touchstart', start);
handleResize();
container.removeChild(loadingScreen);
