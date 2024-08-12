import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gameboardGuard } from './gameboard.guard';

describe('gameboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gameboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
