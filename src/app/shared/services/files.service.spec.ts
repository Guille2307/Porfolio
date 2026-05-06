import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetch with the correct URL and GET method', async () => {
    const mockResponse = { status: 200, ok: true } as Response;
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockResponse);

    const url = './assets/cv.pdf';
    const result = await service.getFile(url);

    expect(fetchSpy).toHaveBeenCalledWith(url, { method: 'GET' });
    expect(result).toBe(mockResponse);
  });

  it('should return the fetch Promise', async () => {
    const mockResponse = { status: 200, ok: true } as Response;
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

    const promise = service.getFile('./assets/test.pdf');
    expect(promise).toBeInstanceOf(Promise);
  });
});
