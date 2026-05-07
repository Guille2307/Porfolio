import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilesService],
    });
    service = TestBed.inject(FilesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL and blob responseType', () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    const url = './assets/cv.pdf';

    service.getFile(url).subscribe((result) => {
      expect(result).toBe(mockBlob);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(mockBlob);
  });

  it('should return an Observable', () => {
    const url = './assets/test.pdf';
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });

    const observable = service.getFile(url);
    expect(observable.subscribe).toBeDefined();

    observable.subscribe((result) => {
      expect(result).toBeInstanceOf(Blob);
    });

    const req = httpMock.expectOne(url);
    req.flush(mockBlob);
  });
});
