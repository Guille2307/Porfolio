import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    ImageModule,
    PanelModule,
    CardModule,
    ScrollTopModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule {}
