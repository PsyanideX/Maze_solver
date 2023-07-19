import { maze_generators } from "./maze_generators";
import { maze_solvers } from "./maze_solvers";
import { initialConfig, mazeProperties } from "./properties";

export default function generateMazeAndSolution(gridSizeX: number, gridSizeY: number, pathWidth: number): any {

	initialConfig.gridSizeX = gridSizeX;
	initialConfig.gridSizeY = gridSizeY;
	initialConfig.pathWidth = pathWidth;

	generateGrid();
	maze_generators();
	maze_solvers();
	return mazeProperties;
}

function generateGrid(): void {
	mazeProperties.grid = new Array(initialConfig.gridSizeX).fill(0).map(() => new Array(initialConfig.gridSizeY).fill(0));

	mazeProperties.startPos = [1, initialConfig.gridSizeY - 2];
	mazeProperties.targetPos = [initialConfig.gridSizeX - 2, 1];
}
