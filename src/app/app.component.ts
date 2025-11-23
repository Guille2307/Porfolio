import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'porfolio';
  imagesLoaded = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  ngAfterViewInit() {
    // Esperar a que se complete la navegación inicial
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Pequeño delay para asegurar que el DOM está renderizado
        setTimeout(() => {
          this.waitForImages();
        }, 100);
      });
  }

  private waitForImages() {
    const images = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];

    if (images.length === 0) {
      // Si no hay imágenes, mostrar contenido inmediatamente
      this.imagesLoaded = true;
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        this.imagesLoaded = true;
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded); // También contar errores para no quedarse esperando
      }
    });

    // Timeout de seguridad: mostrar contenido después de 3 segundos aunque no hayan cargado todas
    setTimeout(() => {
      if (!this.imagesLoaded) {
        this.imagesLoaded = true;
      }
    }, 3000);
  }
}
