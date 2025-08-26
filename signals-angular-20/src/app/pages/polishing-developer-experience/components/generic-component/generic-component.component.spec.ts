import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericComponentComponent } from './generic-component.component';

describe('GenericComponentComponent', () => {
  let component: GenericComponentComponent;
  let fixture: ComponentFixture<GenericComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
