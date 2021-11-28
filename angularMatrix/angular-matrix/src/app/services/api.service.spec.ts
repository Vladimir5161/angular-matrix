import { TestBed } from '@angular/core/testing';

import { Api.ServiceService } from './api.service.service';

describe('Api.ServiceService', () => {
  let service: Api.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
