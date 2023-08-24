# Maze generator and solver

This package is a fork of Angel Uriot project (https://angeluriot.com/maze_solver/).

It's a simplified version which generates a maze as a bidimensional array of numbers where 0 represents a path, -1 a wall and 99 is the target point.

It exports the function "generateMazeAndSolution(gridSizeX: number, gridSizeY: number): any". It takes 2 parameters as input. The width and the height of the maze.

This function returns 2 main things:
    
    - The maze as a bidimensional array with the size we passed as parameter.
    - The path from the starting point to the ending point.
        + This comes also as a bidimensional array, where the inner arrays have 2 positions and represent the coordinates.


NPM:    https://www.npmjs.com/package/maze-generator-and-solver

GitHub: https://github.com/PsyanideX/Maze_solver