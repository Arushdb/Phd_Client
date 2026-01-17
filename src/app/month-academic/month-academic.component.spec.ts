import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAcademicComponent } from './month-academic.component';

describe('MonthAcademicComponent', () => {
  let component: MonthAcademicComponent;
  let fixture: ComponentFixture<MonthAcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthAcademicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
