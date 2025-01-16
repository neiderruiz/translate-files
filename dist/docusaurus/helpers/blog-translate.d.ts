import { TypeListLang } from "src/translate/types/langs";
type Options = {
    dir: string;
    baseBlogDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
    blogDir?: string;
    apiKey?: string;
    outputBlogDir: string;
};
export declare const blogTranslate: ({ dir, defaultLocale, locales, i18nDir, baseBlogDir, outputBlogDir, apiKey, }: Options) => Promise<void>;
export {};
