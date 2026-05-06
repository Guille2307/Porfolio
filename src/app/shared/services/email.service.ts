import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly http = inject(HttpClient);

  public emailPost(data: FormGroup): Observable<unknown> {
    return this.http.post(
      'https://formsubmit.co/ajax/21af30c57d967de338d42e684c130978',
      {
        name: data.get('name')?.value,
        lastName: data.get('lastName')?.value,
        topic: data.get('topic')?.value,
        email: data.get('email')?.value,
        message: data.get('message')?.value,
      },
    );
  }
}
