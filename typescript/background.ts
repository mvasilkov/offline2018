interface Point {
    x: number,
    y: number,
    z: number,
}

function renderBackground(c: CanvasRenderingContext2D) {
    c.clearRect(0, 0, cwidth, cheight)

    const f = 310
    const points: Point[] = []

    const a = (Math.random() * 0.03 - Math.random() * 0.03) * Math.PI

    for (let x = -250; x <= 250; x += 10) {
        for (let z = -250; z <= 250; z += 10) {
            const d = Math.sqrt(x * x + z * z)

            points.push({
                x: x * Math.cos(a) - z * Math.sin(a),
                y: Math.random() * 3 + 60,
                z: x * Math.sin(a) + z * Math.cos(a),
            })
        }
    }

    c.fillStyle = c.strokeStyle = '#18ffff' // '#32fa05'

    function lineToPoint(p: Point) {
        const k = f / (f + p.z)
        const x = p.x * k + 0.5 * cwidth
        const y = p.y * k + 0.5 * (cheight - stageFloor)

        if (x < 0 || x > cwidth || y < 0 || y > cheight) return

        c.lineTo(x, y)
    }

    for (let v = 0; v < 51; ++v) {
        c.beginPath()

        for (let u = 0; u < 51; ++u) {
            lineToPoint(points[51 * v + u])
        }

        c.stroke()
    }

    for (let u = 0; u < 51; ++u) {
        c.beginPath()

        for (let v = 0; v < 51; ++v) {
            lineToPoint(points[51 * v + u])
        }

        c.stroke()
    }
}
