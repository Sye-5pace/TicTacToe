import { TestBed } from '@angular/core/testing';

import { GameTurnsService } from './game-turns.service';

describe('GameTurnsService', () => {
  let service: GameTurnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTurnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
