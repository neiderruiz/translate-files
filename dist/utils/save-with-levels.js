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
exports.saveWithLevels = void 0;
const fs = __importStar(require("fs"));
const add_key_value_to_object_1 = require("./add-key-value-to-object");
const sort_by_language_1 = require("./sort-by-language");
const langs_1 = require("../types/langs");
const saveWithLevels = (jsonObj, folderSave, config) => {
    const translationsOrders = (0, sort_by_language_1.sortByLanguage)(jsonObj);
    const notCreate = ["base", "key"];
    const langsKeys = langs_1.langs.map((lang) => lang.code);
    translationsOrders.map((translation) => {
        const language = Object.keys(translation)[0];
        if (!notCreate.includes(language) && langsKeys.includes(language)) {
            let result = {};
            Object.entries(translation[language]).forEach(([key, value]) => {
                const keys = key.split(config?.separator ?? ".");
                (0, add_key_value_to_object_1.addKeyValueToObject)(result, keys, value);
            });
            fs.writeFileSync(`${folderSave}/${language}.json`, JSON.stringify(result, null, 4));
            console.log(`Finish success ${language}`);
        }
    });
};
exports.saveWithLevels = saveWithLevels;
