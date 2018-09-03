"use strict";
const cwidth = 960;
const cheight = 540;
const bcanvas = document.getElementById('bcanvas');
const canvas = document.getElementById('canvas');
const bcontext = bcanvas.getContext('2d');
const context = canvas.getContext('2d');
bcanvas.width = canvas.width = cwidth;
bcanvas.height = canvas.height = cheight;
canvas.addEventListener('contextmenu', event => {
    event.preventDefault();
});
