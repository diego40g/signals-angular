import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStreamComponent } from './multi-stream.component';

describe('MultiStreamComponent', () => {
  let component: MultiStreamComponent;
  let fixture: ComponentFixture<MultiStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
