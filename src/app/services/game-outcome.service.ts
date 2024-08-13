import { Injectable } from '@angular/core';
import { isWinningBoard } from '../helpers/cpu-strategy-helpers';

@Injectable({
  providedIn: 'root'
})
export class GameOutcomeService {

  constructor() {}

  // Returns winning positions if there's a win for the given choice
  getWinningPositions(tiles: string[], choice: string): number[] | null {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      if (combination.every(index => tiles[index] === choice)) {
        return combination;
      }
    }
    return null;
  }

  // Determines the game outcome and provides winning positions
  determineOutcome(tiles: string[], playerChoice: string | null, cpuChoice: string | null): { outcome: string, winningPositions: number[] | null } {
    const playerWinPositions = this.getWinningPositions(tiles, playerChoice!);
    if (playerWinPositions) {
      return { outcome: 'Player wins!', winningPositions: playerWinPositions };
    }

    const cpuWinPositions = this.getWinningPositions(tiles, cpuChoice!);
    if (cpuWinPositions) {
      return { outcome: 'CPU wins!', winningPositions: cpuWinPositions };
    }

    if (this.checkDraw(tiles)) {
      return { outcome: 'Draw!', winningPositions: null };
    }

    return { outcome: 'Game ongoing', winningPositions: null };
  }

  private checkDraw(tiles: string[]): boolean {
    return tiles.every(tile => tile !== null) && !this.getWinningPositions(tiles, 'x') && !this.getWinningPositions(tiles, 'o');
  }
}
