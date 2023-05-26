import { TestBed } from '@angular/core/testing';

import { StorageApiService } from './storage-api.service';

describe('StorageApiService', () => {
  let service: StorageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
