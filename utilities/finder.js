const fs = require('fs')
const vm = require('vm')

vm.runInThisContext(fs.readFileSync(__dirname + '/../javascript/board.js', { encoding: 'utf8' }))

function initBoard(height, width) {
    const b = [height, width]
    for (let n = 0; n < height * width; ++n)
        b.push(CELL_NOTHING)
    return b
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
        if (last_cell) console.log(b)
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
