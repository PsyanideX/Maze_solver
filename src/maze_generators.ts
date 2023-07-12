import { addWall, clearGrid, getNeighbours, getNode, removeWall } from "./common";
import { maze_solvers } from "./maze_solvers";
import { mazeProperties, selectedGenAlgorithm } from './properties';

export function maze_generators(): void {
	console.info("Starting maze generation")
	mazeProperties.generating = true;
	mazeProperties.isGridClean = false;

	switch(selectedGenAlgorithm) {
		case 1: 
			randomized_depth_first();
			break;
		case 2:
			kruskal_algorithm();
			break;
		case 3:
			primAlgorithm();
			break;
		case 4:
			wilson_algorithm();
			break;
		case 5:
			aldousBroderAlgorithm();
			break;
		case 6:
			recursiveDivision();
			break;
		default:
			kruskal_algorithm();
			break;
	}
}

function finishGenerate(): void {
	mazeProperties.grid[mazeProperties.startPos[1]][mazeProperties.startPos[0]] = 2;
	console.log(mazeProperties.grid);
	console.log(mazeProperties.startPos);
	console.log(mazeProperties.targetPos);
	setTimeout(() => {
		maze_solvers();
	}, 1000)
}

function enclose(): void {
	for (let i = 0; i < mazeProperties.grid.length; i++) {
		addWall(i, 0);
		addWall(i, mazeProperties.grid[0].length - 1);
	}

	for (let j = 0; j < mazeProperties.grid[0].length; j++) {
		addWall(0, j);
		addWall(mazeProperties.grid.length - 1, j);
	}
}

function randomized_depth_first(): void {
	fill();
	let currentCell = [1, 1];
	removeWall(currentCell[0], currentCell[1]);
	mazeProperties.grid[currentCell[0]][currentCell[1]] = 1;
	let stack = [currentCell];

	mazeProperties.myInterval = window.setInterval(function() {
		if (stack.length == 0) {
			clearInterval(mazeProperties.myInterval);
			clearGrid();
			mazeProperties.generating = false;
			return;
		}

		currentCell = stack.pop();
		let neighbours = [];
		let list = getNeighbours(currentCell, 2);

		for (let i = 0; i < list.length; i++) {
			if (getNode(list[i][0], list[i][1]) == -1 || getNode(list[i][0], list[i][1]) == 0) {
				neighbours.push(list[i]);
			}
		}

		if (neighbours.length > 0) {
			stack.push(currentCell);
			let chosen_cell = neighbours[randomInt(0, neighbours.length)];
			removeWall((currentCell[0] + chosen_cell[0]) / 2, (currentCell[1] + chosen_cell[1]) / 2);
			removeWall(chosen_cell[0], chosen_cell[1]);
			mazeProperties.grid[chosen_cell[0]][chosen_cell[1]] = 1;
			stack.push(chosen_cell);
		} else {
			removeWall(currentCell[0], currentCell[1]);
			mazeProperties.grid[currentCell[0]][currentCell[1]] = 2;
		}
	}, 16);
}

function kruskal_algorithm(): void {
	fillWalls();
	let nb_areas = 0;
	let wall_list = [];

	for (let i = 1; i < mazeProperties.grid.length - 1; i++) {
		for (let j = 1; j < mazeProperties.grid[0].length - 1; j++)
		{
			if (i % 2 == 1 && j % 2 == 1)
			{
				nb_areas++;
				mazeProperties.grid[i][j] = nb_areas;
			}
			
			if ((i + j) % 2 == 1)
			wall_list.push([i, j]);
		}
	}

	mazeProperties.myInterval = window.setInterval(function() {
		while (true) {
			if (nb_areas == 1) {
				clearInterval(mazeProperties.myInterval);
				clearGrid();
				mazeProperties.generating = false;
				finishGenerate();
				return;
			}

			let index = randomInt(0, wall_list.length);
			let wall = wall_list[index];
			wall_list.splice(index, 1);
			let cell_pair;

			if (mazeProperties.grid[wall[0] - 1][wall[1]] > -1) {
				cell_pair = [mazeProperties.grid[wall[0] - 1][wall[1]], mazeProperties.grid[wall[0] + 1][wall[1]]];
			} else {
				cell_pair = [mazeProperties.grid[wall[0]][wall[1] - 1],mazeProperties.grid[wall[0]][wall[1] + 1]];
			}

			if (cell_pair[0] != cell_pair[1]) {
				for (let i = 1; i < mazeProperties.grid.length - 1; i += 2) {
					for (let j = 1; j < mazeProperties.grid[0].length - 1; j += 2) {
						if (mazeProperties.grid[i][j] == cell_pair[0]) {
							mazeProperties.grid[i][j] = cell_pair[1];
						}
					}
				}

				removeWall(wall[0], wall[1]);
				nb_areas--;
				return;
			}
		}
	}, 29);
}

