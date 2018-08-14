const enum Actions {
    LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3,
}

const KEYCODES = {
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
}
