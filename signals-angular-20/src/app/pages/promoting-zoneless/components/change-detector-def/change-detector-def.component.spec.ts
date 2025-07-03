import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorDefComponent } from './change-detector-def.component';

describe('ChangeDetectorDefComponent', () => {
  let component: ChangeDetectorDefComponent;
  let fixture: ComponentFixture<ChangeDetectorDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeDetectorDefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDetectorDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
