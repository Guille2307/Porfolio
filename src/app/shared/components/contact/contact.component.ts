import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  public myForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    topic: [''],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private emailService: EmailService) {}

  public isFormValid(): boolean {
    return this.myForm.valid;
  }
  sendForm(data: FormGroup = this.myForm) {
    if (this.isFormValid()) {
      this.emailService.emailPost(data);
    }
    Swal.fire('Enviado', 'Su mensaje ha sido enviado Correctamente', 'success');
    this.myForm.reset();
  }
}
