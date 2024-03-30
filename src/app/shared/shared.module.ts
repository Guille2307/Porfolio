import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContactComponent],
  imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, ContactComponent],
})
export class SharedModule {}
