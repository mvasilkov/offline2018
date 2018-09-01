const CELL_PNGS = {
    [CELL_A]: 'CELL_A.png',
    [CELL_B]: 'CELL_B.png',
    [CELL_C]: 'CELL_C.png',
    [CELL_D]: 'CELL_D.png',
    [CELL_AC]: 'CELL_AC.png',
    [CELL_BD]: 'CELL_BD.png',
}

const input = document.getElementById('b')
const output = document.getElementById('output')

input.addEventListener('change', event => {
    let a = input.value
    if (a) {
        output.innerHTML = ''
        a = a.split('\n').forEach(b => view_board(b))
    }
    else view_help()
})

function view_board(a) {
    a = a.trim()
    if (!a) return
    if (a[0] != '[') a = `[${a}]`

    const board = JSON.parse(a)
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

    html += `</table><pre><code>${a}</code></pre>`

    const container = document.createElement('div')
    container.className = 'board'
    container.innerHTML = html

    output.appendChild(container)
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

        html += `<td><code>${cells[j]}</code></td>`

        html += '</tr>'
    }

    html += '</table>'

    output.innerHTML = html
}

view_help()

document.addEventListener('click', function (event) {
    if (event.target.tagName != 'IMG') return
    let a = CELL_NOTHING
    switch (true) {
        case event.target.src.endsWith('CELL_A.png'):
            a = CELL_A
            break
        case event.target.src.endsWith('CELL_B.png'):
            a = CELL_B
            break
        case event.target.src.endsWith('CELL_C.png'):
            a = CELL_C
            break
        case event.target.src.endsWith('CELL_D.png'):
            a = CELL_D
            break
        case event.target.src.endsWith('CELL_AC.png'):
            a = CELL_AC
            break
        case event.target.src.endsWith('CELL_BD.png'):
            a = CELL_BD
            break
    }
    if (a == CELL_NOTHING) return
    event.target.src = CELL_PNGS[ROTATE_CELL[a]]
})
