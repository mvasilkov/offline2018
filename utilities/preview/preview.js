const CELL_PNGS = {
    [CELL_A]: 'CELL_A.png',
    [CELL_B]: 'CELL_B.png',
    [CELL_C]: 'CELL_C.png',
    [CELL_D]: 'CELL_D.png',
    [CELL_AC]: 'CELL_AC.png',
    [CELL_BD]: 'CELL_BD.png',
}

const input = document.getElementById('b')
const output = document.getElementById('board')

input.addEventListener('change', event => {
    const a = input.value
    if (a) view_board(a)
    else view_help()
})

function view_board(a) {
    const board = JSON.parse(`[${a}]`)
    const height = board.shift()
    const width = board.shift()

    let html = '<table>'

    for (let j = 0; j < height; ++j) {
        html += '<tr>'

        for (let i = 0; i < width; ++i) {
            html += '<td height=60 width=60>'

            const png = CELL_PNGS[board[j * width + i]]
            if (png) html += `<img src="./${png}" height=60 width=60>`

            html += '</td>'
        }

        html += '</tr>'
    }

    html += '</table>'

    output.innerHTML = html
}

function view_help() {
    const cells = [CELL_A, CELL_B, CELL_C, CELL_D, CELL_AC, CELL_BD]

    let html = '<table>'

    for (let j = 0; j < cells.length; ++j) {
        html += '<tr>'

        html += '<td>'

        const png = CELL_PNGS[cells[j]]
        html += `<img src="./${png}" height=60 width=60>`

        html += '</td>'

        html += `<td>${cells[j]}</td>`

        html += '</tr>'
    }

    html += '</table>'

    output.innerHTML = html
}

view_help()
