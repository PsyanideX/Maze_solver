import { MazeProperties, MazeResult } from "./interfaces";
import { maze_generators } from "./maze_generators";
import { maze_solvers } from "./maze_solvers";
import { initialConfig, mazeProperties } from "./properties";


export default function generateMazeAndSolution(gridSizeX: number, gridSizeY: number): MazeResult {

	initialConfig.gridSizeX = gridSizeX;
	initialConfig.gridSizeY = gridSizeY;

	generateGrid();
	maze_generators();
	maze_solvers();

	return buildReturnValue(mazeProperties);
}

function generateGrid(): void {
	mazeProperties.grid = new Array(initialConfig.gridSizeX).fill(0).map(() => new Array(initialConfig.gridSizeY).fill(0));

	mazeProperties.startPos = [1, initialConfig.gridSizeY - 2];
	mazeProperties.targetPos = [initialConfig.gridSizeX - 2, 1];
}

function buildReturnValue(mazeProperties: MazeProperties): MazeResult {
	return {
		maze: mazeProperties.finishedGrid,
		path: mazeProperties.finishedPath
	}
}