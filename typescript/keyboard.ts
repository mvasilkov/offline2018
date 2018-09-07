const enum Actions {
    LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3,
}

interface KeyAction {
    player: number,
    action: Actions,
}

const KEYCODES: { [n: number]: KeyAction } = {
    // Arrows (player 2)
    37: {
        player: 2,
        action: Actions.LEFT,
    },
    39: {
        player: 2,
        action: Actions.RIGHT,
    },
    38: {
        player: 2,
        action: Actions.UP,
    },
    40: {
        player: 2,
        action: Actions.DOWN,
    },
    // WASD (player 1)
    65: {
        player: 1,
        action: Actions.LEFT,
    },
    68: {
        player: 1,
        action: Actions.RIGHT,
    },
    87: {
        player: 1,
        action: Actions.UP,
    },
    83: {
        player: 1,
        action: Actions.DOWN,
    },
    // Space bar (player 1)
    32: {
        player: 1,
        action: Actions.UP,
    }
}

const controls = [
    [],
    [false, false, false, false],
    [false, false, false, false],
]

function updateControls(event: KeyboardEvent, keyDown: boolean) {
    if (keyDown && (event.altKey || event.ctrlKey || event.metaKey || event.repeat)) {
        return
    }
    let a
    if (a = KEYCODES[event.keyCode]) {
        controls[a.player][a.action] = keyDown
    }
}

document.body.addEventListener('keydown', event => updateControls(event, true))
document.body.addEventListener('keyup', event => updateControls(event, false))

/* Hack to respond to clicks and touches */
document.body.addEventListener('mousedown', event => {
    event.preventDefault()
    controls[1][Actions.UP] = true
})
canvas.addEventListener('touchstart', event => {
    event.preventDefault()
    controls[2][Actions.UP] = true
})
