import { TestBed } from '@angular/core/testing';

import { BoardRequestService } from './board-request.service';

describe('BoardRequestService', () => {
  let service: BoardRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
