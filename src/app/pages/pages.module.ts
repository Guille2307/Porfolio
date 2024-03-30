import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SectionOneComponent } from './pages/components/section-one/section-one.component';
import { SectionTwoComponent } from './pages/components/section-two/section-two.component';
import { ExperienceComponent } from './pages/components/experience/experience.component';
import { TechnologiesComponent } from './pages/components/technologies/technologies.component';
import { ProyectsComponent } from './pages/components/proyects/proyects.component';
import { CredentialsComponent } from './pages/components/credentials/credentials.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ContactPageComponent,
    SectionOneComponent,
    SectionTwoComponent,
    ExperienceComponent,
    TechnologiesComponent,
    ProyectsComponent,
    CredentialsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, PrimengModule, SharedModule],
})
export class PagesModule {}
