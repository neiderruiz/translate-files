import * as fs from "fs";
import { TypeListLang } from '../types/langs';
import { TypeProject } from "../types/type-project";
import { getTranslationsFromAPI } from '../utils/get-translations-api';

export type ConfigOptions = {
  input: TypeListLang;
  target_langs: TypeListLang[];
  api_key?: string;
  typeProject: TypeProject
}

export type JsonBase = {
  [key: string]: string | object;
}

const countTranslations = (obj: JsonBase): number => {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      count += countTranslations(obj[key] as JsonBase);
    } else {
      count += 1;
    }
  }
  return count;
};

export const translateFileJson = async (jsonBase: JsonBase, folderSave: string, config: ConfigOptions) => {
  console.log('💊 start load data \n');
  try {
    const totalTranslations = config?.target_langs?.length || 0;
    console.log(`🔄 Total translations to perform: ${totalTranslations} \n`);

    const totalEntries = countTranslations(jsonBase);
    console.log(`🔄 Total entries to translate in ${config?.input}.json: ${totalEntries} \n`);

    for (const output of config?.target_langs || []) {
      console.log(`✅ running translations ${output} ... \n`);

      const data = await getTranslationsFromAPI({
        data: jsonBase,
        sourceLang: config?.input,
        targetLang: output,
        typeProject: config?.typeProject ?? 'json',
        apiKey: config?.api_key,
        route_file: `${config?.input}.json`
      })

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
