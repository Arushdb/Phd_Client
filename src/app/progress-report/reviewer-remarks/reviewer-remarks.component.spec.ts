import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerRemarksComponent } from './reviewer-remarks.component';

describe('ReviewerRemarksComponent', () => {
  let component: ReviewerRemarksComponent;
  let fixture: ComponentFixture<ReviewerRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerRemarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
