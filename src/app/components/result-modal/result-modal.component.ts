import { Component, Input } from '@angular/core';
import { ReusableButtonComponent } from '../reusables/reusable-button/reusable-button.component';
import { ModalService } from '../../services/modal.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GameBoardComponent } from '../../views/game-board/game-board.component';
import { GameTurnsService } from '../../services/game-turns.service';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [ReusableButtonComponent],
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})

export class ResultModalComponent {
  @Input() result!: string;
  showResult: boolean = false;
  private destroy$ = new Subject<void>();
  cpuChoice!: any;
  playerChoice!: any;

  constructor(
    private modalService: ModalService,
    private gameBoard: GameBoardComponent,
    private router: Router,
    private gameTurn: GameTurnsService
  ){}

  ngOnInit() {
    this.modalService.resultModalVisibility$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isVisible) => this.showResult = isVisible);

    this.gameTurn.currentPlayerChoice$.pipe(takeUntil(this.destroy$))
    .subscribe((choice) => this.playerChoice = choice);

    this.gameTurn.cpuChoice$.pipe(takeUntil(this.destroy$))
    .subscribe((choice) => this.cpuChoice = choice);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  quit() {
    this.gameBoard.resetGame();
    this.modalService.hideResultModal();
    this.router.navigate(['/']);
  }

  replay() {
    this.gameBoard.resetGame();
    this.modalService.hideResultModal();
  }
}
