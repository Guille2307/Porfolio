import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

interface ExperienceJob {
  key: string;
  image: string;
  imageAlt: string;
  responsibilitiesKey: string;
  hasDescription: boolean;
}

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  imports: [Card, PrimeTemplate, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly jobs = signal<ExperienceJob[]>([
    {
      key: 'job1',
      image: './assets/images/Ibermatica.png',
      imageAlt: 'Ibermática company logo',
      responsibilitiesKey: 'experience.responsibilities',
      hasDescription: true,
    },
    {
      key: 'job2',
      image: './assets/images/grupoapok_logo.png',
      imageAlt: 'Grupo Apok company logo',
      responsibilitiesKey: 'experience.responsibilities',
      hasDescription: true,
    },
    {
      key: 'job3',
      image: './assets/images/woutick_Brand_Symbol.png',
      imageAlt: 'Woutick company logo',
      responsibilitiesKey: 'experience.responsibilitiesWere',
      hasDescription: true,
    },
    {
      key: 'job4',
      image: './assets/images/grupoapok_logo.png',
      imageAlt: 'Grupo Apok company logo',
      responsibilitiesKey: '',
      hasDescription: false,
    },
  ]);
}
