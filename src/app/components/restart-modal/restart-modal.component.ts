import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ReusableButtonComponent } from '../reusable-button/reusable-button.component';
import { GameBoardComponent } from '../../views/game-board/game-board.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-restart-modal',
  standalone: true,
  imports: [ReusableButtonComponent, GameBoardComponent],
  templateUrl: './restart-modal.component.html',
  styleUrls: ['./restart-modal.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})

export class RestartModalComponent implements OnDestroy {
  reset: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private modalService: ModalService, private gameBoard: GameBoardComponent) { }

  ngOnInit() {
    this.modalService.visibilityControl$
      .pipe(takeUntil(this.destroy$))
      .subscribe(control => {
        this.reset = control;
      });
  }

  hideModal() {
    this.modalService.hideModal();
  }

  resetGame() {
    this.gameBoard.resetGame();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
