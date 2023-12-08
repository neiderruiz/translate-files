import * as fs from "fs";
import csv from "csvtojson";
import { saveWithLevels } from "./save-with-levels";

export type ConfigOptions = {
  separator?: string;
}

export const translateFileCsv = async (idDoc: string, folderSave: string, config?: ConfigOptions) => {
  console.log('💊 start load data \n');
  console.log('🟡 loading... \n');

  try {
    // Fetch CSV data from Google Sheets
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`);
    
    console.log('✅ finish load data \n');

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Process CSV data
    const data = await response.text();
    console.log('✅ start clear headers empty \n');
    let dataSave = '';
    let columnsNotEmpty = 0;

    data.split('\n').forEach((line) => {
      const lineSplit = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      if(!lineSplit) return;

      if (!columnsNotEmpty) {
        columnsNotEmpty = lineSplit.filter((column) => column !== '""').length;
      }

      const firstFive = lineSplit.slice(0, columnsNotEmpty);
      const joinedFirstFive = firstFive.join(',');
      dataSave += `${joinedFirstFive}\n`;
    });

    console.log('✅ clear headers empty finish \n');

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderSave)) {
      console.log('📦 create folder \n');
      fs.mkdirSync(folderSave, { recursive: true });
    }

    // Write processed data to a CSV file
    console.log(`🤓 write file ${folderSave}/translations-app.csv \n`);
    await fs.promises.writeFile(`${folderSave}/translations-app.csv`, dataSave);

    // Read the saved CSV file and process it further
    const readFile = await csv().fromFile(`${folderSave}/translations-app.csv`);

    if (readFile) {
      await saveWithLevels(readFile, folderSave, config);
    }
  } catch (error: any) {
    console.error(`🛑 Error: ${error.message} \n`);
    // You may want to add additional error handling or logging here
  }
};

