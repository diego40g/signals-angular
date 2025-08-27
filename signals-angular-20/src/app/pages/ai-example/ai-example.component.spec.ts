import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiExampleComponent } from './ai-example.component';

describe('AiExampleComponent', () => {
  let component: AiExampleComponent;
  let fixture: ComponentFixture<AiExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
