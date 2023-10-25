import * as fs from "fs";
import csv from "csvtojson";
import { saveWithLevels } from "./save-with-levels";

export type ConfigOptions = {
  separator?: string;
}

export const translateFileCsv = async (idDoc: string, folderSave: string, config?: ConfigOptions) => {
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
          saveWithLevels(jsonObj, folderSave, config);
        });
    } else {
      console.log("error al obtener los datos");
    }
  });
};
