import * as fs from "fs";
import { addKeyValueToObject } from "./add-key-value-to-object";
import { sortByLanguage } from "./sort-by-language";
import { langs } from "../types/langs";
export const saveWithLevels = (jsonObj, folderSave, config) => {
    const translationsOrders = sortByLanguage(jsonObj);
    const notCreate = ["base", "key"];
    const langsKeys = langs.map((lang) => lang.code);
    translationsOrders.map((translation) => {
        const language = Object.keys(translation)[0];
        if (!notCreate.includes(language) && langsKeys.includes(language)) {
            let result = {};
            Object.entries(translation[language]).forEach(([key, value]) => {
                var _a;
                const keys = key.split((_a = config === null || config === void 0 ? void 0 : config.separator) !== null && _a !== void 0 ? _a : ".");
                addKeyValueToObject(result, keys, value);
            });
            fs.writeFileSync(`${folderSave}/${language}.json`, JSON.stringify(result, null, 4));
            console.log(`Finish success ${language}`);
        }
    });
};
