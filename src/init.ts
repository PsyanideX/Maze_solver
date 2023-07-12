import { maze_generators } from "./maze_generators";
import { gridSizeX, gridSizeY, mazeProperties } from "./properties";

window.onload = function() {
	generate_grid();
	maze_generators();
}

function generate_grid(): void {
	mazeProperties.grid = new Array(gridSizeX).fill(0).map(() => new Array(gridSizeY).fill(0));

	mazeProperties.startPos = [1, gridSizeY - 2];
	mazeProperties.targetPos = [gridSizeX - 2, 1];
}


