import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeprecationNgifNgforNgswitchComponent } from './deprecation-ngif-ngfor-ngswitch.component';

describe('DeprecationNgifNgforNgswitchComponent', () => {
  let component: DeprecationNgifNgforNgswitchComponent;
  let fixture: ComponentFixture<DeprecationNgifNgforNgswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeprecationNgifNgforNgswitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeprecationNgifNgforNgswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
