"use strict";
function makeSprite(width, height, callback) {
    var hcanvas = document.createElement('canvas');
    hcanvas.width = width;
    hcanvas.height = height;
    var canvas = hcanvas.getContext('2d');
    callback(canvas);
    /* Used for debugging * /
    hcanvas.style.width = width + 'px'
    hcanvas.style.height = height + 'px'
    hcanvas.style.backgroundColor = '#FF0080'
    hcanvas.style.border = '20px solid #FF0080'
    document.body.appendChild(hcanvas)
    /* End debugging */
    return hcanvas;
}
