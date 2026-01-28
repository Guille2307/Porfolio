import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FilesService } from '../../services/files.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private filesService: FilesService,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.use(savedLang);
  }

  ngOnInit(): void {
    this.loadMenuItems();

    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });
  }

  private loadMenuItems(): void {
    this.items = [
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
    ];
  }

  public changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  public openFile(): void {
    const cvFile =
      this.translate.currentLang === 'en'
        ? './assets/Guillermo_Pinate_CV_English.pdf'
        : './assets/Guillermo_Pinate_Cv.pdf';

    this.filesService
      .getFile(cvFile)
      .then((response) => response.blob())
      .then((pdf) => {
        window.open(URL.createObjectURL(pdf), '_blank');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public items: MenuItem[] = [];
}
