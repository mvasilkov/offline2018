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
        title: 'Jump Start',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, HOLE, HOLE, HOLE, HOLE, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lasers: [
            {
                act: 0.4,
                pos: 60,
            },
        ],
    },
];
