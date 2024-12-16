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
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
      alt: 'Mongo Image',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
      alt: 'express Image',
    },
    {
      path: './assets/tecnologias/angular.png',
      alt: 'Angular Image',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
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
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
      alt: 'react',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      alt: 'aws',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg',
      alt: 'Azure',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg',
      alt: 'Babel',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg',
      alt: 'Bootstrap',
    },
    {
      path: 'https://www.chartjs.org/media/logo-title.svg',
      alt: 'Chartjs',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
      alt: 'Css',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
      alt: 'tailwindcss',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
      alt: 'docker',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
      alt: 'figma',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
      alt: 'firebase',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
      alt: 'git',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
      alt: 'html5',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/jasmine/jasmine-icon.svg',
      alt: 'jasmine',
    },
    {
      path: 'https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/karma.svg',
      alt: 'karma',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg',
      alt: 'jestjsio',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg',
      alt: 'jenkins',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
      alt: 'kubernetes',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
      alt: 'mysql',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
      alt: 'php',
    },
    {
      path: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
      alt: 'getpostman',
    },
    {
      path: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
      alt: 'python',
    },
    {
      path: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
      alt: 'jira',
    },
  ];
}
