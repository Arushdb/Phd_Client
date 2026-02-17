import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerDocumentsComponent } from './reviewer-documents.component';

describe('ReviewerDocumentsComponent', () => {
  let component: ReviewerDocumentsComponent;
  let fixture: ComponentFixture<ReviewerDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
