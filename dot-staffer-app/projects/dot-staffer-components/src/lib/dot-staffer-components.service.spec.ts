import { TestBed } from '@angular/core/testing';

import { DotStafferComponentsService } from './dot-staffer-components.service';

describe('DotStafferComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DotStafferComponentsService = TestBed.inject(DotStafferComponentsService);
    expect(service).toBeTruthy();
  });
});
