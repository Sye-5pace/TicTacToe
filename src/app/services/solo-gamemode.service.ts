import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameTurnsService } from './game-turns.service';

@Injectable({
  providedIn: 'root'
})

export class SoloGamemodeService {
  private static TURN_KEY = 'gameTurn';
  public gameTurn = new BehaviorSubject<string>(this.loadFromLocalStorage(SoloGamemodeService.TURN_KEY) || 'x');

  turn$ = this.gameTurn.asObservable();
  playerChoice: string | null = null;
  cpuChoice: string | null = null;

  constructor(private gameTurnsService: GameTurnsService) {
    this.gameTurnsService.currentPlayerChoice$.subscribe(choice => {
      this.playerChoice = choice;
      console.log('playerChoice from solo-gamemode: ' + this.playerChoice);
    });
    this.gameTurnsService.cpuChoice$.subscribe(choice => {
      this.cpuChoice = choice;
      console.log('cpuChoice from solo-gamemode: ' + this.cpuChoice);
    });
    this.gameTurn.subscribe(turn => {
      this.saveToLocalStorage(SoloGamemodeService.TURN_KEY, turn);
    });
  }

  private loadFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  isCPUTurn(): boolean {
    return this.gameTurn.getValue() === this.cpuChoice
  }

  toggleTurn() {
    const newTurn = this.gameTurn.getValue() === 'x' ? 'o' : 'x';
    this.gameTurn.next(newTurn);
  }

  makeChoice(CPUMove: boolean = false) {
    const currentTurn = this.gameTurn.getValue();
    if(!CPUMove && currentTurn === this.playerChoice){
      this.toggleTurn();
    } else if(CPUMove && currentTurn === this.cpuChoice){
      this.toggleTurn();
    }
  }

  resetGame() {
    this.gameTurn.next('x');
        // Clear localStorage
    this.removeFromLocalStorage(SoloGamemodeService.TURN_KEY);
  }
}
