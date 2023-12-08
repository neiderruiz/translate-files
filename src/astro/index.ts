import { translateFileCsv } from "../translate/utils/translate-file-csv";
import path from "path";
import fs from "fs";

const renameFiles = (language: string) => {
    const localesPath = './public/locales'
    const outputDir = path.join(localesPath, language);
    const translatedFilePath = path.join(localesPath,`${language}.json`);
    const newFilePath = path.join(localesPath, language, 'translation.json');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    if (fs.existsSync(translatedFilePath)) {
        fs.renameSync(translatedFilePath, newFilePath);
        console.log(`Archivo ${language}.json traducido y renombrado a translation.json`);
    } else {
        console.log(`Archivo ${language}.json no encontrado`);
    }
}

 const translateAndRename = async () => {
    const localesPath = './public/locales';

    await translateFileCsv('your-id', localesPath, {
        separator: '.',
    });
    setTimeout(( ) => {
        ['es', 'en'].forEach((element) => {
            renameFiles(element);
        });
    }, 2000);

};

export default {
    translateAndRename
}