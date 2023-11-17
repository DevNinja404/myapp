import { TestBed } from '@angular/core/testing';

import { Apiso2operationserviceService } from './apiso2operationservice.service';

describe('Apiso2operationserviceService', () => {
  let service: Apiso2operationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiso2operationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
