import fs from 'fs';
import { TypeListLang } from 'src/translate/types/langs';
import { blogTranslate } from './blog-translate';
import { docsTranslate } from './docs-translate';
import { generateWriteTranslations } from './generate-write-translations';

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
    disableReactFiles?: boolean;
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
    disableDocs,
    disableReactFiles = true

}: ConfigOptions): Promise<void> {

    if (disableDocs) {
        console.log('\n 🚫 Not translate docs \n');
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
        console.log('\n 🚫 Not translate blog \n');
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

    if (disableReactFiles) {
        console.log('\n 🚫 Not translate react files \n');
    } else {
        await generateWriteTranslations({
            locales,
            defaultLocale,
            apiKey
        })
    }

    console.log('✅ Finish success \n');
}

export {
    generateTranslations
};
