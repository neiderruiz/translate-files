"use client";
import { useTranslation as translation } from 'react-i18next';
import { FlattenKeys } from '.';

export function useTypedTranslation<T>() {
  const { t, i18n } = translation();

  return { t: (key: FlattenKeys<T>, args?: string[]) => t(key, args as any), i18n };
}
