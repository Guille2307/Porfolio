import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { ContactComponent } from './contact.component';
import { EmailService } from '../../services/email.service';

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let emailService: EmailService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService);
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isFormValid() should return false when the form is empty', () => {
    expect(component.isFormValid()).toBe(false);
  });

  it('isFormValid() should return true when all required fields are filled', () => {
    component.myForm.setValue({
      name: 'John',
      lastName: 'Doe',
      topic: '',
      email: 'john@test.com',
      message: 'Hello world',
    });
    expect(component.isFormValid()).toBe(true);
  });

  it('isFormValid() should return false with invalid email', () => {
    component.myForm.setValue({
      name: 'John',
      lastName: 'Doe',
      topic: '',
      email: 'not-an-email',
      message: 'Hello',
    });
    expect(component.isFormValid()).toBe(false);
  });

  it('sendForm() should call emailPost when form is valid', () => {
    const spy = vi.spyOn(emailService, 'emailPost').mockReturnValue(of({}));
    component.myForm.setValue({
      name: 'John',
      lastName: 'Doe',
      topic: '',
      email: 'john@test.com',
      message: 'Hello world',
    });

    component.sendForm();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('sendForm() should reset form after successful send', () => {
    vi.spyOn(emailService, 'emailPost').mockReturnValue(of({}));
    component.myForm.setValue({
      name: 'John',
      lastName: 'Doe',
      topic: '',
      email: 'john@test.com',
      message: 'Hello world',
    });

    component.sendForm();

    expect(component.myForm.get('name')?.value).toBeNull();
  });

  it('sendForm() should not call emailPost when form is invalid', () => {
    const spy = vi.spyOn(emailService, 'emailPost').mockReturnValue(of({}));

    component.sendForm();

    expect(spy).not.toHaveBeenCalled();
  });

  it('sendForm() should mark all fields as touched when form is invalid', () => {
    const spy = vi.spyOn(component.myForm, 'markAllAsTouched');

    component.sendForm();

    expect(spy).toHaveBeenCalled();
  });

  it('sendForm() should not reset form on HTTP error', () => {
    vi.spyOn(emailService, 'emailPost').mockReturnValue(
      throwError(() => new Error('Network error')),
    );
    component.myForm.setValue({
      name: 'John',
      lastName: 'Doe',
      topic: '',
      email: 'john@test.com',
      message: 'Hello world',
    });

    component.sendForm();

    expect(component.myForm.get('name')?.value).toBe('John');
  });

  it('should show error banner when form is invalid and touched', () => {
    component.sendForm(); // invalid form → markAllAsTouched
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-red-700')).toBeTruthy();
  });
});
