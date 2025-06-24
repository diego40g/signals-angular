import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExperimentalApisComponent } from './new-experimental-apis.component';

describe('NewExperimentalApisComponent', () => {
  let component: NewExperimentalApisComponent;
  let fixture: ComponentFixture<NewExperimentalApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExperimentalApisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExperimentalApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
