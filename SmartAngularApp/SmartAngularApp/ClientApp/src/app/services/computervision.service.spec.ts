import { TestBed } from '@angular/core/testing';

import { ComputervisionService } from './computervision.service';

describe('ComputervisionService', () => {
  let service: ComputervisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputervisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
