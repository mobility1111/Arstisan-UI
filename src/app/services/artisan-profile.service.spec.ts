import { TestBed } from '@angular/core/testing';

import { ArtisanProfileService } from './artisan-profile.service';

describe('ArtisanProfileService', () => {
  let service: ArtisanProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisanProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
