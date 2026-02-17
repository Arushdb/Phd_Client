import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDocumentsComponent } from './scholar-documents.component';

describe('ScholarDocumentsComponent', () => {
  let component: ScholarDocumentsComponent;
  let fixture: ComponentFixture<ScholarDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
