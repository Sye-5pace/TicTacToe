import { TestBed } from '@angular/core/testing';

import { GameOutcomeService } from './game-outcome.service';

describe('GameOutcomeService', () => {
  let service: GameOutcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOutcomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
