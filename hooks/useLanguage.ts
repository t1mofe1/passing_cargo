import { getLocales } from 'expo-localization';
import { useMemo } from 'react';

export function useLanguage() {
  const locales = useMemo(
    () => getLocales().map((locale) => locale.languageCode),
    [],
  );

  const LanguageMap = {
    English: 'en',
    Estonian: 'et',
    Russian: 'ru',
  };

  const language =
    locales.find((locale) => Object.values(LanguageMap).includes(locale)) ||
    'en';

  return language;
}
