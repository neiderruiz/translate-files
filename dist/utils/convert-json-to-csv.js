import * as fs from "fs";
export const createConversion = (jsonObj, config) => {
    var _a, _b;
    let csv = '"key","base"';
    (_a = config === null || config === void 0 ? void 0 : config.langs) === null || _a === void 0 ? void 0 : _a.forEach((lang) => {
        csv += `,"${lang}"`;
    });
    csv += "\n";
    let rowCounter = 2;
    const traverse = (obj, path = "") => {
        Object.entries(obj).forEach(([key, value]) => {
            var _a;
            if (typeof value === "object") {
                traverse(value, path + key + ((_a = config === null || config === void 0 ? void 0 : config.separator) !== null && _a !== void 0 ? _a : "."));
            }
            else {
                csv += `"${path}${key}","${value}"\n`;
            }
        });
    };
    traverse(jsonObj);
    console.log(`TRANSLATE SUCCESS ${(_b = config === null || config === void 0 ? void 0 : config.nameFile) !== null && _b !== void 0 ? _b : 'converted'}.csv added ${rowCounter} rows`);
    return csv;
};
export const convertJsonToCsv = (data, config = {}) => {
    var _a;
    const result = createConversion(data, config);
    fs.writeFileSync(`${(_a = config === null || config === void 0 ? void 0 : config.nameFile) !== null && _a !== void 0 ? _a : 'converted'}.csv`, result);
};
