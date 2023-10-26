"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToCsv = exports.createConversion = void 0;
const fs = __importStar(require("fs"));
const createConversion = (jsonObj, config) => {
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
exports.createConversion = createConversion;
const convertJsonToCsv = (data, config = {}) => {
    const result = (0, exports.createConversion)(data, config);
    fs.writeFileSync(`${config?.nameFile ?? 'converted'}.csv`, result);
};
exports.convertJsonToCsv = convertJsonToCsv;
