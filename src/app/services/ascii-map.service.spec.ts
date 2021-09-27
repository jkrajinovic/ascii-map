import { TestBed } from '@angular/core/testing';

import { AsciiMapService } from './ascii-map.service';

describe('AsciiMapService', () => {
  let service: AsciiMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsciiMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
