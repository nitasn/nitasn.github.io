'use strict';

function vec_sum(v1, v2) {
	const [x1, x2] = v1;
	const [y1, y2] = v2;
	return [x1 + y1, x2 + y2];
}

function cell_at(location) {
	const [i, j] = location;
	return document.getElementById(`cell_${i}_${j}`);
}

function dye_as_snake(location) {
	cell_at(location).style.background = 'darkgreen';
}

function dye_as_regular(location) {
	cell_at(location).style.background = 'black';
}

function dye_as_fruit(location) {
	cell_at(location).style.background = 'darkred';
}

function dye_as_head(location) {
	cell_at(location).style.background = 'darkgreen';
}

function neighbor(location, direction) {
	const result = vec_sum(location, direction);
	result[0] = (result[0] + ROWS) % ROWS;
	result[1] = (result[1] + COLS) % COLS;
	return result;
}

function are_not_opposite(v1, v2) {
	// check if directions aren't opposite, by checking if the sum isn't [0, 0]
	return vec_sum(v1, v2).some(Boolean);
}

/**
 * random int between 0 (included) and max (not included)
 */
function rand(max) {
	return Math.floor(Math.random() * max);
}

function points_equal(p1, p2) {
	return p1[0] == p2[0] && p1[1] == p2[1];
}

function move_fruit(after_head) {

	const repr = (ij) => ij[0] * ROWS + ij[1];
	
	const blacklist = new Set(snake_coords.map(repr));
	blacklist.add(repr(after_head));

	const options = [];

	for (let i = 0; i < ROWS; i++) for (let j = 0; j < COLS; j++) {

		const option = [i, j];

		if (!blacklist.has(repr(option))) 
			options.push(option);
	}

	fruit_location = options[rand(options.length)];
	dye_as_fruit(fruit_location);
}

function move_snake() {
	snk_drct = drct_requests.shift() || snk_drct;

	const old_head = snake_coords[snake_coords.length - 1];
	const new_head = neighbor(old_head, snk_drct);

	if (snake_coords.some(ij => points_equal(new_head, ij))) {
		clearInterval(main_timer_id);
		alert('game over');
		return;
	}

	snake_coords.push(new_head);
	dye_as_head(new_head);
	dye_as_snake(old_head);

	if (points_equal(fruit_location, new_head)) {
		move_fruit(new_head);
	}
	else {
		const old_tail = snake_coords.shift();
		dye_as_regular(old_tail);
	}	
}




