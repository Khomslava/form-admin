import { TestBed } from '@angular/core/testing';

import { CustomTranslationService } from './custom-translation.service';

describe('CustomTranslationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomTranslationService = TestBed.get(CustomTranslationService);
    expect(service).toBeTruthy();
  });
});
