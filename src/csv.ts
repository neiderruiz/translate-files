import * as fs from "fs";
import csv from "csvtojson";
import fetch from "node-fetch";

type TypeJsonCsv = {
  [key: string]: string;
};

type TranslationsOrder = {
  [key: string]: { [key: string]: string };
};

const orderByLanguage = (jsonObj: TypeJsonCsv[]) => {
  let n: TranslationsOrder[] = [];
  jsonObj.map((row) => {
    // filas
    Object.keys(row).map((fila) => {
      const exists = n.find((val) => val[fila]);
      if (exists) {
        exists[fila] = {
          ...exists[fila],
          [row["key"]]: row[fila],
        };
      } else {
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

const saveDataInFiles = (
  translationsInOrder: TranslationsOrder[],
  folderSave?: string
) => {
  const notCreate = ["base", "key"];
  translationsInOrder.map((translation) => {
    const language = Object.keys(translation)[0];
    if (!notCreate.includes(language)) {
      let result = "";
      Object.entries(translation[language]).map((values) => {
        result += `"${[values[0]]}": "${values[1]}",\n`;
      });
      fs.writeFileSync(
        `${folderSave || "./"}/${language}.json`,
        `{\n${result.substring(0, result.length - 2)}\n}`
      );
      console.log(`Finish success ${language}`);
    }
  });
};

const translateFileCsv = async (idDoc: string, folderSave?: string) => {
  fetch(
    `https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`
  ).then(async (response) => {
    const data = await response.text();
    if (response.status === 200) {
      try {
        fs.writeFileSync(`${folderSave}/translations-app.csv`, data);
      } catch (e) {
        console.error(`folder not found`);
        return;
      }

      csv()
        .fromFile(`${folderSave}/translations-app.csv`)
        .then((jsonObj) => {
          const translationsOrders = orderByLanguage(jsonObj);
          saveDataInFiles(translationsOrders, folderSave);
        });
    } else {
      console.log("error al obtener los datos");
    }
  });
};

export { translateFileCsv };
