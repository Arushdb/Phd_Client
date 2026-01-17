import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarRegistrationComponent } from './scholar-registration.component';

describe('ScholarRegistrationComponent', () => {
  let component: ScholarRegistrationComponent;
  let fixture: ComponentFixture<ScholarRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
