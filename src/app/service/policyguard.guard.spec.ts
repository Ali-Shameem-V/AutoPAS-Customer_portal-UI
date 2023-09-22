import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { policyguardGuard } from './policyguard.guard';

describe('policyguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => policyguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
