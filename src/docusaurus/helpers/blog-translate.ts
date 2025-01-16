import fs from 'fs';
import path from 'path';
import { TypeListLang } from "src/translate/types/langs";
import { getTranslationsFromAPI } from "../../translate/utils/get-translations-api";
import { copyFilesFolder } from './copy-files-folder';
import { extractKeysAndTexts } from "./extract-keys-and-texts";

type Options = {
    dir: string;
    baseBlogDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
    blogDir?: string;
    apiKey?: string;
    outputBlogDir: string;
}

export const blogTranslate = async ({
    dir,
    defaultLocale,
    locales,
    i18nDir = './i18n',
    baseBlogDir,
    outputBlogDir,
    apiKey,
}: Options) => {

    const items = fs.readdirSync(dir);
    items.forEach(async (item) => {
        const itemPath = path.join(dir, item);

        const itemRelativePath = path.relative(baseBlogDir, itemPath);

        if (fs.statSync(itemPath).isDirectory()) {
            // subfolder process
            blogTranslate({
                dir: itemPath,
                baseBlogDir,
                defaultLocale,
                locales,
                i18nDir,
                outputBlogDir
            });
        } else if (item.endsWith('.md') || item.endsWith('.yml')) {

            const content = fs.readFileSync(itemPath, 'utf8');
            const keysAndTexts = extractKeysAndTexts(content);
            const localeArray = defaultLocale ? [defaultLocale, ...locales] : locales;

            for (const locale of localeArray) {
                let translations = {};
                if (defaultLocale === locale) {
                    translations = keysAndTexts; // Mantener el contenido original
                } else {
                    translations = await getTranslationsFromAPI({
                        sourceLang: defaultLocale!,
                        targetLang: locale,
                        data: keysAndTexts,
                        typeProject: 'docusaurus',
                        apiKey
                    });
                }

                const localeDir = path.join(
                    i18nDir,
                    locale,
                    'docusaurus-plugin-content-blog',
                    path.dirname(itemRelativePath)
                );

                if (!fs.existsSync(localeDir)) {
                    fs.mkdirSync(localeDir, { recursive: true });
                }

                const outputFilePath = path.join(localeDir, item);
                let translatedContent = content;

                for (const [key, value] of Object.entries(translations)) {
                    translatedContent = translatedContent.replace(new RegExp(`{{${key}\\|.*?}}`, 'g'), value as any);
                }
                const routeOutputLog = path.join(
                    locale,
                    'docusaurus-plugin-content-blog',
                    path.dirname(itemRelativePath),
                    item
                );

                if (defaultLocale === locale) {
                    const baseDocsPath = path.join(
                        outputBlogDir,
                        path.dirname(itemRelativePath)
                    );

                    if (!fs.existsSync(baseDocsPath)) {
                        fs.mkdirSync(baseDocsPath, { recursive: true });
                    }

                    const routeFileSaveDoc = path.join(
                        outputBlogDir,
                        path.dirname(itemRelativePath),
                        item
                    );

                    fs.writeFileSync(routeFileSaveDoc, translatedContent);
                }

                fs.writeFileSync(outputFilePath, translatedContent);
                console.log(`✅ (Translated): ${routeOutputLog}`);
            }
        } else {
            // move file to all locales and copy to blog
            copyFilesFolder({
                defaultFolder: outputBlogDir,
                defaultLocale,
                i18nDir,
                item,
                itemPath,
                itemRelativePath,
                locales,
                baseFolderSave: 'docusaurus-plugin-content-blog'
            })
        }
    });
};