import { ui, languages } from './ui';

export { languages };
export const locales = Object.keys(languages);

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return 'es';
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let val: unknown = ui[lang];
    for (const k of keys) {
      if (val && typeof val === 'object' && k in (val as Record<string, unknown>)) {
        val = (val as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof val === 'string' ? val : key;
  };
}

export function getLocalizedUrl(url: URL, lang: Lang): string {
  const [, , ...rest] = url.pathname.split('/');
  const path = rest.join('/');
  return `/${lang}${path ? '/' + path : ''}`;
}
