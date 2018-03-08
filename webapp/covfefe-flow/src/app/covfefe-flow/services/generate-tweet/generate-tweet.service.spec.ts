import { TestBed, inject } from '@angular/core/testing';

import { GenerateTweetService } from './generate-tweet.service';

describe('GenerateTweetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateTweetService]
    });
  });

  it('should be created', inject([GenerateTweetService], (service: GenerateTweetService) => {
    expect(service).toBeTruthy();
  }));
});
