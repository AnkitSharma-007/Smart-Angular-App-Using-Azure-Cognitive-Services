import { TestBed } from '@angular/core/testing';

import { ComputerVisionService } from './computer-vision.service';

describe('ComputerVisionService', () => {
  let service: ComputerVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
