// Sockets
const SOCK_TOP = 1
const SOCK_RIGHT = 2
const SOCK_BOT = 4
const SOCK_LEFT = 8

// Connectivity
const CONN_TOP_RIGHT = 16 // A
const CONN_BOT_RIGHT = 32 // B
const CONN_BOT_LEFT = 64 // C
const CONN_TOP_LEFT = 128 // D

// Cells
const CELL_NOTHING = 0
const CELL_A = SOCK_TOP | SOCK_RIGHT | CONN_TOP_RIGHT
const CELL_B = SOCK_BOT | SOCK_RIGHT | CONN_BOT_RIGHT
const CELL_C = SOCK_BOT | SOCK_LEFT | CONN_BOT_LEFT
const CELL_D = SOCK_TOP | SOCK_LEFT | CONN_TOP_LEFT
const CELL_AC = CELL_A | CELL_C
const CELL_BD = CELL_B | CELL_D
