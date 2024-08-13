export function findWinningMove(tiles: string[] | any, choice: string | null, availableMoves: number[]): number | null {
  for (const move of availableMoves) {
    const tilesCopy = [...tiles];
    tilesCopy[move] = choice;
    if (isWinningBoard(tilesCopy, choice)) {
      return move;
    }
  }
  return null;
}

export function isWinningBoard(tiles: string[], choice: string | null): boolean {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination =>
    combination.every(index => tiles[index] === choice)
  );
}

export function findBestStrategicMove(availableMoves: number[]): number | null {
  const strategicPositions = [0, 2, 6, 8];
  for (const pos of strategicPositions) {
    if (availableMoves.includes(pos)) {
      return pos;
    }
  }
  return null;
}

export function getAvailableMoves(tiles: string[]): number[] {
  return tiles
    .map((tile, index) => tile === null ? index : null)
    .filter(index => index !== null) as number[];
}

export function getRandomMove(availableMoves: number[]): number {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
