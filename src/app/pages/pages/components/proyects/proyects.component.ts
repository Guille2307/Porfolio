import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';

interface Project {
  img: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

@Component({
  selector: 'proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
  imports: [Card, PrimeTemplate, Button, TranslatePipe, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProyectsComponent {
  public proyects = signal<Project[]>([]);
  private readonly translate = inject(TranslateService);

  constructor() {
    this.loadProjects();

    this.translate.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.loadProjects();
      });
  }

  private loadProjects(): void {
    const projectsData = this.translate.instant('projects.list');
    const urls = [
      'https://netberrytest.netlify.app/#/login',
      'http://woutickshow.s3-website.eu-west-1.amazonaws.com/login',
      'https://woutick.info/',
      'https://heroesofthestorm.netlify.app',
      'https://adminprogp.netlify.app',
      'https://gameoftheyear.netlify.app',
      'https://angularmapbox.netlify.app',
      'https://github.com/Guille2307/tpv',
    ];
    const images = [
      './assets/proyects/Net.jpg',
      './assets/proyects/Show.jpg',
      './assets/proyects/Landing.jpg',
      './assets/proyects/Heroes.jpg',
      './assets/proyects/Pro.jpg',
      './assets/proyects/Goty.jpg',
      './assets/proyects/Map.jpg',
      './assets/proyects/TPV.jpg',
    ];

    this.proyects.set(
      projectsData.map(
        (p: { title: string; subtitle: string; description: string }, i: number) => ({
          img: images[i],
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          url: urls[i],
        }),
      ),
    );
  }
}
