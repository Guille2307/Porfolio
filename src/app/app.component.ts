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
import { ImageLoaderService } from './shared/services/image-loader.service';

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
  private checking = false;
  private readonly router = inject(Router);
  private readonly imageLoader = inject(ImageLoaderService);

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => this.checkImages());

    setTimeout(() => this.checkImages(), 500);
  }

  private checkImages(): void {
    if (this.checking || this.imagesLoaded()) {
      return;
    }
    this.checking = true;
    this.imageLoader.waitForImages().then(() => {
      this.imagesLoaded.set(true);
    });
  }
}
