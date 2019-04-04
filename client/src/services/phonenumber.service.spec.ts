import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhonenumberService } from './phonenumber.service';

describe('PhonenumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: PhonenumberService = TestBed.get(PhonenumberService);
    expect(service).toBeTruthy();
  });
});
