import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameTurnsService } from './game-turns.service';

@Injectable({
  providedIn: 'root'
})

export class SoloGamemodeService {
  private static TURN_KEY = 'gameTurn';
  private static MARK_X_KEY = 'markX';
  private static MARK_O_KEY = 'markO';
  private gameTurn = new BehaviorSubject<string>(this.loadFromLocalStorage(SoloGamemodeService.TURN_KEY) || 'x');
  private markXRead = new BehaviorSubject<boolean>(this.loadFromLocalStorage(SoloGamemodeService.MARK_X_KEY) === 'true');
  private markORead = new BehaviorSubject<boolean>(this.loadFromLocalStorage(SoloGamemodeService.MARK_O_KEY) === 'true');

  turn$ = this.gameTurn.asObservable();
  markX$ = this.markXRead.asObservable();
  markO$ = this.markORead.asObservable();
  playerChoice: string | null = null;
  cpuChoice: string | null = null;

  constructor(private gameTurnsService: GameTurnsService) {
    this.gameTurnsService.currentPlayerChoice$.subscribe(choice => {
      this.playerChoice = choice;
    });
    this.gameTurnsService.cpuChoice$.subscribe(choice => {
      this.cpuChoice = choice;
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

  toggleTurn() {
    const newTurn = this.gameTurn.getValue() === 'x' ? 'o' : 'x';
    this.gameTurn.next(newTurn);
  }

  makeChoice() {
    const currentTurn = this.gameTurn.getValue();
    if (currentTurn === this.playerChoice) {
      if (currentTurn === 'x') {
        this.markXRead.next(true);
        this.markORead.next(false);
      } else if (currentTurn === 'o') {
        this.markORead.next(true);
        this.markXRead.next(false);
      }
      this.saveToLocalStorage(SoloGamemodeService.MARK_X_KEY, this.markXRead.getValue().toString());
      this.saveToLocalStorage(SoloGamemodeService.MARK_O_KEY, this.markORead.getValue().toString());
      console.log(`The Turn is playerChoice = ${currentTurn}`);
      console.log(`markXRead: ${this.markXRead.getValue()}`);
      console.log(`markORead: ${this.markORead.getValue()}`);
    }

    if (currentTurn === this.cpuChoice) {
      if (currentTurn === 'x') {
        this.markXRead.next(true);
        this.markORead.next(false);
      } else if (currentTurn === 'o') {
        this.markORead.next(true);
        this.markXRead.next(false);
      }
      this.saveToLocalStorage(SoloGamemodeService.MARK_X_KEY, this.markXRead.getValue().toString());
      this.saveToLocalStorage(SoloGamemodeService.MARK_O_KEY, this.markORead.getValue().toString());
      console.log(`The Turn is CPU = ${currentTurn}`);
      console.log(`markXRead: ${this.markXRead.getValue()}`);
      console.log(`markORead: ${this.markORead.getValue()}`);
    }
    this.toggleTurn();
  }
}
