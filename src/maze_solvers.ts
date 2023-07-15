import { clearGrid, getNeighbours, getNode } from "./common";
import { finishedGeneration, mazeProperties, selectedSolveAlgorithm } from './properties';

let nodeList;
let nodeListIndex;
let pathList;
let pathListIndex;
let found = false;
let path = false;

export function maze_solvers(): void {
	clearGrid();
	mazeProperties.isGridClean = false;
	clearGrid();

	switch(selectedSolveAlgorithm) {
		case 1:
			breadthFirst();
			break;
		case 2:
			bidirectional_breadthFirst();
			break;
		case 3:
			greedyBestFirst();
			break;
		case 4:
			dijkstra();
			break;
		case 5:
			aStar();
			break;
		default:
			dijkstra();
			break;
	}
}


function distance(point_1, point_2): number {
	return Math.sqrt(Math.pow(point_2[0] - point_1[0], 2) + Math.pow(point_2[1] - point_1[1], 2));
}

function mazeSolversInterval(): void {
	mazeProperties.myInterval = window.setInterval(function() {
		if (!path) {
			nodeListIndex++;

			if (nodeListIndex == nodeList.length) {
				if (!found)
					clearInterval(mazeProperties.myInterval);

				else {
					path = true;
				}
			}
		}

		else {
			if (pathListIndex == pathList.length) {
				clearInterval(mazeProperties.myInterval);
				mazeProperties.finishedPath=JSON.parse(JSON.stringify(pathList));
				finishedGeneration.next(mazeProperties);
				return;
			}

			pathListIndex++;
		}
	}, 10);
}

function breadthFirst(): void {
	nodeList = [];
	nodeListIndex = 0;
	pathList = [];
	pathListIndex = 0;
	found = false;
	path = false;
	let frontier = [mazeProperties.startPos];
	mazeProperties.grid[mazeProperties.startPos[0]][mazeProperties.startPos[1]] = 1;

	do {
		let list = getNeighbours(frontier[0], 1);
		frontier.splice(0, 1);

		for (let i = 0; i < list.length; i++) {
			if (getNode(list[i][0], list[i][1]) == 0) {
				frontier.push(list[i]);
				mazeProperties.grid[list[i][0]][list[i][1]] = i + 1;

				if (list[i][0] == mazeProperties.targetPos[0] && list[i][1] == mazeProperties.targetPos[1]) {
					found = true;
					break;
				}

				nodeList.push(list[i]);
			}
		}
	} while (frontier.length > 0 && !found)

	if (found) {
		let currentNode = mazeProperties.targetPos;

		while (currentNode[0] != mazeProperties.startPos[0] || currentNode[1] != mazeProperties.startPos[1]) {
			switch (mazeProperties.grid[currentNode[0]][currentNode[1]]) {
				case 1:
					currentNode = [currentNode[0], currentNode[1] + 1];
					break;
				case 2:
					currentNode = [currentNode[0] - 1, currentNode[1]];
					break;
				case 3:
					currentNode = [currentNode[0], currentNode[1] - 1];
					break;
				case 4:
					currentNode = [currentNode[0] + 1, currentNode[1]];
					break;
				default:
					break;
			}

			pathList.push(currentNode);
		}

		pathList.pop();
		pathList.reverse();
	}

	mazeSolversInterval();
}

function bidirectional_breadthFirst(): void {
	nodeList = [];
	nodeListIndex = 0;
	pathList = [];
	pathListIndex = 0;
	found = false;
	path = false;
	let currentCell;
	let start_end;
	let target_end;
	let frontier = [mazeProperties.startPos, mazeProperties.targetPos];
	mazeProperties.grid[mazeProperties.targetPos[0]][mazeProperties.targetPos[1]] = 1;
	mazeProperties.grid[mazeProperties.startPos[0]][mazeProperties.startPos[1]] = 11;

	do {
		currentCell = frontier[0];
		let list = getNeighbours(currentCell, 1);
		frontier.splice(0, 1);

		for (let i = 0; i < list.length; i++) {
			if (getNode(list[i][0], list[i][1]) == 0) {
				frontier.push(list[i]);

				if (mazeProperties.grid[currentCell[0]][currentCell[1]] < 10) {
					mazeProperties.grid[list[i][0]][list[i][1]] = i + 1;
				} else {
					mazeProperties.grid[list[i][0]][list[i][1]] = 11 + i;
				}

				nodeList.push(list[i]);
			}

			else if (getNode(list[i][0], list[i][1]) > 0) {
				if (mazeProperties.grid[currentCell[0]][currentCell[1]] < 10 && getNode(list[i][0], list[i][1]) > 10) {
					start_end = currentCell;
					target_end = list[i];
					found = true;
					break;
				}

				else if (mazeProperties.grid[currentCell[0]][currentCell[1]] > 10 && getNode(list[i][0], list[i][1]) < 10) {
					start_end = list[i];
					target_end = currentCell;
					found = true;
					break;
				}
			}
		}
	}
	while (frontier.length > 0 && !found)

	if (found) {
		let targets = [mazeProperties.targetPos, mazeProperties.startPos];
		let starts = [start_end, target_end];

		for (let i = 0; i < starts.length; i++) {
			let currentNode = starts[i];

			while (currentNode[0] != targets[i][0] || currentNode[1] != targets[i][1]) {
				pathList.push(currentNode);

				switch (mazeProperties.grid[currentNode[0]][currentNode[1]] - (i * 10)) {
					case 1:
						currentNode = [currentNode[0], currentNode[1] + 1];
						break;
					case 2:
						currentNode = [currentNode[0] - 1, currentNode[1]];
						break;
					case 3:
						currentNode = [currentNode[0], currentNode[1] - 1];
						break;
					case 4:
						currentNode = [currentNode[0] + 1, currentNode[1]];
						break;
					default:
						break;
				}
			}

			if (i == 0) {
				pathList.reverse();
			}
		}

		pathList.reverse();
	}

	mazeSolversInterval();
}

