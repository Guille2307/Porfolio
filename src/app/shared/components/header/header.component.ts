import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

import { TranslateService } from '@ngx-translate/core';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [Menubar, PrimeTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public items = signal<MenuItem[]>([]);
  private currentLang = 'en';
  private readonly filesService = inject(FilesService);
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLang = savedLang;
    this.translate.use(savedLang);
    this.loadMenuItems();

    this.translate.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        this.currentLang = event.lang;
        this.loadMenuItems();
      });
  }

  public changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  public openFile(): void {
    const cvFile =
      this.currentLang === 'en'
        ? './assets/Guillermo_Pinate_CV_English.pdf'
        : './assets/Guillermo_Pinate_Cv.pdf';

    this.filesService
      .getFile(cvFile)
      .then((response) => response.blob())
      .then((pdf) => {
        window.open(URL.createObjectURL(pdf), '_blank');
      })
      .catch((err) => console.error(err));
  }

  private loadMenuItems(): void {
    this.items.set([
      {
        label: this.translate.instant('nav.home'),
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: this.translate.instant('nav.contact'),
        icon: 'pi pi-send',
        routerLink: 'contact',
      },
      {
        label: this.translate.instant('nav.language'),
        icon: 'pi pi-arrow-right-arrow-left',
        items: [
          {
            label: this.translate.instant('nav.spanish'),
            command: () => {
              this.changeLanguage('es');
            },
          },
          {
            label: this.translate.instant('nav.english'),
            command: () => {
              this.changeLanguage('en');
            },
          },
        ],
      },
      {
        label: this.translate.instant('nav.cv'),
        icon: 'pi pi-download',
        command: () => {
          this.openFile();
        },
      },
    ]);
  }
}
