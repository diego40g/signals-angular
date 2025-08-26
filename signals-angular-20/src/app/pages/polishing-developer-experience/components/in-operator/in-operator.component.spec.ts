import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOperatorComponent } from './in-operator.component';

describe('InOperatorComponent', () => {
  let component: InOperatorComponent;
  let fixture: ComponentFixture<InOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
