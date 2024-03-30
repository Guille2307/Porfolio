import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  public emailPost(data: any) {
    fetch('https://formsubmit.co/ajax/21af30c57d967de338d42e684c130978', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.get('name').value,
        lastName: data.get('lastName').value,
        topic: data.get('topic').value,
        email: data.get('email').value,
        message: data.get('message').value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}
