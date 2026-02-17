import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDashboardComponent } from './scholar-dashboard.component';

describe('ScholarDashboardComponent', () => {
  let component: ScholarDashboardComponent;
  let fixture: ComponentFixture<ScholarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
