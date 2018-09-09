"use strict";
var cwidth = 960;
var cheight = 540;
var aspect = 16 / 9;
var cscale = 1;
var container = document.getElementById('container');
var bcanvas = document.getElementById('bcanvas');
var canvas = document.getElementById('canvas');
var bcontext = bcanvas.getContext('2d');
var context = canvas.getContext('2d');
var transformProperty = 'transform';
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform';
}
bcanvas.width = canvas.width = cwidth;
bcanvas.height = canvas.height = cheight;
function setSize(x, prop, value) {
    x.style[prop] = value + "px";
}
function handleResize() {
    var w = innerWidth;
    var h = innerHeight;
    if (w / h > aspect)
        w = h * aspect;
    else
        h = w / aspect;
    cscale = cwidth / w;
    setSize(container, 'width', w);
    setSize(container, 'height', h);
    setSize(container, 'left', 0.5 * (innerWidth - w));
    setSize(container, 'top', 0.5 * (innerHeight - h));
    var scale = 0.5 * w / cwidth;
    var scale3d = "scale3d(" + scale + "," + scale + ",1)";
    startScreen.style[transformProperty] = scale3d;
}
addEventListener('resize', handleResize);
addEventListener('orientationchange', handleResize);
canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
/* Text helpers */
bcontext.textAlign = context.textAlign = 'center';
function setFontSize(c, n) {
    c.font = n + "px 'Segoe UI','Helvetica Neue',sans-serif";
}
function paintTextBlob(canvas, text, baseline) {
    var cap = 16;
    var top = baseline - 25;
    var middle = top + cap;
    var bottom = middle + cap;
    var len = canvas.measureText(text).width;
    var pad = 0.5 * (cwidth - len);
    canvas.beginPath();
    canvas.moveTo(pad, top);
    canvas.lineTo(cwidth - pad, top);
    canvas.quadraticCurveTo(cwidth - pad + cap, top, cwidth - pad + cap, middle);
    canvas.quadraticCurveTo(cwidth - pad + cap, bottom, cwidth - pad, bottom);
    canvas.lineTo(pad, bottom);
    canvas.quadraticCurveTo(pad - cap, bottom, pad - cap, middle);
    canvas.quadraticCurveTo(pad - cap, top, pad, top);
    canvas.fillStyle = 'rgba(0,0,0,0.5)';
    canvas.fill();
    canvas.fillStyle = '#fff';
    canvas.fillText(text, 0.5 * cwidth, baseline, 900);
}
