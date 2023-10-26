import { useTranslation as translation } from 'react-i18next';
export function useTypedTranslation() {
    const { t } = translation();
    return { t: (key, args) => t(key, args) };
}
