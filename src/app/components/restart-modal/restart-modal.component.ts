import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ReusableButtonComponent } from '../reusables/reusable-button/reusable-button.component';
import { Subject, takeUntil } from 'rxjs';
import { GameBoardComponent } from '../../views/game-board/game-board.component';

@Component({
  selector: 'app-restart-modal',
  standalone: true,
  imports: [ReusableButtonComponent],
  templateUrl: './restart-modal.component.html',
  styleUrls: ['./restart-modal.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class RestartModalComponent implements OnDestroy {
  reset: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private modalService: ModalService,
    private gameBoard: GameBoardComponent
  ) { }

  ngOnInit() {
    // Subscribe to the restart modal visibility observable
    this.modalService.restartModalVisibility$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isVisible => {
        this.reset = isVisible;
      });
  }

  hideModal() {
    this.modalService.hideRestartModal();
  }

  resetGame() {
    this.gameBoard.restartGame();
    this.hideModal();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
