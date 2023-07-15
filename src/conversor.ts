export function convertirLaberinto(maze: number[][], pathWidth: number): number[][] {
	const newMaze: number[][] = [];
	const originalWidth = maze.length;
	const originalHeight = maze[0].length;
  
	// Calcula el nuevo ancho y alto del laberinto
	const newWidth = (originalWidth - 2) * pathWidth + 2;
	const newHeight = (originalHeight - 2) * pathWidth + 2;
  
	// Inicializa el nuevo laberinto con muros (-1)
	for (let i = 0; i < newWidth; i++) {
	  newMaze[i] = [];
	  for (let j = 0; j < newHeight; j++) {
		newMaze[i][j] = -1;
	  }
	}
  
	// Copia los caminos y la meta del laberinto original al nuevo laberinto
	for (let i = 1; i < originalWidth-1; i++) {
	  for (let j = 1; j < originalHeight-1; j++) {
		if(maze[i][j] === 0) {
			for(let i2 = (i*pathWidth-pathWidth+1); i2 <= (i*pathWidth); i2++) {
				for(let j2 = (j*pathWidth-pathWidth+1); j2 <= (j*pathWidth); j2++) {
					newMaze[i2][j2] = 0;
				}
			}
		}
		if(maze[i][j] === 99) {
			for(let i2 = (i*pathWidth-pathWidth+1); i2 <= (i*pathWidth); i2++) {
				for(let j2 = (j*pathWidth-pathWidth+1); j2 <= (j*pathWidth); j2++) {
					newMaze[i2][j2] = 99;
				}
			}
		}
	  }
	}
  
	return newMaze;
}