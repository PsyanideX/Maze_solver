import { firstValueFrom } from "rxjs";
import { maze_generators } from "./maze_generators";
import { finishedGeneration, initialConfig, mazeProperties } from "./properties";

export default async function generateMazeAndSolution(gridSizeX: number, gridSizeY: number, pathWidth: number) {

	initialConfig.gridSizeX = gridSizeX;
	initialConfig.gridSizeY = gridSizeY;
	initialConfig.pathWidth = pathWidth;

	generateGrid();
	maze_generators();
	await firstValueFrom(finishedGeneration);
	return mazeProperties;
}

function generateGrid(): void {
	mazeProperties.grid = new Array(initialConfig.gridSizeX).fill(0).map(() => new Array(initialConfig.gridSizeY).fill(0));

	mazeProperties.startPos = [1, initialConfig.gridSizeY - 2];
	mazeProperties.targetPos = [initialConfig.gridSizeX - 2, 1];
}
