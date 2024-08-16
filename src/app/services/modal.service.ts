import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private restartModalSubject = new BehaviorSubject<boolean>(false);
  private resultModalSubject = new BehaviorSubject<boolean>(false);

  restartModalVisibility$ = this.restartModalSubject.asObservable();
  resultModalVisibility$ = this.resultModalSubject.asObservable();

  constructor() {}

  showRestartModal(): void {
    this.restartModalSubject.next(true);
  }

  hideRestartModal(): void {
    this.restartModalSubject.next(false);
  }

  showResultModal(): void {
    this.resultModalSubject.next(true);
  }

  hideResultModal(): void {
    this.resultModalSubject.next(false);
  }
}
