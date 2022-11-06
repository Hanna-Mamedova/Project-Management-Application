import { TestBed } from '@angular/core/testing';

import { FileRequestService } from './file-request.service';

describe('FileRequestService', () => {
  let service: FileRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
