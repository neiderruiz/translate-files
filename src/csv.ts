import csv from "csvtojson";
import * as fs from "fs";
import fetch from "node-fetch";

/**
 * @Types
 */
type TypeJsonCsv = {
  [key: string]: string;
};

type TranslationsOrder = {
  [key: string]: { [key: string]: string };
};

/**
 * @Consts
 */
const NOT_CREATE = ["base", "key"];
const FOLDER_SUFFIX = '/translations-app.csv';
const apiDoc = (idDoc: string) => `https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`;

/**
 * @Functions
 */
const orderByLanguage = (jsonObj: TypeJsonCsv[]) => {
  let n: TranslationsOrder[] = [];
  jsonObj.forEach((row) => {
    /**
   * @Rows 
   */
    Object.keys(row).forEach((fila) => {
      const exists = n.find((val) => val[fila]);
      if (!exists) {
        n.push({
          [fila]: {
            [row["key"]]: row[fila],
          },
        });
      }
    });
  });
  return n;
};

const saveDataInFiles = (translationsInOrder: TranslationsOrder[], folderSave?: string) => {
  translationsInOrder.map((translation) => {
    const language = Object.keys(translation)[0];
    if (!NOT_CREATE.includes(language)) {
      const values = Object.entries(translation[language]).map((values) => {
        return `"${[values[0]]}": "${values[1]}",\n`;
      });
      const result = values.join('');

      fs.writeFileSync(
        `${folderSave || "./"}/${language}.json`,
        `{\n${result.substring(0, result.length - 2)}\n}`
      );
      console.log(`Finish success ${language}`);
    }
  });
};

const translateFileCsv = async (idDoc: string, folderSave?: string) => {
  fetch(apiDoc(idDoc)).then(async (response) => {
    const data = await response.text();
    if (response.status === 200) {
      try {
        fs.writeFileSync(`${folderSave}${FOLDER_SUFFIX}`, data);
      } catch (e) {
        console.error(`folder not found`);
        return;
      }

      csv()
        .fromFile(`${folderSave}${FOLDER_SUFFIX}`)
        .then((jsonObj: TypeJsonCsv[]) => {
          const translationsOrders = orderByLanguage(jsonObj);
          saveDataInFiles(translationsOrders, folderSave);
        });
      return;
    }
    console.log("error al obtener los datos");
  });
};

export { translateFileCsv };
