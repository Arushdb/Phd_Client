import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProgressReportComponent } from './review-progress-report.component';

describe('ReviewProgressReportComponent', () => {
  let component: ReviewProgressReportComponent;
  let fixture: ComponentFixture<ReviewProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewProgressReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
