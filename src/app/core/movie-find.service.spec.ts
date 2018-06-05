import { TestBed, inject } from '@angular/core/testing';

import { MovieFindService } from './movie-find.service';

describe('MovieFindService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieFindService]
    });
  });

  it('should be created', inject([MovieFindService], (service: MovieFindService) => {
    expect(service).toBeTruthy();
  }));
});
