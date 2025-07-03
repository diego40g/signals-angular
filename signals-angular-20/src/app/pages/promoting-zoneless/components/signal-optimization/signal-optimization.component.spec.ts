import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalOptimizationComponent } from './signal-optimization.component';

describe('SignalOptimizationComponent', () => {
  let component: SignalOptimizationComponent;
  let fixture: ComponentFixture<SignalOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalOptimizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
