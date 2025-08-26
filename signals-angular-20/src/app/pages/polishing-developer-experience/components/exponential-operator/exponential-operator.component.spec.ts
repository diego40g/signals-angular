import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponentialOperatorComponent } from './exponential-operator.component';

describe('ExponentialOperatorComponent', () => {
  let component: ExponentialOperatorComponent;
  let fixture: ComponentFixture<ExponentialOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExponentialOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExponentialOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
