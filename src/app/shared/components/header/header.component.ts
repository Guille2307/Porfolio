import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
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
  private readonly sectionScrollDelayMs = 120;
  private readonly filesService = inject(FilesService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

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

    this.filesService.getFile(cvFile).subscribe({
      next: (pdf) => window.open(URL.createObjectURL(pdf), '_blank'),
      error: (err) => console.error(err),
    });
  }

  public navigateHome(): void {
    if (this.router.url === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    this.router.navigate(['/']);
  }

  public navigateToSection(sectionId: string): void {
    const scrollToTarget = () => {
      this.scrollToSection(sectionId, 8);
    };

    if (this.router.url === '/') {
      scrollToTarget();
      return;
    }

    this.router.navigate(['/']).then((navigated) => {
      if (!navigated) {
        return;
      }

      setTimeout(scrollToTarget, this.sectionScrollDelayMs);
    });
  }

  private loadMenuItems(): void {
    this.items.set([
      {
        label: this.translate.instant('nav.home'),
        icon: 'pi pi-home',
        command: () => {
          this.navigateHome();
        },
      },
      {
        label: this.translate.instant('nav.submenu.experience'),
        icon: 'pi pi-briefcase',
        command: () => {
          this.navigateToSection('experience');
        },
      },
      {
        label: this.translate.instant('nav.submenu.technologies'),
        icon: 'pi pi-cog',
        command: () => {
          this.navigateToSection('technologies');
        },
      },
      {
        label: this.translate.instant('nav.submenu.projects'),
        icon: 'pi pi-folder',
        command: () => {
          this.navigateToSection('projects');
        },
      },
      {
        label: this.translate.instant('nav.submenu.education'),
        icon: 'pi pi-graduation-cap',
        command: () => {
          this.navigateToSection('education');
        },
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

  private scrollToSection(sectionId: string, retries: number): void {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (retries <= 0) {
      return;
    }

    setTimeout(() => {
      this.scrollToSection(sectionId, retries - 1);
    }, this.sectionScrollDelayMs);
  }
}
