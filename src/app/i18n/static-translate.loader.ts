import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';

import { availableLanguages, Language, translations } from './translations';

@Injectable({ providedIn: 'root' })
export class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    const fallback = availableLanguages.includes(lang as Language)
      ? translations[lang as Language]
      : translations.en;
    return of(fallback as unknown as TranslationObject);
  }
}
