import { TestBed } from '@angular/core/testing';

import { EmocionEspecificaService } from './emocion-especifica.service';

describe('EmocionEspecificaService', () => {
  let service: EmocionEspecificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmocionEspecificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
