"use strict";
var startMainloop = (function () {
    var update = function (t) { return undefined; };
    var render = function (t) { return undefined; };
    var T = 0.02;
    var then = -1;
    var t = 0;
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
