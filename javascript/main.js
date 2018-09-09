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
// Music
let music = null;
function initMusic() {
    const synth = new sonant;
    for (let i = 0; i < 8; ++i) {
        synth.generate(i);
    }
    music = synth.createAudio();
    music.loop = true;
    music.volume = 0.9;
}
if (!isMobile) {
    try {
        initMusic();
    }
    catch (err) {
    }
}
// Title screen
const loadingScreen = document.getElementById('load');
const startScreen = document.getElementById('home');
const startButton = document.getElementById('start');
function initMenu() {
    if (isMobile)
        document.body.className = 'mobile';
    const musicToggle = document.getElementById('m');
    const soundToggle = document.getElementById('s');
    musicToggle.checked = soundToggle.checked = true;
    musicToggle.addEventListener('change', event => {
        if (!music)
            return;
        if (musicToggle.checked) {
            music.currentTime = 0;
            music.play();
        }
        else
            music.pause();
    });
    soundToggle.addEventListener('change', event => {
        if (aa.on = soundToggle.checked) {
            aa.play('bip');
        }
    });
    container.removeChild(loadingScreen);
    if (music)
        music.play();
}
function start() {
    container.removeChild(startScreen);
    nowPlaying = 0;
    stage = new Stage(LEVELS[nowPlaying]);
    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen();
    }
    startMainloop(update, render);
}
startButton.addEventListener('mousedown', start);
startButton.addEventListener('touchstart', start);
handleResize();
initMenu();
