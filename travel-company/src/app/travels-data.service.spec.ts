import { TestBed } from '@angular/core/testing';

import { TravelsDataService } from './travels-data.service';

describe('TravelsDataService', () => {
  let service: TravelsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
