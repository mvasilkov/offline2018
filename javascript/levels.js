"use strict";
const HOLE = -255;
/* Copy paste:
    {
        title: '',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [],
    },
*/
const LEVELS = [
    {
        title: 'You Are Now Entering',
        cols: [60, 60, 60, 60, 60, 60, 60, 60, 60, 40, 40, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [],
        ez: true,
    },
    {
        title: 'Jump Around',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [],
        ez: true,
    },
    {
        title: 'Double Jump',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 310, 310, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [],
        ez: true,
    },
    {
        title: 'Beware Laser Beam',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 140, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 1.05,
                pos: 60,
            },
        ],
        ez: true,
    },
    {
        title: 'You Are Now Leaving',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 40, 40, 60, 60, 60, 60, 60, 60, 60, 60, 60],
        lasers: [
            {
                act: 2.9,
                pos: 60,
            },
        ],
        ez: true,
    },
    // Intro sequence ended
    {
        title: 'Chill',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 1.20,
                pos: 440,
                v: true,
            },
        ],
    },
    {
        title: 'Obstacle Race',
        cols: [0, 0, 0, 0, HOLE, HOLE, 150, 0, 0, 0, 0, HOLE, HOLE, 200, 0, 0, 0, 0, HOLE, HOLE, 300, 0],
        lasers: [],
    },
    {
        title: 'Bunny Hop',
        cols: [0, 0, 0, 0, 0, 140, 0, 0, 0, 0, 0, 0, 140, 0, 0, 0, 0, 0, 0, 140, 0, 0],
        lasers: [
            {
                act: 2.9,
                pos: 60,
            },
            {
                act: 2.65,
                pos: 260,
            },
            {
                act: 1.85,
                pos: 260,
            },
            {
                act: 1.05,
                pos: 260,
            },
        ],
    },
    {
        title: 'Mind the Gap',
        cols: [0, 0, 0, 0, 0, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 1.05,
                pos: 260,
            },
        ],
    },
    {
        title: 'Boost',
        cols: [0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 0, 0, 0, 0, 330, 330, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 3.6,
                pos: 60,
            },
            {
                act: 2.9,
                pos: 60,
            },
            {
                act: 1.70,
                pos: 500,
                v: true,
            },
        ],
    },
    {
        title: 'Unchill',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 2.9,
                pos: 60,
            },
            {
                act: 1.10,
                pos: 400,
                v: true,
            },
        ],
    },
    {
        title: 'Jump Start',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, HOLE, HOLE, HOLE, HOLE, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 0.4,
                pos: 60,
            },
        ],
    },
    {
        title: 'You Are Now Ascending',
        cols: [0, 0, 20, 20, 40, 40, 60, 60, 80, 80, 100, 100, 120, 120, 140, 140, 160, 160, 180, 180, 200, 200],
        lasers: [
            {
                act: 1.8,
                pos: 120,
            },
            {
                act: 1.1,
                pos: 80,
            },
        ],
    },
    {
        title: 'Back Up',
        cols: [200, 200, 200, 200, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, HOLE, 120, 120, 140, 140, 160, 160, 180, 180, 200, 200],
        lasers: [
            {
                act: 1.28,
                pos: 640,
                v: true,
            },
            {
                act: 0.88,
                pos: 380,
            },
            {
                act: 0.48,
                pos: 260,
            },
        ],
    },
    {
        title: 'Never Changes',
        cols: [80, 80, 80, 80, 80, 80, 80, 80, 80, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80],
        lasers: [
            {
                act: 3.6,
                pos: 140,
            },
            {
                act: 2,
                pos: 140,
            },
            {
                act: 1.2,
                pos: 140,
            },
        ],
        ez: true,
    },
    {
        title: 'Written for js13kGames–2018',
        cols: [200, 200, 180, 180, 160, 160, 140, 140, 120, 120, 100, 100, 80, 80, 60, 60, 40, 40, 20, 20, 0, 0],
        lasers: [
            {
                act: 1.20,
                pos: 60,
            },
        ],
        ez: true,
    },
    {
        title: 'EOL (End of Line)',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
        lasers: [],
        ez: true,
        render: function (c) {
            c.clearRect(stagePadding + 80, 0, cwidth, cheight);
            c.fillStyle = '#fff';
            c.beginPath();
            c.arc(stagePadding + 80, stageFloor + 2, 5, 0, Math.PI * 2);
            c.fill();
        },
        renderBackground: function (c) {
            setFontSize(c, 25);
            paintTextBlob(c, 'Congratulations!', stageFloor - 15);
            setFontSize(c, 18);
            paintTextBlob(c, '(Reload the page to start a new game)', stageFloor + 22);
        },
    },
    // Title screen
    {
        title: '',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [],
        ez: true,
    },
];
