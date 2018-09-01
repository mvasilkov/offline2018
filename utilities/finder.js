const fs = require('fs')
const vm = require('vm')

vm.runInThisContext(fs.readFileSync(__dirname + '/../javascript/board.js', { encoding: 'utf8' }))

function initBoard(height, width) {
    const b = [height, width]
    for (let n = 0; n < height * width; ++n)
        b.push(CELL_NOTHING)
    return b
}

const cellClasses = {
    [CELL_NOTHING]: 0,
    [CELL_A]: 1,
    [CELL_B]: 1,
    [CELL_C]: 1,
    [CELL_D]: 1,
    [CELL_AC]: 2,
    [CELL_BD]: 2,
}

const foundBoards = {}

function boardToString(b) {
    const [height, width, ...board] = b
    return [height, width, ...board.map(a => cellClasses[a])].join(',')
}

function rotateBoard(b) {
    const [height, width, ...board] = b
    const result = [width, height]
    for (let y = 0; y < width; ++y) {
        for (let x = 0; x < height; ++x) {
            result.push(ROTATE_CELL[board[y + (height - x - 1) * width]])
        }
    }
    return result
}

function flipBoardLR(b) {
    const [height, width, ...board] = b
    const result = [height, width]
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            result.push(FLIP_CELL_LR[board[width - x - 1 + y * width]])
        }
    }
    return result
}

function flipBoardBT(b) {
    const [height, width, ...board] = b
    const result = [height, width]
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            result.push(FLIP_CELL_BT[board[x + (height - y - 1) * width]])
        }
    }
    return result
}

function addRotationsToFoundBoards(b) {
    foundBoards[boardToString(b)] = true

    // Rotations
    const r1 = rotateBoard(b)
    const r2 = rotateBoard(r1)
    const r3 = rotateBoard(r2)
    if (b[0] == b[1]) {
        foundBoards[boardToString(r1)] = true
        foundBoards[boardToString(r3)] = true
    }
    foundBoards[boardToString(r2)] = true
}

function addToFoundBoards(b) {
    addRotationsToFoundBoards(b)
    addRotationsToFoundBoards(flipBoardLR(b))
    addRotationsToFoundBoards(flipBoardBT(b))
}

function hasFoundBoard(b) {
    return foundBoards[boardToString(b)] == true
}

function boardPutCell(b, x, y) {
    const [height, width] = b

    let u = x
    let v = y
    let last_cell = false
    if (++u == width) {
        u = 0
        if (++v == height) {
            // This is the last cell
            last_cell = true
        }
    }

    const index = x + y * width + 2
    const cell_left = x ? b[index - 1] : CELL_NOTHING
    const cell_top = y ? b[index - width] : CELL_NOTHING
    const features = (cell_left & SOCK_RIGHT ? SOCK_LEFT : 0) |
        (cell_top & SOCK_BOT ? SOCK_TOP : 0)

    let feature_bits = SOCK_LEFT | SOCK_TOP
    if (x == width - 1) feature_bits |= SOCK_RIGHT
    if (y == height - 1) feature_bits |= SOCK_BOT

    const good_cells = ALL_CELLS.filter(a => (a & feature_bits) == features)
    for (let n = 0; n < good_cells.length; ++n) {
        b[index] = good_cells[n]
        if (last_cell) {
            if (hasFoundBoard(b)) continue
            addToFoundBoards(b)
            console.log(b)
        }
        else boardPutCell(b, u, v)
    }
}

function goodBoards(height, width) {
    const b = initBoard(height, width)
    // b[2] = CELL_B // Starting cell
    // boardPutCell(b, 1, 0)
    boardPutCell(b, 0, 0)
}

function run() {
    goodBoards(3, 3)
}

if (require.main === module) {
    run()
}
