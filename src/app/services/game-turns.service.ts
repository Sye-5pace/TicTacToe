import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameTurnsService {
  private static PLAYER_CHOICE_KEY = 'playerChoice';
  private static CPU_CHOICE_KEY = 'cpuChoice';

  public playerChoiceSource = new BehaviorSubject<string|null>(this.loadFromLocalStorage(GameTurnsService.PLAYER_CHOICE_KEY));
  public cpuChoiceSource = new BehaviorSubject<string|null>(this.loadFromLocalStorage(GameTurnsService.CPU_CHOICE_KEY));

  currentPlayerChoice$ = this.playerChoiceSource.asObservable();
  cpuChoice$ = this.cpuChoiceSource.asObservable();

  constructor() {
    this.loadInitialChoices();
  }

  private loadInitialChoices(): void {
    const playerChoice = this.loadFromLocalStorage(GameTurnsService.PLAYER_CHOICE_KEY);
    const cpuChoice = this.loadFromLocalStorage(GameTurnsService.CPU_CHOICE_KEY);
    this.playerChoiceSource.next(playerChoice);
    this.cpuChoiceSource.next(cpuChoice);
  }

  private loadFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key) as string | null;
  }

  private saveToLocalStorage(key: string, value: string | null): void {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }

  setPlayerChoice(choice: 'x' | 'o'): void {
    this.playerChoiceSource.next(choice);
    this.setCPUChoice(choice === 'x' ? 'o' : 'x');
    this.saveToLocalStorage(GameTurnsService.PLAYER_CHOICE_KEY, choice);
  }

  private setCPUChoice(choice: 'x' | 'o'): void {
    this.cpuChoiceSource.next(choice);
    this.saveToLocalStorage(GameTurnsService.CPU_CHOICE_KEY, choice);
  }


  resetChoices(): void {
    this.playerChoiceSource.next(null);
    this.cpuChoiceSource.next(null);
    this.saveToLocalStorage(GameTurnsService.PLAYER_CHOICE_KEY, null);
    this.saveToLocalStorage(GameTurnsService.CPU_CHOICE_KEY, null);
  }
}
