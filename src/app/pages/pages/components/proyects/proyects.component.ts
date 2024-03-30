import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
})
export class ProyectsComponent {
  public proyects: any[] = [
    {
      img: './assets/proyects/Net.jpg',
      title: 'NetTask',
      subtitle: 'Angular, Node',
      description:
        'Es una web para organizar tareas, puedes asignarle una tarea aun usuario, cambiar el status y añadir tags. consume servicios REST, Node, Express ,JWT, CRUD, trabajos con interceptores, Pipes, formularios reactivos.',
      url: 'https://netberrytest.netlify.app/#/login',
    },
    {
      img: './assets/proyects/Show.jpg',
      title: 'Woutick Show',
      subtitle: 'Angular, Ionic',
      description:
        'Es una web o una app destinada a sala de conciertos, agenda cultural, congresos o comunidades. Está desarrollada en Angular Ionic, consume servicios REST y i18n para los idiomas Ingles, Español y Portugues',
      url: 'http://woutickshow.s3-website.eu-west-1.amazonaws.com/login',
    },
    {
      img: './assets/proyects/Landing.jpg',
      title: 'Woutick Landing Page',
      subtitle: 'Angular, Ionic',
      description:
        'Este Proyecto sirve de vitrina para conocer todos los productos que ofrece la empresa. Está desarrollada en Angular Ionic, consume servicios REST y i18n para los idiomas Ingles, Español y Portugues',
      url: 'https://woutick.info/',
    },
    {
      img: './assets/proyects/Heroes.jpg',
      title: 'Heroes of the storm',
      subtitle: 'Angular, Express, Node, Mongo',
      description:
        'Heroes Of the Storm fue uno de los proyectos que desarrolle como parte de mi formación en el Boot camp de desarrollo web, El css es totalmente plano sin componentes prediseñados, JWT, CRUD de personajes',
      url: 'https://heroesofthestorm.netlify.app',
    },
    {
      img: './assets/proyects/Pro.jpg',
      title: 'AdminPro',
      subtitle: 'Angular, Express, Node, Mongo',
      description:
        'Como parte de mi auto formación, y procura de mejora constante, realice el curso de Angular Avanzado, AdminPro es una web que desarrolle a lo largo del curso, autenticación, CRUD de médicos y hospitales ',
      url: 'https://adminprogp.netlify.app',
    },
    {
      img: './assets/proyects/Goty.jpg',
      title: 'Game of the year',
      subtitle: 'Angular, Firebase',
      description:
        'Game of the year es un proyecto que esta dentro del curso de Angular Avanzado, En este caso practicamos Firebase, realizando una comunicación vía websocket entre los votos y los gráficos con el backend',
      url: 'https://gameoftheyear.netlify.app',
    },
    {
      img: './assets/proyects/Map.jpg',
      title: 'Map',
      subtitle: 'Angular',
      description:
        'Proyecto de Práctica para la implementación de Mapbox, esta pequeña pero poderosa app, es capaz de encontrar, marcar y trazar una ruta entre dos puntos, es una librería desarrollada en JS, usada en Typescript',
      url: 'https://angularmapbox.netlify.app',
    },
  ];

  constructor() {}
}
