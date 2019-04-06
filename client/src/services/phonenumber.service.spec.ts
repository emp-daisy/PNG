import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PhonenumberService } from './phonenumber.service';

const dummyNumbersResponse = {
  min: '0133629454',
  max: '0911745894',
  size: 10,
  phonenumbers: [
    '0911745894',
    '0575521077',
    '0422192687',
    '0505714277',
    '0133629454',
    '0269499339',
    '0163517707',
    '0261687023',
    '0343196326',
    '0360845711'
  ],
  message: 'Success'
};

describe('PhonenumberService', () => {
  let injector: TestBed;
  let service: PhonenumberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhonenumberService]
    });
    injector = getTestBed();
    service = injector.get(PhonenumberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // it('should be created', () => {
  //   const service: PhonenumberService = TestBed.get(PhonenumberService);
  //   expect(service).toBeTruthy();
  // });
  it('getAllNumbers() should return data', () => {
    service.getAllNumbers('asc').subscribe((res) => {
      expect(res).toEqual(dummyNumbersResponse);
    });

    const req = httpMock.expectOne('/api/phonenumber/?sort=asc');
    expect(req.request.method).toBe('GET');
    req.flush(dummyNumbersResponse);
  });

  it('generateNumber() should return data', () => {
    service.generateNumber(10, 'asc').subscribe((res) => {
      expect(res).toEqual(dummyNumbersResponse);
    });

    const req = httpMock.expectOne('/api/phonenumber/generate/?sort=asc&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyNumbersResponse);
  });
});
