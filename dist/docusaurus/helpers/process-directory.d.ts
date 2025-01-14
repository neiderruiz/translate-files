import { TypeListLang } from 'src/translate/types/langs';
type Options = {
    dir: string;
    pagesDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
};
export declare const processDirectory: ({ dir, pagesDir, defaultLocale, locales, i18nDir }: Options) => void;
export {};
