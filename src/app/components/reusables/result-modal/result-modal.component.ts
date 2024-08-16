import { Component, Input } from '@angular/core';
import { ReusableButtonComponent } from '../reusable-button/reusable-button.component';
import { ModalService } from '../../../services/modal.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GameBoardComponent } from '../../../views/game-board/game-board.component';

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

  constructor(
    private modalService: ModalService,
    private gameBoard: GameBoardComponent,
    private router: Router
  ){}

  ngOnInit() {
    this.modalService.resultModalVisibility$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isVisible) => this.showResult = isVisible);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  quit() {
    this.gameBoard.resetGame();
    this.router.navigate(['/']);
    this.modalService.hideResultModal(); // Hide result modal
  }

  replay() {
    this.gameBoard.resetGame();
    this.modalService.hideResultModal(); // Hide result modal
  }
}
