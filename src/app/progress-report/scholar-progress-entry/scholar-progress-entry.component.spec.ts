import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarProgressEntryComponent } from './scholar-progress-entry.component';

describe('ScholarProgressEntryComponent', () => {
  let component: ScholarProgressEntryComponent;
  let fixture: ComponentFixture<ScholarProgressEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarProgressEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarProgressEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
