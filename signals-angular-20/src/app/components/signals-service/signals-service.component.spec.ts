import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsServiceComponent } from './signals-service.component';

describe('SignalsServiceComponent', () => {
  let component: SignalsServiceComponent;
  let fixture: ComponentFixture<SignalsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
