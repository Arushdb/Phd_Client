import { TestBed } from '@angular/core/testing';

import { ProgressWorkService } from './progress-work.service';

describe('ProgressWorkService', () => {
  let service: ProgressWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
