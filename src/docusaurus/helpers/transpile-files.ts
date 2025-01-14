import fs from 'fs';
import { TypeListLang } from 'src/translate/types/langs';
import { processDirectory } from './process-directory';

export type ConfigOptions = {
    locales: TypeListLang[];
    defaultLocale: TypeListLang;
    pagesDir: string;
    i18nDir: string;
    apiKey?: string;
};

async function generateTranslations({ locales, defaultLocale, pagesDir, i18nDir, apiKey }: ConfigOptions): Promise<void> {
    if (!fs.existsSync(pagesDir)) {
        console.error(`El directorio ${pagesDir} no existe.`);
        process.exit(1);
    }

    processDirectory({
        dir: pagesDir,
        locales,
        defaultLocale,
        pagesDir,
        i18nDir
    });
}

export {
    generateTranslations
};
