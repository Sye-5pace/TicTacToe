import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private playerScore = new BehaviorSubject<number>(parseInt(localStorage.getItem('playerScore') || '0', 10));
  private cpuScore = new BehaviorSubject<number>(parseInt(localStorage.getItem('cpuScore') || '0', 10));
  private tiesScore = new BehaviorSubject<number>(parseInt(localStorage.getItem('ties') || '0', 10));

  playerScore$ = this.playerScore.asObservable();
  cpuScore$ = this.cpuScore.asObservable();
  tiesScore$ = this.tiesScore.asObservable();
  scores$: any;

  loadScores(): void {
    this.playerScore.next(parseInt(localStorage.getItem('playerScore') || '0', 10));
    this.cpuScore.next(parseInt(localStorage.getItem('cpuScore') || '0', 10));
    this.tiesScore.next(parseInt(localStorage.getItem('ties') || '0', 10));
  }

  updateScores(result: string): void {
    let updated = false;

    if (result === 'Player wins!') {
      const newPlayerScore = this.playerScore.value + 4;
      this.playerScore.next(newPlayerScore);
      localStorage.setItem('playerScore', newPlayerScore.toString());
      updated = true;
    } else if (result === 'CPU wins!') {
      const newCpuScore = this.cpuScore.value + 4;
      this.cpuScore.next(newCpuScore);
      localStorage.setItem('cpuScore', newCpuScore.toString());
      updated = true;
    } else if (result === 'Draw!') {
      const newTiesScore = this.tiesScore.value + 1;
      this.tiesScore.next(newTiesScore);
      localStorage.setItem('ties', newTiesScore.toString());
      updated = true;
    }

    if (updated) {
      console.log('Scores updated:', {
        player: this.playerScore.value,
        cpu: this.cpuScore.value,
        ties: this.tiesScore.value,
      });
    }
  }


  getPlayerScore(): number {
    return this.playerScore.value;
  }

  getCpuScore(): number {
    return this.cpuScore.value;
  }

  getTiesScore(): number {
    return this.tiesScore.value;
  }
}
