import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotingZonelessComponent } from './promoting-zoneless.component';

describe('PromotingZonelessComponent', () => {
  let component: PromotingZonelessComponent;
  let fixture: ComponentFixture<PromotingZonelessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotingZonelessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotingZonelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
