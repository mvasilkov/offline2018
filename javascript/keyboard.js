"use strict";
const KEYCODES = {
    // Arrows (player 2)
    37: {
        player: 2,
        action: 0 /* LEFT */,
    },
    39: {
        player: 2,
        action: 1 /* RIGHT */,
    },
    38: {
        player: 2,
        action: 2 /* UP */,
    },
    40: {
        player: 2,
        action: 3 /* DOWN */,
    },
    // WASD (player 1)
    65: {
        player: 1,
        action: 0 /* LEFT */,
    },
    68: {
        player: 1,
        action: 1 /* RIGHT */,
    },
    87: {
        player: 1,
        action: 2 /* UP */,
    },
    83: {
        player: 1,
        action: 3 /* DOWN */,
    },
    // Space bar (player 1)
    32: {
        player: 1,
        action: 2 /* UP */,
    }
};
const controls = [
    [],
    [false, false, false, false],
    [false, false, false, false],
];
function updateControls(event, keyDown) {
    if (keyDown && (event.altKey || event.ctrlKey || event.metaKey || event.repeat)) {
        return;
    }
    let a;
    if (a = KEYCODES[event.keyCode]) {
        controls[a.player][a.action] = keyDown;
    }
}
document.body.addEventListener('keydown', event => updateControls(event, true));
document.body.addEventListener('keyup', event => updateControls(event, false));
/* Hack to respond to clicks and touches */
document.body.addEventListener('mousedown', event => {
    event.preventDefault();
    controls[1][2 /* UP */] = true;
});
canvas.addEventListener('touchstart', event => {
    event.preventDefault();
    controls[2][2 /* UP */] = true;
});
