import { useTranslation as translation } from 'react-i18next';

type FlattenKeys<T> = T extends object
	? { [K in keyof T & string]: T[K] extends string
		? K
		: `${K}.${FlattenKeys<T[K]>}` }[keyof T & string]
	: '';


export function useTypedTranslation<T>() {
  const { t, i18n } = translation();

  const typedT = (key: FlattenKeys<T>, ...args: any[]) => {
    return t(key);
  };

  return { t: typedT, i18n };
}
