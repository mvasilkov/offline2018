"use strict";
/* Utility functions */
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}
function clamp(x, a, b) {
    return (x < a) ? a : (x > b) ? b : x;
}
