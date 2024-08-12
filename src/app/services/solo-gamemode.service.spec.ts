import { TestBed } from '@angular/core/testing';

import { SoloGamemodeService } from './solo-gamemode.service';

describe('SoloGamemodeService', () => {
  let service: SoloGamemodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoloGamemodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
