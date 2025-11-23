import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FilesService } from '../../services/files.service';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Contacto',
        icon: 'pi pi-send',
        routerLink: 'contact',
      },
      {
        label: 'Currículum',
        icon: 'pi pi-download',
        command: () => {
          this.openFile();
        },
      },
    ];
  }

  public openFile(): void {
    this.filesService
      .getFile('./assets/Guillermo_Pinate_Cv.pdf')
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
