"use strict";
function renderBackground(c, title, ez) {
    c.clearRect(0, 0, cwidth, cheight);
    var f = 310;
    var points = [];
    var a = (Math.random() * 0.03 - Math.random() * 0.03) * Math.PI;
    for (var x = -250; x <= 250; x += 10) {
        for (var z = -250; z <= 250; z += 10) {
            var d = Math.sqrt(x * x + z * z);
            points.push({
                x: x * Math.cos(a) - z * Math.sin(a),
                y: Math.random() * 3 + 60,
                z: x * Math.sin(a) + z * Math.cos(a),
            });
        }
    }
    c.fillStyle = c.strokeStyle = ez ? '#32fa05' : '#18ffff';
    function lineToPoint(p) {
        var k = f / (f + p.z);
        var x = p.x * k + 0.5 * cwidth;
        var y = p.y * k + 0.5 * (cheight - stageFloor);
        if (x < 0 || x > cwidth || y < 0 || y > cheight)
            return;
        c.lineTo(x, y);
    }
    for (var v = 0; v < 51; ++v) {
        c.beginPath();
        for (var u = 0; u < 51; ++u) {
            lineToPoint(points[51 * v + u]);
        }
        c.stroke();
    }
    for (var u = 0; u < 51; ++u) {
        c.beginPath();
        for (var v = 0; v < 51; ++v) {
            lineToPoint(points[51 * v + u]);
        }
        c.stroke();
    }
    /* Stars */
    for (var n = 0; n < 200; ++n) {
        var x = Math.random() * cwidth;
        var y = Math.random() * 80;
        c.fillStyle = 'rgba(' +
            Math.round(Math.random() * 100) + 155 + ',' +
            Math.round(Math.random() * 100) + 155 + ',' +
            Math.round(Math.random() * 100) + 155 + ',' +
            Math.random() + ')';
        c.beginPath();
        c.arc(x, y, Math.random() + 0.5, 0, Math.PI * 2);
        c.fill();
    }
    if (title) {
        setFontSize(c, 25);
        paintTextBlob(c, '"' + title + '"', 48);
    }
}
