import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionOneComponent } from '../components/section-one/section-one.component';
import { SectionTwoComponent } from '../components/section-two/section-two.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { TechnologiesComponent } from '../components/technologies/technologies.component';
import { ProyectsComponent } from '../components/proyects/proyects.component';
import { CredentialsComponent } from '../components/credentials/credentials.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    SectionOneComponent,
    SectionTwoComponent,
    ExperienceComponent,
    TechnologiesComponent,
    ProyectsComponent,
    CredentialsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
