const cwidth = 960
const cheight = 540

const bcanvas = document.getElementById('bcanvas') as HTMLCanvasElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const bcontext = bcanvas.getContext('2d')!
const context = canvas.getContext('2d')!

bcanvas.width = canvas.width = cwidth
bcanvas.height = canvas.height = cheight

canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
})

/* Scan lines */

const scr = document.getElementById('screen')!
scr.style.width = cwidth + 'px'
scr.style.height = cheight + 'px'

/* Text helpers */

bcontext.textAlign = context.textAlign = 'center'

function setFontSize(c: CanvasRenderingContext2D, n: number) {
    c.font = n + "px 'Segoe UI','Helvetica Neue',sans-serif"
}

function paintTextBlob(canvas: CanvasRenderingContext2D, text: string, baseline: number) {
    var cap = 16
    var top = baseline - 25
    var middle = top + cap
    var bottom = middle + cap
    var len = canvas.measureText(text).width
    var pad = 0.5 * (cwidth - len)

    canvas.beginPath()

    canvas.moveTo(pad, top)
    canvas.lineTo(cwidth - pad, top)
    canvas.quadraticCurveTo(cwidth - pad + cap, top, cwidth - pad + cap, middle)
    canvas.quadraticCurveTo(cwidth - pad + cap, bottom, cwidth - pad, bottom)
    canvas.lineTo(pad, bottom)
    canvas.quadraticCurveTo(pad - cap, bottom, pad - cap, middle)
    canvas.quadraticCurveTo(pad - cap, top, pad, top)

    canvas.fillStyle = 'rgba(0,0,0,0.5)'
    canvas.fill()

    canvas.fillStyle = '#fff'
    canvas.fillText(text, 0.5 * cwidth, baseline, 900)
}
