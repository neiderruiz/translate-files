import { TypeListLang } from 'src/translate/types/langs';
type Options = {
    dir: string;
    pagesDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
    docDir?: string;
};
export declare const processDirectory: ({ dir, pagesDir, defaultLocale, locales, i18nDir, docDir }: Options) => void;
export {};
