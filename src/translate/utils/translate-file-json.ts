import EventSource from 'eventsource';
import * as fs from "fs";
import { TypeListLang } from '../types/langs';

export type ConfigOptions = {
  input: TypeListLang;
  outputs: TypeListLang[];
}

const countTranslations = (obj: { [key: string]: string | object }): number => {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      count += countTranslations(obj[key] as { [key: string]: string | object });
    } else {
      count += 1;
    }
  }
  return count;
};

export const translateFileJson = async (jsonBase: { [key: string]: string | object }, folderSave: string, config?: ConfigOptions) => {
  console.log('💊 start load data \n');
  try {
    const totalTranslations = config?.outputs?.length || 0;
    console.log(`🔄 Total translations to perform: ${totalTranslations} \n`);

    const totalEntries = countTranslations(jsonBase);
    console.log(`🔄 Total entries to translate in ${config?.input}.json: ${totalEntries} \n`);

    for (const output of config?.outputs || []) {
      console.log(`✅ running translations ${output} ... \n`);

      const eventSource = new EventSource(`https://translate-files-api-production.up.railway.app/progress`);

      eventSource.onmessage = function (event) {
        console.log(`${event.data} \n`);
      };

      eventSource.onerror = function (event) {
        console.error("Error receiving updates.", event);
        eventSource.close();
      };

      const response = await fetch(`https://translate-files-api-production.up.railway.app/traducir?source_lang=${config?.input}&target_lang=${output}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBase)
      });

      eventSource.close();

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!fs.existsSync(folderSave)) {
        console.log('📦 create folder \n');
        fs.mkdirSync(folderSave, { recursive: true });
      }

      fs.writeFileSync(
        `${folderSave}/${output}.json`,
        JSON.stringify(data, null, 4)
      );

      console.log(`📦  Finish success ${output.toUpperCase()}  ${folderSave}/${output}.json \n`);
    }
  } catch (error: any) {
    console.log(`${error.message} \n`);
    console.error("🛑 Timeout error occurred. We are aware of the issue and are working to resolve it. Please try again later... \n");
  }
};
