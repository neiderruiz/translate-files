import * as fs from "fs";

type TypeJson = {
  [key: string]: any;
};

export const createConversion = (jsonObj: TypeJson) => {
  let csv = '"key","base"\n';

  const traverse = (obj: TypeJson, path = "") => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        traverse(value, path + key + "&&");
      } else {
        csv += `"${path}${key}","${value}"\n`;
      }
    }
  };

  traverse(jsonObj);
  return csv;
};

export const convertJsonToCsv = (
  data: TypeJson,
  { nameFile = "converted" }: { nameFile?: string } = {}
) => {
  const result = createConversion(data);
  fs.writeFileSync(`${nameFile}.csv`, result);
};
