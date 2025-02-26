import { TranslationsOrder, TypeSimpleJson } from "../types/types";

export const sortByLanguage = (jsonObj: TypeSimpleJson[]) => {
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
