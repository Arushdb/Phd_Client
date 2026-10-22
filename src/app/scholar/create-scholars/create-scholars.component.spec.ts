import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScholarsComponent } from './create-scholars.component';

describe('CreateScholarsComponent', () => {
  let component: CreateScholarsComponent;
  let fixture: ComponentFixture<CreateScholarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScholarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScholarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
