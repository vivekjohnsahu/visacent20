import { TestBed, inject } from '@angular/core/testing';

import { RefferalService } from './refferal.service';

describe('RefferalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefferalService]
    });
  });

  it('should be created', inject([RefferalService], (service: RefferalService) => {
    expect(service).toBeTruthy();
  }));
});
