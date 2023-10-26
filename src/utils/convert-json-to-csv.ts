import * as fs from "fs";
import { TypeListLang } from "../types/langs";

type TypeJson = {
  [key: string]: any;
};

export type ConfigOptions = {
  separator?: string;
  nameFile?: string;
  entryLanguage?: string;
  langs?: TypeListLang[];
};

export const createConversion = (jsonObj: TypeJson, config?: ConfigOptions) => {
  let csv = '"key","base"';
  config?.langs?.forEach((lang) => {
    csv += `,"${lang}"`;
  });

  csv += "\n";

  let rowCounter = 2;
  const traverse = (obj: TypeJson, path = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object") {
        traverse(value, path + key + (config?.separator ?? "."));
      } else {
        csv += `"${path}${key}","${value}"\n`; 
      }
    }
    );
  };
  
  traverse(jsonObj);
  console.log(`TRANSLATE SUCCESS ${config?.nameFile ?? 'converted'}.csv added ${rowCounter} rows`);
  return csv;
};

export const convertJsonToCsv = (
  data: TypeJson,
  config: ConfigOptions = {}
) => {
  const result = createConversion(data, config);
  fs.writeFileSync(`${config?.nameFile ?? 'converted'}.csv`, result);
};
