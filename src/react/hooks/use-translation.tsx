import { useTranslation as translation } from 'react-i18next';

type FlattenKeys<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends string
    ? K
    : `${K}.${FlattenKeys<T[K]>}` }[keyof T & string]
  : '';


export function useTypedTranslation<T>() {
  
  const { t } = translation();

  return { t: (key: FlattenKeys<T>, args: string[]) => t(key, args as any) };
}
