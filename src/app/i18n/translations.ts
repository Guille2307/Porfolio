import enData from '../../assets/i18n/en.json';
import esData from '../../assets/i18n/es.json';

export const en = enData;
export const es = esData;

export const translations = { en, es } as const;

export type Language = keyof typeof translations;

export const availableLanguages: Language[] = Object.keys(translations) as Language[];
