import fs from "fs";
import path from "path";
import { TypeListLang } from "../../translate/types/langs";
import { getTranslationsFromAPI } from "../../translate/utils/get-translations-api";
import { readJsonFile } from "../../utils/read-json-file";
import { flattenWriteTranslationJson } from "./flatten-write-translation-json";
import { restructureJson } from "./restructure-json";
import { writeTranslationsCommand } from "./write-translations-command";

type ConfigOptions = {
    locales: TypeListLang[];
    defaultLocale: TypeListLang;
    apiKey?: string;
}

export const generateWriteTranslations = async ({ defaultLocale, locales, apiKey }: ConfigOptions) => {

    await writeTranslationsCommand(defaultLocale);

    const filePath = path.join('i18n', defaultLocale, 'code.json');

    const jsonData = readJsonFile(filePath);

    if (jsonData) {
        const { simpleKeys, flattenedJson } = flattenWriteTranslationJson(jsonData);
        for (const locale of locales) {
            if (locale === defaultLocale) continue;

            console.log(`✅ running translations ${locale} ... \n`);

            await writeTranslationsCommand(locale);

            const filePathSave = path.join('i18n', locale, 'code.json');

            const result = await getTranslationsFromAPI({
                data: flattenedJson,
                sourceLang: defaultLocale,
                targetLang: locale,
                typeProject: 'docusaurus',
                apiKey,
                route_file: filePath
            })

            const restructuredJson = restructureJson(result, jsonData, simpleKeys);

            fs.writeFileSync(filePathSave, JSON.stringify(restructuredJson, null, 2));

            console.log(`📦  Finish success ${locale.toUpperCase()}  ${filePathSave} \n`);
        }
    } else {
        console.log('No se pudo leer el archivo JSON.');
    }

}