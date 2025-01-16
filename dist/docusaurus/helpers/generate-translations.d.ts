import { TypeListLang } from 'src/translate/types/langs';
export type ConfigOptions = {
    locales: TypeListLang[];
    defaultLocale: TypeListLang;
    baseDocsDir: string;
    i18nDir?: string;
    apiKey?: string;
    baseBlogDir?: string;
    baseDocDir?: string;
    disableDocs?: boolean;
    disableBlog?: boolean;
    outputDocDir?: string;
    outputBlogDir?: string;
};
declare function generateTranslations({ locales, defaultLocale, baseDocsDir, i18nDir, apiKey, baseBlogDir, outputDocDir, outputBlogDir, disableBlog, disableDocs }: ConfigOptions): Promise<void>;
export { generateTranslations };
