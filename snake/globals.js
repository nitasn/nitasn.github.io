'use strict';

const ROWS = 25;
const COLS = 25;

const DIRECTIONS = {
	UP: [-1, 0],
	DOWN: [1, 0],
	LEFT: [0, -1],
	RIGHT: [0, 1]
};

const snake_coords = [];

/**
 * snake's current moving direction
 */
let snk_drct;

const keys_map = {
	"ArrowUp": DIRECTIONS.UP,
	"ArrowDown": DIRECTIONS.DOWN,
	"ArrowLeft": DIRECTIONS.LEFT,
	"ArrowRight": DIRECTIONS.RIGHT
};

let main_timer_id;

/**
 * each arrow press is being pushed into this array,
 * but only after validating that it's not opposite to the last elem of the array,
 * or to snk_drct if the array is empty
 */
let drct_requests = [];

let fruit_location;