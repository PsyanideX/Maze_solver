export interface MazeResult {
    maze: number[][];
    path: number[][];
}

export interface MazeProperties {
    grid: number[][],
    startPos: number[],
    targetPos: number[],
    isGridClean: boolean,
    generating: boolean,
    timeouts: any[],
    finishedGrid: number[][],
    finishedPath: number[][],
    renderGrid: number[][]
}