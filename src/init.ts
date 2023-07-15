import { firstValueFrom } from "rxjs";
import { maze_generators } from "./maze_generators";
import { finishedGeneration, initialConfig, mazeProperties } from "./properties";

window.onload = function() {
	generateMazeAndSolution(21,21,3);
}

export async function generateMazeAndSolution(gridSizeX: number, gridSizeY: number, pathWidth: number) {

	initialConfig.gridSizeX = gridSizeX;
	initialConfig.gridSizeY = gridSizeY;
	initialConfig.pathWidth = pathWidth;

	generateGrid();
	maze_generators();
	await firstValueFrom(finishedGeneration);
	console.log(JSON.parse(JSON.stringify(mazeProperties)));
}

function generateGrid(): void {
	mazeProperties.grid = new Array(initialConfig.gridSizeX).fill(0).map(() => new Array(initialConfig.gridSizeY).fill(0));

	mazeProperties.startPos = [1, initialConfig.gridSizeY - 2];
	mazeProperties.targetPos = [initialConfig.gridSizeX - 2, 1];
}

