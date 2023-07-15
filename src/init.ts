import { firstValueFrom } from "rxjs";
import { maze_generators } from "./maze_generators";
import { finishedGeneration, gridSizeX, gridSizeY, mazeProperties } from "./properties";

window.onload = function() {
	generateMazeAndSolution();
}

async function generateMazeAndSolution() {
	generateGrid();
	maze_generators();
	await firstValueFrom(finishedGeneration);
	console.log(JSON.parse(JSON.stringify(mazeProperties)));
}

function generateGrid(): void {
	mazeProperties.grid = new Array(gridSizeX).fill(0).map(() => new Array(gridSizeY).fill(0));

	mazeProperties.startPos = [1, gridSizeY - 2];
	mazeProperties.targetPos = [gridSizeX - 2, 1];
}


