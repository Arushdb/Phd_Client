import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkThreadComponent } from './remark-thread.component';

describe('RemarkThreadComponent', () => {
  let component: RemarkThreadComponent;
  let fixture: ComponentFixture<RemarkThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkThreadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