function primAlgorithm(): void {
	fill();
	let first_cell = [1, 1];
	removeWall(first_cell[0], first_cell[1]);
	mazeProperties.grid[first_cell[0]][first_cell[1]] = 1;
	let wall_list = [];
	let list = getNeighbours(first_cell, 1);

	for (let i = 0; i < list.length; i++) {
		if (list[i][0] > 0 && list[i][0] < mazeProperties.grid.length - 1 && list[i][1] > 0 && list[i][1] < mazeProperties.grid[0].length - 1) {
			wall_list.push(list[i]);
		}
	}

	mazeProperties.myInterval = window.setInterval(function() {
		while (true) {
			if (wall_list.length == 0) {
				clearInterval(mazeProperties.myInterval);
				clearGrid();
				mazeProperties.generating = false;
				finishGenerate();
				return;
			}

			let index = randomInt(0, wall_list.length);
			let wall = wall_list[index];
			wall_list.splice(index, 1);
			let cell_pair;

			if (wall[0] % 2 == 0) {
				cell_pair = [[wall[0] - 1, wall[1]], [wall[0] + 1, wall[1]]];
			} else {
				cell_pair = [[wall[0], wall[1] - 1], [wall[0], wall[1] + 1]];
			}

			let new_cell;
			let valid = false;

			if (mazeProperties.grid[cell_pair[0][0]][cell_pair[0][1]] < 1) {
				new_cell = cell_pair[0];
				valid = true;
			} else if (mazeProperties.grid[cell_pair[1][0]][cell_pair[1][1]] < 1) {
				new_cell = cell_pair[1];
				valid = true;
			}

			if (valid) {
				removeWall(wall[0], wall[1]);
				removeWall(new_cell[0], new_cell[1]);
				mazeProperties.grid[new_cell[0]][new_cell[1]] = 1;
				let list = getNeighbours(new_cell, 1);

				for (let i = 0; i < list.length; i++) {
					if (
						list[i][0] > 0 && list[i][0] < mazeProperties.grid.length - 1 &&
						list[i][1] > 0 && list[i][1] < mazeProperties.grid[0].length - 1
					) {
						wall_list.push(list[i]);
					}
				}

				return;
			}
		}
	}, 28);
}

function wilson_algorithm(): void {
	fill();
	let cell_list = [];

	for (let i = 1; i < mazeProperties.grid.length - 1; i += 2) {
		for (let j = 1; j < mazeProperties.grid[0].length - 1; j += 2) {
			cell_list.push([i, j]);
		}
	}

	let first_cell = cell_list[0];
	cell_list.splice(0, 1);
	mazeProperties.grid[first_cell[0]][first_cell[1]] = 10;
	let currentCell = cell_list[randomInt(0, cell_list.length)];
	let random_walk = true;
	let first_step = currentCell;
	let new_way_list = [];

	mazeProperties.myInterval = window.setInterval(function() {
		if (cell_list.length == 0) {
			clearInterval(mazeProperties.myInterval);
			clearGrid();
			mazeProperties.generating = false;
			finishGenerate();
			return;
		}

		if (random_walk) {
			while (true) {
				let list = getNeighbours(currentCell, 2);
				let index;
				let chosen_cell;

				do
				{
					index = randomInt(0, list.length);
					chosen_cell = list[index];
				}
				while (getNode(chosen_cell[0], chosen_cell[1]) == -2)

				mazeProperties.grid[currentCell[0]][currentCell[1]] = -(index + 3);

				if (mazeProperties.grid[chosen_cell[0]][chosen_cell[1]] == 10)
				{
					random_walk = false;
					currentCell = first_step;
					return;
				}

				else
					currentCell = chosen_cell;
			}
		} else {
			if (mazeProperties.grid[currentCell[0]][currentCell[1]] == 10) {
				currentCell = cell_list[randomInt(0, cell_list.length)];
				random_walk = true;
				first_step = currentCell;

				new_way_list = [];
			}

			else {
				let index = -mazeProperties.grid[currentCell[0]][currentCell[1]] - 3;
				let next_cell = getNeighbours(currentCell, 2)[index];
				let wall = [(currentCell[0] + next_cell[0]) / 2, (currentCell[1] + next_cell[1]) / 2];
				new_way_list.push(currentCell);
				new_way_list.push(wall);
				removeWall(currentCell[0], currentCell[1]);
				removeWall(wall[0], wall[1]);
				mazeProperties.grid[currentCell[0]][currentCell[1]] = 10;

				for (let i = 0; i < cell_list.length; i++) {
					if (cell_list[i][0] == currentCell[0] && cell_list[i][1] == currentCell[1]) {
						cell_list.splice(i, 1);
						break;
					}
				}

				currentCell = next_cell;
			}
		}
	}, 18);
}

