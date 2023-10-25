import { useTranslation as translation } from 'react-i18next';
export function useTypedTranslation() {
    const { t, i18n } = translation();
    const typedT = (key, ...args) => {
        return t(key);
    };
    return { t: typedT, i18n };
}
