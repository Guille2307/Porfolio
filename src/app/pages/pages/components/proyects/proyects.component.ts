import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
})
export class ProyectsComponent implements OnInit {
  public proyects: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProjects();

    // Recargar proyectos cuando cambie el idioma
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  private loadProjects(): void {
    const projectsData = this.translate.instant('projects.list');

    this.proyects = [
      {
        img: './assets/proyects/Net.jpg',
        title: projectsData[0].title,
        subtitle: projectsData[0].subtitle,
        description: projectsData[0].description,
        url: 'https://netberrytest.netlify.app/#/login',
      },
      {
        img: './assets/proyects/Show.jpg',
        title: projectsData[1].title,
        subtitle: projectsData[1].subtitle,
        description: projectsData[1].description,
        url: 'http://woutickshow.s3-website.eu-west-1.amazonaws.com/login',
      },
      {
        img: './assets/proyects/Landing.jpg',
        title: projectsData[2].title,
        subtitle: projectsData[2].subtitle,
        description: projectsData[2].description,
        url: 'https://woutick.info/',
      },
      {
        img: './assets/proyects/Heroes.jpg',
        title: projectsData[3].title,
        subtitle: projectsData[3].subtitle,
        description: projectsData[3].description,
        url: 'https://heroesofthestorm.netlify.app',
      },
      {
        img: './assets/proyects/Pro.jpg',
        title: projectsData[4].title,
        subtitle: projectsData[4].subtitle,
        description: projectsData[4].description,
        url: 'https://adminprogp.netlify.app',
      },
      {
        img: './assets/proyects/Goty.jpg',
        title: 'Game of the year',
        subtitle: 'Angular, Firebase',
        description:
          this.translate.currentLang === 'es'
            ? 'Game of the year es un proyecto que está dentro del curso de Angular Avanzado, En este caso practicamos Firebase, realizando una comunicación vía websocket entre los votos y los gráficos con el backend'
            : 'Game of the year is a project within the Advanced Angular course, In this case we practice Firebase, making websocket communication between votes and graphics with the backend',
        url: 'https://gameoftheyear.netlify.app',
      },
      {
        img: './assets/proyects/Map.jpg',
        title: 'Map',
        subtitle: 'Angular',
        description:
          this.translate.currentLang === 'es'
            ? 'Proyecto de Práctica para la implementación de Mapbox, esta pequeña pero poderosa app, es capaz de encontrar, marcar y trazar una ruta entre dos puntos, es una librería desarrollada en JS, usada en Typescript'
            : 'Practice project for the implementation of Mapbox, this small but powerful app, is able to find, mark and trace a route between two points, it is a library developed in JS, used in Typescript',
        url: 'https://angularmapbox.netlify.app',
      },
    ];
  }
}
