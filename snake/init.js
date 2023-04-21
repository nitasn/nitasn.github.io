'use strict';

(function(){ // build the board

	const table = document.getElementById('game-board');

	for (let i = 0; i < ROWS; i++) {

		const row = table.insertRow(i);

		for (let j = 0; j < COLS; j++) {

			const cell = row.insertCell(j);

			cell.classList.add('game-cell');
			cell.setAttribute('id', `cell_${i}_${j}`);

			dye_as_regular([i, j]);
		}
	}
}());


document.addEventListener('keydown', (e) => {

	if (e.code in keys_map) {

		e.preventDefault();
		
		on_usr_enter_drct(keys_map[e.code]);
	}
});

function on_usr_enter_drct(chosen) {

	const last = drct_requests.length ? 
			drct_requests[drct_requests.length - 1] : snk_drct;

	if (are_not_opposite(chosen, last))
		drct_requests.push(chosen);

	main_timer_id = main_timer_id || setInterval(move_snake, 100);
}

document.addEventListener('swiped-down', function(e) {
	e.preventDefault();
    on_usr_enter_drct(DIRECTIONS.DOWN);
});

document.addEventListener('swiped-up', function(e) {
	e.preventDefault();
    on_usr_enter_drct(DIRECTIONS.UP);
});

document.addEventListener('swiped-right', function(e) {
	e.preventDefault();
    on_usr_enter_drct(DIRECTIONS.RIGHT);
});

document.addEventListener('swiped-left', function(e) {
	e.preventDefault();
    on_usr_enter_drct(DIRECTIONS.LEFT);
});

function restart() {

	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			dye_as_regular([i, j]);
			cell_at([i, j]).innerText = '';
		}
	}

	snake_coords.length = 0;
	snake_coords.push([3, 3], [3, 4], [3, 5]);

	snk_drct = DIRECTIONS.RIGHT;

	if (main_timer_id) {
		clearInterval(main_timer_id);
		main_timer_id = null;
	}

	drct_requests = [];

	fruit_location = [20, 20];

	snake_coords.forEach(dye_as_snake);
	dye_as_head(snake_coords[snake_coords.length - 1]);
	dye_as_fruit(fruit_location);
}

// $(document).ready(function(){resize();});
// $(window).resize(function(){resize();});

// function resize()
// {
// 	if($(window).width() > 1120) // desktop
// 	{

// 	}
// 	else // mobile
// 	{
// 		$('#game-board').style.width = '60px';
// 	}
// }

restart();




