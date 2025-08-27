import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgswitchDemoComponent } from './ngswitch-demo.component';

describe('NgswitchDemoComponent', () => {
  let component: NgswitchDemoComponent;
  let fixture: ComponentFixture<NgswitchDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgswitchDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgswitchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
