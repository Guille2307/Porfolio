import { Component } from '@angular/core';
import { PathTechnologies } from '../../interfaces/path-technologies.interface';

@Component({
  selector: 'technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent {
  public urls: PathTechnologies[] = [
    {
      path: './assets/tecnologias/mongodb-ar21.svg',
      alt: 'Mongo Image',
    },
    {
      path: './assets/tecnologias/expressjs-ar21.svg',
      alt: 'express Image',
    },
    {
      path: './assets/tecnologias/angular.png',
      alt: 'Angular Image',
    },
    {
      path: './assets/tecnologias/nodejs.svg',
      alt: 'nodejs Image',
    },
    {
      path: './assets/tecnologias/ionicframework.svg',
      alt: 'ionicframework Image',
    },
    {
      path: './assets/tecnologias/rxjs.svg',
      alt: 'rxjs Image',
    },
    {
      path: './assets/tecnologias/typescript.svg',
      alt: 'typescript Image',
    },
    {
      path: './assets/tecnologias/logo-javascript.svg',
      alt: 'javascript Image',
    },
  ];
}
