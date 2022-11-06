import { TestBed } from '@angular/core/testing';

import { ColumnRequestService } from './column-request.service';

describe('ColumnRequestService', () => {
  let service: ColumnRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
