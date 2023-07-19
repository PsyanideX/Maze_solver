import { clearGrid, getNeighbours, getNode } from "./common";
import { mazeProperties } from './properties';

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

	breadthFirst();
}

function mazeSolversInterval(): void {
	let isSolving = true;
	while(isSolving) {
		if (!path) {
			nodeListIndex++;

			if (nodeListIndex == nodeList.length) {
				if (!found) {
					isSolving = false;
				} else {
					path = true;
				}
			}
		}

		else {
			if (pathListIndex == pathList.length) {
				isSolving = false;
				mazeProperties.finishedPath=JSON.parse(JSON.stringify(pathList));
				return;
			}

			pathListIndex++;
		}
	}
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