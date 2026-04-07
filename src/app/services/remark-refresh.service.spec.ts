import { TestBed } from '@angular/core/testing';

import { RemarkRefreshService } from './remark-refresh.service';

describe('RemarkRefreshService', () => {
  let service: RemarkRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarkRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
