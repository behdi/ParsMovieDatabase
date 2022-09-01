import { TestBed } from '@angular/core/testing';

import { CanViewDashboardGuard } from './can-view-dashboard.guard';

describe('CanViewDashboardGuard', () => {
  let guard: CanViewDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanViewDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
