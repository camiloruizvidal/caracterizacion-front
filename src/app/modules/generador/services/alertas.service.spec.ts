import { TestBed } from '@angular/core/testing';
import { AlertasService } from './alertas.service';

describe('InputsService', () => {
  let service: AlertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
