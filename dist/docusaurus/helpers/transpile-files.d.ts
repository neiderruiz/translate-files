import { TypeListLang } from 'src/translate/types/langs';
export type ConfigOptions = {
    locales: TypeListLang[];
    defaultLocale: TypeListLang;
    pagesDir: string;
    i18nDir: string;
    apiKey?: string;
};
declare function generateTranslations({ locales, defaultLocale, pagesDir, i18nDir, apiKey }: ConfigOptions): Promise<void>;
export { generateTranslations };
