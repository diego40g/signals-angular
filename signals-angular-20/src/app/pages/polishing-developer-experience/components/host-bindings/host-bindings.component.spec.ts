import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostBindingsComponent } from './host-bindings.component';

describe('HostBindingsComponent', () => {
  let component: HostBindingsComponent;
  let fixture: ComponentFixture<HostBindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostBindingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostBindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
