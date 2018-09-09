"use strict";
/// <reference path="you_have_to.d.ts" />
var player = new Player;
var nowPlaying = 17; // Title screen
var stage = new Stage(LEVELS[nowPlaying]);
var parallax = 0.09;
var parallay = 0.04;
function update(t) {
    var nextLevel = player.update(t, stage);
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
    var x = lerp(player.prevPos.x, player.pos.x, t);
    var y = lerp(player.prevPos.y, player.pos.y, t);
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
var music = null;
function initMusic() {
    var synth = new sonant;
    for (var i = 0; i < 8; ++i) {
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
var loadingScreen = document.getElementById('load');
var startScreen = document.getElementById('home');
var startButton = document.getElementById('start');
function initMenu() {
    if (isMobile)
        document.body.className = 'mobile';
    var musicToggle = document.getElementById('m');
    var soundToggle = document.getElementById('s');
    musicToggle.checked = soundToggle.checked = true;
    musicToggle.addEventListener('change', function (event) {
        if (!music)
            return;
        if (musicToggle.checked) {
            music.currentTime = 0;
            music.play();
        }
        else
            music.pause();
    });
    soundToggle.addEventListener('change', function (event) {
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
