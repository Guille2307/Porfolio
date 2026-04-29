import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const PortfolioTheme = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#f4f1ff',
      100: '#e7e0ff',
      200: '#d4c8ff',
      300: '#b8a5ff',
      400: '#9578ff',
      500: '#7254f3',
      600: '#6042db',
      700: '#5034b8',
      800: '#432c94',
      900: '#382777',
      950: '#221649',
    },
  },
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: provideTranslateHttpLoader({
          prefix: './assets/i18n/',
          suffix: '.json',
        }),
      }),
    ),
    providePrimeNG({
      theme: {
        preset: PortfolioTheme,
      },
    }),
  ],
}).catch((err) => console.error(err));
