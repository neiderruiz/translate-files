import * as fs from "fs";
export const createConversion = (jsonObj) => {
    let csv = '"key","base"\n';
    const traverse = (obj, path = "") => {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object") {
                traverse(value, path + key + "&&");
            }
            else {
                csv += `"${path}${key}","${value}"\n`;
            }
        }
    };
    traverse(jsonObj);
    return csv;
};
export const convertJsonToCsv = (data, { nameFile = "converted" } = {}) => {
    const result = createConversion(data);
    fs.writeFileSync(`${nameFile}.csv`, result);
};
