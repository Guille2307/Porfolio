import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import Swal from 'sweetalert2';
import { Button } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'shared-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, Button, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);

  public myForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    topic: [''],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  public isFormValid(): boolean {
    return this.myForm.valid;
  }

  sendForm(data: FormGroup = this.myForm) {
    if (this.isFormValid()) {
      this.emailService.emailPost(data);
      Swal.fire(
        'Enviado',
        'Su mensaje ha sido enviado Correctamente',
        'success',
      );
      this.myForm.reset();
    } else {
      Swal.fire(
        'Error',
        'Por favor completa todos los campos requeridos',
        'error',
      );
      this.myForm.markAllAsTouched();
    }
  }
}
