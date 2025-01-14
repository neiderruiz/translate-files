import fs from 'fs';
import path from 'path';
import { TypeListLang } from 'src/translate/types/langs';
import { getTranslationsFromAPI } from '../../translate/utils/get-translations-api';
import { extractKeysAndTexts } from './extract-keys-and-texts';

type Options = {
    dir: string;
    pagesDir: string;
    i18nDir: string;
    defaultLocale: TypeListLang;
    locales: TypeListLang[];
}

export const processDirectory = ({ dir, pagesDir, defaultLocale, locales, i18nDir }: Options) => {
    const items = fs.readdirSync(dir);

    items.forEach(async (item) => {
        const itemPath = path.join(dir, item);
        const itemRelativePath = path.relative(pagesDir, itemPath);

        if (fs.statSync(itemPath).isDirectory()) {
            // subfolder process
            processDirectory({
                dir: itemPath,
                pagesDir,
                defaultLocale,
                locales,
                i18nDir,
            });
        } else if (item.endsWith('.md') || item === '_category_.json') {
            // process archivo `.md` o `_category_.json`
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
                        typeProject: 'docusaurus'
                    });
                }

                const localeDir = path.join(
                    i18nDir,
                    locale,
                    'docusaurus-plugin-content-docs/current',
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
                    'docusaurus-plugin-content-docs/current',
                    path.dirname(itemRelativePath),
                    item
                );

                fs.writeFileSync(outputFilePath, translatedContent);
                console.log(`✅ (Translated): ${routeOutputLog}`);
            }
        } else {
            // move file to all locales
            locales.forEach((locale) => {
                const localeDir = path.join(
                    i18nDir,
                    locale,
                    'docusaurus-plugin-content-docs/current',
                    path.dirname(itemRelativePath)
                );

                if (!fs.existsSync(localeDir)) {
                    fs.mkdirSync(localeDir, { recursive: true });
                }

                const outputFilePath = path.join(localeDir, item);
                fs.copyFileSync(itemPath, outputFilePath);

                const routeOutputLog = path.join(
                    locale,
                    'docusaurus-plugin-content-docs/current',
                    path.dirname(itemRelativePath),
                    item
                );

                console.log(`🔄 (File - Copied): ${routeOutputLog}`);
            });
        }
    });
}