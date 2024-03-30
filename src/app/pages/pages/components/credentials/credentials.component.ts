import { Component } from '@angular/core';
import { PathTechnologies } from '../../interfaces/path-technologies.interface';

@Component({
  selector: 'credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
})
export class CredentialsComponent {
  public credentials: PathTechnologies[] = [
    { path: './assets/cetificados/upgrade.jpg', alt: 'upgrade' },
    {
      path: './assets/cetificados/UC-f301729c-4820-4638-9f94-26a93204fda7.jpg',
      alt: 'Udemy',
    },
    {
      path: './assets/cetificados/UC-06af9673-309b-4041-a7c7-c7ca91cfd408.jpg',
      alt: 'Udemy',
    },
    {
      path: './assets/cetificados/UC-bdc12162-adbf-4e80-894b-88ff3772c68d.jpg',
      alt: 'Udemy',
    },
  ];
}
