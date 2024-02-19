'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '../helpers/i18n';
const TranslationsProvider = ({ children, locale, fallbackLng, resources }) => {
    const i18n = createInstance();
    initTranslations(locale, i18n, fallbackLng, resources);
    return _jsx(I18nextProvider, Object.assign({ i18n: i18n }, { children: children }));
};
export default TranslationsProvider;
