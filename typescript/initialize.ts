/* Utility functions */
function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t
}

function clamp(x: number, a: number, b: number): number {
    return (x < a) ? a : (x > b) ? b : x
}
