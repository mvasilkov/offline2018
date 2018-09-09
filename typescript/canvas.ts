const cwidth = 960
const cheight = 540
const aspect = 16 / 9

let cscale = 1

const container = document.getElementById('container')!

const bcanvas = document.getElementById('bcanvas') as HTMLCanvasElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const bcontext = bcanvas.getContext('2d')!
const context = canvas.getContext('2d')!

let transformProperty = 'transform'
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform'
}

bcanvas.width = canvas.width = cwidth
bcanvas.height = canvas.height = cheight

function setSize(x: HTMLElement, prop: string, value: number) {
    x.style[prop as any] = `${value}px`
}

function handleResize() {
    let w = innerWidth
    let h = innerHeight

    if (w / h > aspect)
        w = h * aspect
    else
        h = w / aspect

    cscale = cwidth / w

    setSize(container, 'width', w)
    setSize(container, 'height', h)
    setSize(container, 'left', 0.5 * (innerWidth - w))
    setSize(container, 'top', 0.5 * (innerHeight - h))

    const scale = 0.5 * w / cwidth
    const scale3d = `scale3d(${scale},${scale},1)`

    startScreen.style[transformProperty as any] = scale3d
}

addEventListener('resize', handleResize)
addEventListener('orientationchange', handleResize)

canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
})

canvas.addEventListener('touchstart', event => {
    event.preventDefault()
    controls[2][Actions.UP] = true
})

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
