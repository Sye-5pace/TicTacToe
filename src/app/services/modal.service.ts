import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  public visibilitySubject = new BehaviorSubject<boolean>(false);
  visibilityControl$ = this.visibilitySubject.asObservable();

  constructor() { }

  displayModal(): void{
    this.visibilitySubject.next(true);
  }

  hideModal(): void{
    this.visibilitySubject.next(false);
  }
}
