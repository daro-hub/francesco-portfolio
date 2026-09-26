export interface LocaleOption {
  code: string;
  label: string;
  enabled: boolean;
}

// Solo "en" è attivo per ora. Aggiungere altre voci qui man mano che
// vengono tradotte (creare il dizionario in src/i18n/dictionaries e
// impostare enabled: true).
export const locales: LocaleOption[] = [
  { code: "en", label: "English", enabled: true },
  { code: "it", label: "Italiano", enabled: false },
];

export const defaultLocale = "en";
