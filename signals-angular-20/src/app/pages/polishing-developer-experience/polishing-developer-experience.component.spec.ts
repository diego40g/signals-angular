import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolishingDeveloperExperienceComponent } from './polishing-developer-experience.component';

describe('PolishingDeveloperExperienceComponent', () => {
  let component: PolishingDeveloperExperienceComponent;
  let fixture: ComponentFixture<PolishingDeveloperExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolishingDeveloperExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolishingDeveloperExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