function aldousBroderAlgorithm(): void {
	fill();
	let cells_nb = ((mazeProperties.grid.length - 1) / 2) * ((mazeProperties.grid[0].length - 1) / 2);
	let currentCell = [1, 1];
	removeWall(currentCell[0], currentCell[1]);
	mazeProperties.grid[currentCell[0]][currentCell[1]] = 1;
	cells_nb--;

	mazeProperties.myInterval = window.setInterval(function() {
		if (cells_nb == 0) {
			clearInterval(mazeProperties.myInterval);
			clearGrid();
			mazeProperties.generating = false;
			finishGenerate();
			return;
		}

		while (true) {
			let neighbours = [];
			let list = getNeighbours(currentCell, 2);

			for (let i = 0; i < list.length; i++) {
				if (getNode(list[i][0], list[i][1]) != -2) {
					neighbours.push(list[i]);
				}
			}

			let chosen_cell = neighbours[randomInt(0, neighbours.length)];

			if (mazeProperties.grid[chosen_cell[0]][chosen_cell[1]] != 1) {
				let wall = [(currentCell[0] + chosen_cell[0]) / 2, (currentCell[1] + chosen_cell[1]) / 2];
				removeWall(wall[0], wall[1]);
				removeWall(chosen_cell[0], chosen_cell[1]);
				mazeProperties.grid[chosen_cell[0]][chosen_cell[1]] = 1;
				cells_nb--;
				currentCell = chosen_cell;
				return;
			}

			currentCell = chosen_cell;
		}
	}, 28);
}

function recursiveDivision(): void {
	enclose();
	let time = 0;
	let step = 17;
	mazeProperties.timeouts = [];

	function subRecursiveDivision(x_min, y_min, x_max, y_max) {
		if (y_max - y_min > x_max - x_min) {
			let x = randomInt(x_min + 1, x_max);
			let y = randomInt(y_min + 2, y_max - 1);

			if ((x - x_min) % 2 == 0) {	
				x += (randomInt(0, 2) == 0 ? 1 : -1);
			}

			if ((y - y_min) % 2 == 1) {
				y += (randomInt(0, 2) == 0 ? 1 : -1);
			}

			for (let i = x_min + 1; i < x_max; i++) {
				if (i != x) {
					time += step;
					mazeProperties.timeouts.push(setTimeout(function() { addWall(i, y); }, time));
				}
			}

			if (y - y_min > 2) {	
				subRecursiveDivision(x_min, y_min, x_max, y);
			}

			if (y_max - y > 2) {
				subRecursiveDivision(x_min, y, x_max, y_max);
			}
		}

		else {
			let x = randomInt(x_min + 2, x_max - 1);
			let y = randomInt(y_min + 1, y_max);

			if ((x - x_min) % 2 == 1) {
				x += (randomInt(0, 2) == 0 ? 1 : -1);
			}

			if ((y - y_min) % 2 == 0) {
				y += (randomInt(0, 2) == 0 ? 1 : -1);
			}

			for (let i = y_min + 1; i < y_max; i++) {
				if (i != y) {
					time += step;
					mazeProperties.timeouts.push(setTimeout(function() { addWall(x, i); }, time));
				}
			}

			if (x - x_min > 2) {
				subRecursiveDivision(x_min, y_min, x, y_max);
			}

			if (x_max - x > 2) {
				subRecursiveDivision(x, y_min, x_max, y_max);
			}
		}
	}

	subRecursiveDivision(0, 0, mazeProperties.grid.length - 1, mazeProperties.grid[0].length - 1);
	mazeProperties.timeouts.push(setTimeout(function() { mazeProperties.generating = false; mazeProperties.timeouts = [] }, time));
}

function randomInt(min, max): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function fill(): void {
	for (let i = 0; i < mazeProperties.grid.length; i++)
		for (let j = 0; j < mazeProperties.grid[0].length; j++)
			addWall(i, j);
}

function fillWalls(): void {
	for (let i = 0; i < mazeProperties.grid.length; i++)
		for (let j = 0; j < mazeProperties.grid[0].length; j++)
			if (i % 2 == 0 || j % 2 == 0)
				addWall(i, j);
}