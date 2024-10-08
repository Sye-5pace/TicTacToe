import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModalComponent } from './result-modal.component';

describe('ResultModalComponent', () => {
  let component: ResultModalComponent;
  let fixture: ComponentFixture<ResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
