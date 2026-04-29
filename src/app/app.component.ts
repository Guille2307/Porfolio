import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { take } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProgressSpinnerModule,
    ScrollTopModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  readonly imagesLoaded = signal(false);
  private imageCheckScheduled = false;
  private readonly router = inject(Router);

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        this.scheduleImageCheck();
      });

    // Si la navegación inicial ya terminó antes de suscribirnos, el loader
    // no debe quedarse bloqueando la aplicación.
    setTimeout(() => {
      this.scheduleImageCheck();
    }, 500);
  }

  private scheduleImageCheck() {
    if (this.imageCheckScheduled || this.imagesLoaded()) {
      return;
    }

    this.imageCheckScheduled = true;

    setTimeout(() => {
      this.waitForImages();
    }, 100);
  }

  private waitForImages() {
    const images = Array.from(
      document.querySelectorAll('img'),
    ) as HTMLImageElement[];

    if (images.length === 0) {
      // Si no hay imágenes, mostrar contenido inmediatamente
      this.showContent();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        this.showContent();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded); // También contar errores para no quedarse esperando
      }
    });

    setTimeout(() => {
      if (!this.imagesLoaded()) {
        this.showContent();
      }
    }, 3000);
  }

  private showContent() {
    if (this.imagesLoaded()) {
      return;
    }

    this.imagesLoaded.set(true);
  }
}
