import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unknownUrlGuard } from './unknown-url.guard';

describe('unknownUrlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unknownUrlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
