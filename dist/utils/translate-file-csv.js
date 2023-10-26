var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import csv from "csvtojson";
import { saveWithLevels } from "./save-with-levels";
export const translateFileCsv = (idDoc, folderSave, config) => __awaiter(void 0, void 0, void 0, function* () {
    fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield response.text();
        if (response.status === 200) {
            try {
                if (!fs.existsSync(folderSave)) {
                    fs.mkdirSync(folderSave, { recursive: true });
                }
                fs.writeFileSync(`${folderSave}/translations-app.csv`, data);
            }
            catch (e) {
                console.error(`Error al escribir el archivo o crear el directorio: ${e.message}`);
                return;
            }
            csv()
                .fromFile(`${folderSave}/translations-app.csv`)
                .then((jsonObj) => {
                saveWithLevels(jsonObj, folderSave, config);
            });
        }
        else {
            console.log("error al obtener los datos");
        }
    }));
});