function greedyBestFirst(): void {
	nodeList = [];
	nodeListIndex = 0;
	pathList = [];
	pathListIndex = 0;
	found = false;
	path = false;
	let frontier = [mazeProperties.startPos];
	mazeProperties.grid[mazeProperties.startPos[0]][mazeProperties.startPos[1]] = 1;

	do {
		frontier.sort(function(a, b) {
			return distance(a, mazeProperties.targetPos) - distance(b, mazeProperties.targetPos);
		});

		let list = getNeighbours(frontier[0], 1);
		frontier.splice(0, 1);

		for (let i = 0; i < list.length; i++) {
			if (getNode(list[i][0], list[i][1]) == 0) {
				frontier.push(list[i]);
				mazeProperties.grid[list[i][0]][list[i][1]] = i + 1;

				if (list[i][0] == mazeProperties.targetPos[0] && list[i][1] == mazeProperties.targetPos[1]) {
					found = true;
					break;
				}

				nodeList.push(list[i]);
			}
		}
	}
	while (frontier.length > 0 && !found)

	if (found) {
		let currentNode = mazeProperties.targetPos;

		while (currentNode[0] != mazeProperties.startPos[0] || currentNode[1] != mazeProperties.startPos[1]) {
			switch (mazeProperties.grid[currentNode[0]][currentNode[1]]) {
				case 1:
					currentNode = [currentNode[0], currentNode[1] + 1];
					break;
				case 2:
					currentNode = [currentNode[0] - 1, currentNode[1]];
					break;
				case 3:
					currentNode = [currentNode[0], currentNode[1] - 1];
					break;
				case 4:
					currentNode = [currentNode[0] + 1, currentNode[1]];
					break;
				default:
					break;
			}

			pathList.push(currentNode);
		}

		pathList.pop();
		pathList.reverse();
	}

	mazeSolversInterval();
}

function dijkstra(): void {
	breadthFirst();
}

function aStar(): void {
	nodeList = [];
	nodeListIndex = 0;
	pathList = [];
	pathListIndex = 0;
	found = false;
	path = false;
	let frontier = [mazeProperties.startPos];
	let costGrid = new Array(mazeProperties.grid.length).fill(0).map(() => new Array(mazeProperties.grid[0].length).fill(0));
	mazeProperties.grid[mazeProperties.startPos[0]][mazeProperties.startPos[1]] = 1;

	do {
		frontier.sort(function(a, b) {
			let a_value = costGrid[a[0]][a[1]] + distance(a, mazeProperties.targetPos) * Math.sqrt(2);
			let b_value = costGrid[b[0]][b[1]] + distance(b, mazeProperties.targetPos) * Math.sqrt(2);
			return a_value - b_value;
		});

		let currentCell = frontier[0];
		let list = getNeighbours(currentCell, 1);
		frontier.splice(0, 1);

		for (let i = 0; i < list.length; i++) {
			if (getNode(list[i][0], list[i][1]) == 0) {
				frontier.push(list[i]);
				mazeProperties.grid[list[i][0]][list[i][1]] = i + 1;
				costGrid[list[i][0]][list[i][1]] = costGrid[currentCell[0]][currentCell[1]] + 1;

				if (list[i][0] == mazeProperties.targetPos[0] && list[i][1] == mazeProperties.targetPos[1])
				{
					found = true;
					break;
				}

				nodeList.push(list[i]);
			}
		}
	} while (frontier.length > 0 && !found)

	if (found) {
		let currentNode = mazeProperties.targetPos;

		while (currentNode[0] != mazeProperties.startPos[0] || currentNode[1] != mazeProperties.startPos[1])
		{
			switch (mazeProperties.grid[currentNode[0]][currentNode[1]])
			{
				case 1: currentNode = [currentNode[0], currentNode[1] + 1]; break;
				case 2: currentNode = [currentNode[0] - 1, currentNode[1]]; break;
				case 3: currentNode = [currentNode[0], currentNode[1] - 1]; break;
				case 4: currentNode = [currentNode[0] + 1, currentNode[1]]; break;
				default: break;
			}

			pathList.push(currentNode);
		}

		pathList.pop();
		pathList.reverse();
	}

	mazeSolversInterval();
}