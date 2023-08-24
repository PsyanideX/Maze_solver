import { MazeProperties } from "./interfaces";

export const gridSizeX: number = 21;
export const gridSizeY: number = 21;

export const initialConfig = {
    gridSizeX: 21,
    gridSizeY: 21
}

export const mazeProperties: MazeProperties = {
    grid: undefined,
    startPos: undefined,
    targetPos: undefined,
    isGridClean: true,
    generating: false,
    timeouts: [],
    finishedGrid: undefined,
    finishedPath: undefined,
    renderGrid: undefined
}
