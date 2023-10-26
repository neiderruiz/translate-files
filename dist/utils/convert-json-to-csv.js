import * as fs from "fs";
export const createConversion = (jsonObj, config) => {
    let csv = '"key","base"';
    config?.langs?.forEach((lang) => {
        csv += `,"${lang}"`;
    });
    csv += "\n";
    let rowCounter = 2;
    const traverse = (obj, path = "") => {
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === "object") {
                traverse(value, path + key + (config?.separator ?? "."));
            }
            else {
                csv += `"${path}${key}","${value}"\n`;
            }
        });
    };
    traverse(jsonObj);
    console.log(`TRANSLATE SUCCESS ${config?.nameFile ?? 'converted'}.csv added ${rowCounter} rows`);
    return csv;
};
export const convertJsonToCsv = (data, config = {}) => {
    const result = createConversion(data, config);
    fs.writeFileSync(`${config?.nameFile ?? 'converted'}.csv`, result);
};
