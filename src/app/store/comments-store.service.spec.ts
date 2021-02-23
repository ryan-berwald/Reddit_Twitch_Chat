import { TestBed } from '@angular/core/testing';

import { CommentsStoreService } from './comments-store.service';

describe('CommentsStoreService', () => {
  let service: CommentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
