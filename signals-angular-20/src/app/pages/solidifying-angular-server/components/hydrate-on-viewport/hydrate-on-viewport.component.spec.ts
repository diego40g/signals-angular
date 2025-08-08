import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrateOnViewportComponent } from './hydrate-on-viewport.component';

describe('HydrateOnViewportComponent', () => {
  let component: HydrateOnViewportComponent;
  let fixture: ComponentFixture<HydrateOnViewportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HydrateOnViewportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrateOnViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
