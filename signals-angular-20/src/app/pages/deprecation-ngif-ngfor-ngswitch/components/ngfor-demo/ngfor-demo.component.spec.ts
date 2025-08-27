import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgforDemoComponent } from './ngfor-demo.component';

describe('NgforDemoComponent', () => {
  let component: NgforDemoComponent;
  let fixture: ComponentFixture<NgforDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgforDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgforDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
