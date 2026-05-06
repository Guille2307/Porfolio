import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let httpMock: HttpTestingController;
  let fb: FormBuilder;

  const API_URL = 'https://formsubmit.co/ajax/21af30c57d967de338d42e684c130978';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
    fb = TestBed.inject(FormBuilder);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST to the correct URL', () => {
    const form = fb.group({
      name: ['John'],
      lastName: ['Doe'],
      topic: ['Test'],
      email: ['john@example.com'],
      message: ['Hello'],
    });

    service.emailPost(form).subscribe();

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should send correct form data in the request body', () => {
    const form = fb.group({
      name: ['John'],
      lastName: ['Doe'],
      topic: ['Topic'],
      email: ['john@test.com'],
      message: ['My message'],
    });

    service.emailPost(form).subscribe();

    const req = httpMock.expectOne(API_URL);
    expect(req.request.body).toEqual({
      name: 'John',
      lastName: 'Doe',
      topic: 'Topic',
      email: 'john@test.com',
      message: 'My message',
    });
    req.flush({});
  });

  it('should return an observable that emits the response', () => {
    const form = fb.group({
      name: ['Jane'],
      lastName: ['Smith'],
      topic: [''],
      email: ['jane@test.com'],
      message: ['Test message'],
    });

    let result: unknown;
    service.emailPost(form).subscribe((res) => (result = res));

    const req = httpMock.expectOne(API_URL);
    req.flush({ success: 'true', message: 'Email sent' });

    expect(result).toEqual({ success: 'true', message: 'Email sent' });
  });
});
