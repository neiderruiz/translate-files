import fs from 'fs';
import { TypeListLang } from 'src/translate/types/langs';
import { blogTranslate } from './blog-translate';
import { docsTranslate } from './docs-translate';

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

async function generateTranslations({
    locales,
    defaultLocale,
    baseDocsDir = './translate/docs',
    i18nDir = './i18n',
    apiKey,
    baseBlogDir = './translate/blog',
    outputDocDir = './docs',
    outputBlogDir = './blog',
    disableBlog,
    disableDocs

}: ConfigOptions): Promise<void> {
    if (disableDocs) {
        console.log('🚫 Not translate docs');
    } else {
        if (!fs.existsSync(baseDocsDir)) {
            console.error(`El directorio ${baseDocsDir} no existe.`);
            process.exit(1);
        }
        await docsTranslate({
            dir: baseDocsDir,
            locales,
            defaultLocale,
            baseDocsDir,
            i18nDir,
            outputDocDir,
            apiKey
        });
    }

    if (disableBlog) {
        console.log('🚫 Not translate blog');
    } else {
        if (!fs.existsSync(baseBlogDir)) {
            console.error(`El directorio ${baseBlogDir} no existe.`);
            process.exit(1);
        }
        await blogTranslate({
            dir: baseBlogDir,
            locales,
            defaultLocale,
            outputBlogDir,
            i18nDir,
            apiKey,
            baseBlogDir,
        })
    }
}

export {
    generateTranslations
};
