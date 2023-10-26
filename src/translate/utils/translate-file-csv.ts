import * as fs from "fs";
import csv from "csvtojson";
import { saveWithLevels } from "./save-with-levels";

export type ConfigOptions = {
  separator?: string;
}

export const translateFileCsv = async (idDoc: string, folderSave: string, config?: ConfigOptions) => {
  console.log('💊 start load data \n')
  console.log('🟡 loading... \n')
  fetch(
    `https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`
  ).then(async (response) => {
    const data = await response.text();
    console.log('✅ finish load data \n');
    if (response.status === 200) {
      console.log('✅ start clear headers empty \n');
      let dataSave = '';
      let columnsNotEmpty = 0;
      data.split('\n').forEach((line) => {
        const lineSplit = line.split(',');
        if(!columnsNotEmpty){
          columnsNotEmpty = lineSplit.filter((column) => column != '""').length;
        }
        const firstFive = lineSplit.slice(0, columnsNotEmpty);
        const joinedFirstFive = firstFive.join(',');
        dataSave += `${joinedFirstFive}\n`;
      });
      console.log('✅ clear headers empty finish \n');
      try {
        if (!fs.existsSync(folderSave)) {
          console.log('📦 create folder \n')
          fs.mkdirSync(folderSave, { recursive: true });
        }
        
        console.log(`🤓 write file ${folderSave}/translations-app.csv \n`)
        fs.writeFileSync(`${folderSave}/translations-app.csv`, dataSave);
      } catch (e: any) {
        console.error(`🛑 Error al escribir el archivo o crear el directorio: ${e.message} \n`);
        return;
      }

      csv()
        .fromFile(`${folderSave}/translations-app.csv`)
        .then((jsonObj) => {
          saveWithLevels(jsonObj, folderSave, config);
        });
    } else {
      console.log("🛑  error al obtener los datos \n");
    }
  });
};
