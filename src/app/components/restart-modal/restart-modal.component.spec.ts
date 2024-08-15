import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestartModalComponent } from './restart-modal.component';

describe('RestartModalComponent', () => {
  let component: RestartModalComponent;
  let fixture: ComponentFixture<RestartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestartModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
