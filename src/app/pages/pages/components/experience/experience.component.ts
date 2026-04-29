import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  imports: [Card, PrimeTemplate, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {}
