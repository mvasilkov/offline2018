const fs = require('fs')
const vm = require('vm')

vm.runInThisContext(fs.readFileSync(__dirname + '/../javascript/board.js', { encoding: 'utf8' }))

function initBoard(height, width) {
    const b = [height, width]
    for (let n = 0; n < height * width; ++n)
        b.push(CELL_NOTHING)
    return b
}

function goodBoards(height, width) {
    const b = initBoard(height, width)
    console.log(b)
}

function run() {
    goodBoards(3, 3)
}

if (require.main === module) {
    run()
}
