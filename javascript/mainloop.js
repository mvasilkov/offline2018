"use strict";
const startMainloop = (function () {
    let update = t => undefined;
    let render = t => undefined;
    const T = 0.02;
    let then = -1;
    let t = 0;
    function mainloop(now) {
        requestAnimationFrame(mainloop);
        if (then == -1) {
            then = now;
        }
        t += (now - then) * 0.001;
        then = now;
        while (t > 0) {
            t -= T;
            update(T);
        }
        render(t / T + 1);
    }
    function startMainloop(updateFun, renderFun) {
        update = updateFun;
        render = renderFun;
        requestAnimationFrame(mainloop);
    }
    return startMainloop;
})();
