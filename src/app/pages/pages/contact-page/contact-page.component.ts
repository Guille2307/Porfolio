import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactComponent } from '../../../shared/components/contact/contact.component';

@Component({
  selector: 'contac-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  imports: [ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {}
