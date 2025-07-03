import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRefComponent } from './application-ref.component';

describe('ApplicationRefComponent', () => {
  let component: ApplicationRefComponent;
  let fixture: ComponentFixture<ApplicationRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationRefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
