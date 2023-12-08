import fs from "fs";
import path from "path";
import { langs } from "../translate/types/langs";
import { translateFileCsv } from "../translate/utils/translate-file-csv";

const renameFiles = (language: string) => {
    const localesPath = './public/locales'
    const outputDir = path.join(localesPath, language);
    const translatedFilePath = path.join(localesPath, `${language}.json`);
    const newFilePath = path.join(localesPath, language, 'translation.json');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    if (fs.existsSync(translatedFilePath)) {
        fs.renameSync(translatedFilePath, newFilePath);
        console.log(`✅ Archivo ${language}.json translated and renamed to translation.json \n`);
    } else {
        console.log(`🛑 Archivo ${language}.json not found`);
    }
}

export type ConfigOptionsAstro = {
    separator?: string;
}

const makeTranslations = async (idDoc: string, config?: ConfigOptionsAstro) => {
    const localesPath = './public/locales';
    await translateFileCsv(idDoc, localesPath, config);
    const files = fs.readdirSync(localesPath);
    const jsonFiles = files.filter(file => path.extname(file) === '.json')
        .map(file => file.replace('.json', ''));
    const existingCodes = jsonFiles.filter(code => langs.some(lang => lang.code === code));

    existingCodes.forEach((element) => {
        renameFiles(element);
    });

};

export {
    makeTranslations
};
