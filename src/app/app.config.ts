import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { StaticTranslateLoader } from './i18n/static-translate.loader';
import { routes } from './app.routes';

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

export const appConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync('noop'),
    provideHttpClient(withInterceptors([])),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [400, 800, 1200],
        placeholder: true,
      },
    },
    provideTranslateService({
      loader: provideTranslateLoader(StaticTranslateLoader),
      fallbackLang: 'en',
      lang: 'en',
    }),
    providePrimeNG({
      theme: {
        preset: PortfolioTheme,
      },
    }),
  ],
};
