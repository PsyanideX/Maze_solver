import { addWall, clearGrid, removeWall } from "./common";
import { convertirLaberinto } from "./conversor";
import { initialConfig, mazeProperties } from './properties';

export function maze_generators(): void {
	mazeProperties.generating = true;
	mazeProperties.isGridClean = false;

	kruskal_algorithm();
}

function finishGenerate(): void {
	mazeProperties.finishedGrid = JSON.parse(JSON.stringify(mazeProperties.grid));
	mazeProperties.finishedGrid[mazeProperties.startPos[1]][mazeProperties.startPos[0]] = 99;
	const newMaze = convertirLaberinto(mazeProperties.finishedGrid, initialConfig.pathWidth);
	mazeProperties.renderGrid = newMaze;
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

	let isGenerating = true;
	while (isGenerating) {
		if (nb_areas == 1) {
			isGenerating = false;
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
		}
	}
}

function randomInt(min, max): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function fillWalls(): void {
	for (let i = 0; i < mazeProperties.grid.length; i++)
		for (let j = 0; j < mazeProperties.grid[0].length; j++)
			if (i % 2 == 0 || j % 2 == 0)
				addWall(i, j);
}