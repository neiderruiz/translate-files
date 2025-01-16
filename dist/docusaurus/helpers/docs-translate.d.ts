import { TypeListLang } from "src/translate/types/langs";
type Options = {
    dir: string;
    baseDocsDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
    outputDocDir: string;
    apiKey?: string;
};
export declare const docsTranslate: ({ dir, baseDocsDir, defaultLocale, locales, i18nDir, outputDocDir, apiKey }: Options) => Promise<void>;
export {};
