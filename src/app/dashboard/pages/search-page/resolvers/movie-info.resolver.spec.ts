import { TestBed } from '@angular/core/testing';

import { MovieInfoResolver } from './movie-info.resolver';

describe('MovieInfoResolver', () => {
  let resolver: MovieInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
