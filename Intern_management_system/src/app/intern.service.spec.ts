import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders }from '@angular/common/http';
import { InternService } from './intern.service';

describe('InternService', () => {
  let service: InternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
