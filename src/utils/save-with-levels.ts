import * as fs from "fs";
import { TypeJsonCsv } from "../types/types";
import { addKeyValueToObject } from "./add-key-value-to-object";
import { sortByLanguage } from "./sort-by-language";

export const saveWithLevels = (jsonObj: TypeJsonCsv[], folderSave: string) => {
    const translationsOrders = sortByLanguage(jsonObj);
    const notCreate = ["base", "key"];
    translationsOrders.map((translation) => {
      const language = Object.keys(translation)[0];
      if (!notCreate.includes(language)) {
        let result = {};
        Object.entries(translation[language]).forEach(([key, value]) => {
          const keys = key.split("&&");
          addKeyValueToObject(result, keys, value);
        });
        fs.writeFileSync(
          `${folderSave}/${language}.json`,
          JSON.stringify(result, null, 4)
        );
        console.log(`Finish success ${language}`);
      }
    });
  };