import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidifyingAngularServerComponent } from './solidifying-angular-server.component';

describe('SolidifyingAngularServerComponent', () => {
  let component: SolidifyingAngularServerComponent;
  let fixture: ComponentFixture<SolidifyingAngularServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolidifyingAngularServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolidifyingAngularServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
