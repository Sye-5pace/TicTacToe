import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';
import { SoloGamemodeService } from '../../services/solo-gamemode.service';
import { GameTurnsService } from '../../services/game-turns.service';
import { GameOutcomeService } from '../../services/game-outcome.service';
import { ModalService } from '../../services/modal.service';
import { RestartModalComponent } from '../../components/restart-modal/restart-modal.component';
import { ResultModalComponent } from '../../components/result-modal/result-modal.component';
import { ScoreService } from '../../services/score.service'; // New service for handling scores

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, RestartModalComponent, ResultModalComponent],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  tiles: string[] = Array(9).fill(null);
  cpuChoice: string | null = '';
  playerChoice: string | null = '';
  turn$ = this.soloModeService.turn$;
  winningPositions: number[] | null = null;
  result!: string;

  playerScore!: number;
  cpuScore!: number;
  tiesScore!: number;

  animations = [
    { target: 'header', delay: 500 },
    { target: '.anime-logo-2', delay: 600 },
    { target: '.anime-logo-1', delay: 700 }
  ];

  private static TILES_KEY = 'gameTiles';

  constructor(
    private gameTurns: GameTurnsService,
    private soloModeService: SoloGamemodeService,
    private modalService: ModalService,
    private gameOutcomeService: GameOutcomeService,
    private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.loadTilesFromLocalStorage();

    this.gameTurns.currentPlayerChoice$.subscribe(choice => {
      this.playerChoice = choice;
    });

    this.gameTurns.cpuChoice$.subscribe(choice => {
      this.cpuChoice = choice;
    });

    if (this.soloModeService.isCPUTurn()) {
      setTimeout(() => {
        this.makeCpuMove();
      }, 5000);
    }

    // Load scores using ScoreService
    this.scoreService.loadScores();
    this.scoreService.playerScore$.subscribe(score => this.playerScore = score);
    this.scoreService.cpuScore$.subscribe(score => this.cpuScore = score);
    this.scoreService.tiesScore$.subscribe(score => this.tiesScore = score);
  }

  ngAfterViewInit() {
    const timeline = anime.timeline({
      duration: 800,
    });

    this.animations.forEach(({ target, delay }) => {
      timeline.add({
        duration: 600,
        targets: target,
        translateX: [-400, 0],
        offset: delay,
        opacity: [0, 1],
      });
    });

    timeline.add({
      targets: '.mark-container .mark-tile',
      translateX: [400, 0],
      opacity: [0, 1],
      easing: 'easeOutBounce',
      delay: anime.stagger(100),
      offset: '+=50'
    });

    timeline.add({
      targets: '.score-bar',
      translateY: [150, 0],
      easing: 'easeOutQuad',
      opacity: [0, 1],
      offset: '+=200'
    });
  }

  makeChoice(index: number): void {
    const currentTurn = this.soloModeService.gameTurn.getValue();
    if (this.tiles[index] !== null) return;

    if (currentTurn === this.playerChoice || currentTurn === this.cpuChoice) {
      this.tiles[index] = currentTurn;
      this.saveTilesToLocalStorage();
      this.soloModeService.makeChoice();

      const outcome = this.gameOutcomeService.determineOutcome(this.tiles, this.playerChoice!, this.cpuChoice!);
      this.winningPositions = outcome.winningPositions;
      this.result = outcome.outcome;

      setTimeout(() => {
        this.showResultModal();
      }, 4000);

      if (this.soloModeService.isCPUTurn()) {
        setTimeout(() => {
          this.makeCpuMove();
        }, 2000);
      }
    }
  }

  private makeCpuMove(): void {
    const move = this.soloModeService.cpuMakeMove(this.tiles);
    if (move !== null) {
      this.tiles[move] = this.cpuChoice!;
      this.saveTilesToLocalStorage();
      this.soloModeService.makeChoice(true);

      const outcome = this.gameOutcomeService.determineOutcome(this.tiles, this.playerChoice!, this.cpuChoice!);
      this.winningPositions = outcome.winningPositions;
      this.result = outcome.outcome;

      setTimeout(() => {
        this.showResultModal();
        this.updateScores();
      }, 4000);
    }
  }

  private loadTilesFromLocalStorage(): void {
    const savedTiles = localStorage.getItem(GameBoardComponent.TILES_KEY);
    if (savedTiles) {
      this.tiles = JSON.parse(savedTiles);
    }
  }

  private saveTilesToLocalStorage(): void {
    localStorage.setItem(GameBoardComponent.TILES_KEY, JSON.stringify(this.tiles));
  }

  getTileClass(index: number): string {
    if (this.winningPositions && this.winningPositions.includes(index)) {
      if (this.tiles[index] === 'x') {
        return 'bg-turquoise text-mirage w-full h-full shadow-inner-bottom';
      } else if (this.tiles[index] === 'o') {
        return 'bg-saffron text-mirage w-full h-full shadow-inner-bottom';
      }
    }
    return this.tiles[index] === 'x' ? 'text-turquoise' : 'text-saffron';
  }

  public resetGame() {
    this.tiles = Array(9).fill(null);
    this.saveTilesToLocalStorage();
    this.soloModeService.resetGame();
  }

  displayModal() {
    this.modalService.showRestartModal();
  }

  showResultModal() {
    if (this.result !== 'Game ongoing') {
      this.modalService.showResultModal();
      this.updateScores();
    }
  }

  updateScores() {
    this.scoreService.updateScores(this.result);
  }
}
