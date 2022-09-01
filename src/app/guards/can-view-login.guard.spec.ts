import { TestBed } from '@angular/core/testing';

import { CanViewLoginGuard } from './can-view-login.guard';

describe('CanViewLoginGuard', () => {
  let guard: CanViewLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanViewLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
