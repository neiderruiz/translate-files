"use client";
import { useTranslation as translation } from 'react-i18next';
export function useTranslation() {
    const { t, i18n } = translation();
    return { t: (key, args) => t(key, args), i18n };
}
