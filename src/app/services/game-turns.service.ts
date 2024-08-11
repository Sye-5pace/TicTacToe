import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameTurnsService {
  public playerChoiceSource = new BehaviorSubject<string|null>(null)
  public cpuChoiceSource = new BehaviorSubject<string|null>(null)

  currentPlayerChoice$ = this.playerChoiceSource.asObservable()
  cpuChoice$ = this.cpuChoiceSource.asObservable()

  setPlayerChoice(choice: 'x'|'o'): void {
    this.playerChoiceSource.next(choice)
    this.setCPUChoice(choice === 'x' ? 'o' : 'x')
  }

  private setCPUChoice(choice: 'x'|'o'): void {
    this.cpuChoiceSource.next(choice);
  }

  // resetChoices(): void {
  //   this.playerChoiceSource.next(null)
  //   this.cpuChoiceSource.next(null)
  // }
  constructor() { }
}
