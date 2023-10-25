import * as fs from "fs";
import csv from "csvtojson";
import { saveWithLevels } from "./save-with-levels";
export const translateFileCsv = async (idDoc, folderSave) => {
    fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`).then(async (response) => {
        const data = await response.text();
        if (response.status === 200) {
            try {
                fs.writeFileSync(`${folderSave}/translations-app.csv`, data);
            }
            catch (e) {
                console.error(`folder not found`);
                return;
            }
            csv()
                .fromFile(`${folderSave}/translations-app.csv`)
                .then((jsonObj) => {
                saveWithLevels(jsonObj, folderSave);
            });
        }
        else {
            console.log("error al obtener los datos");
        }
    });
};
