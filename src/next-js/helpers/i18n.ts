import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

export default function initTranslations(
  locale: string,
  i18nInstance: any,
  fallbackLng: string[],
  resources: { [key: string]: any }
) {

  i18nInstance = i18nInstance || createInstance()
  i18nInstance.use(initReactI18next)

  i18nInstance
    .init({
      lng: locale,
      fallbackLng,
      resources,
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
      preload: resources
    });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}




