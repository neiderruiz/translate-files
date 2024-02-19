'use client';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '../helpers/i18n';

type Props = {
  children: React.ReactNode,
  locale: string,
  fallbackLng: string[],
  resources: { [key: string]: any }
}

const TranslationsProvider = ({
  children,
  locale,
  fallbackLng,
  resources
}: Props) => {
  const i18n = createInstance();

  initTranslations(locale, i18n, fallbackLng, resources);

  return <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>;
}

export default TranslationsProvider;