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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateFileCsv = void 0;
const fs = __importStar(require("fs"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const save_with_levels_1 = require("./save-with-levels");
const translateFileCsv = async (idDoc, folderSave, config) => {
    fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`).then(async (response) => {
        const data = await response.text();
        if (response.status === 200) {
            try {
                fs.writeFileSync(`${folderSave}/translations-app.csv`, data);
            }
            catch (e) {
                console.error(`folder not found`);
                return;
            }
            (0, csvtojson_1.default)()
                .fromFile(`${folderSave}/translations-app.csv`)
                .then((jsonObj) => {
                console.log("jsonObj-config", config);
                (0, save_with_levels_1.saveWithLevels)(jsonObj, folderSave, config);
            });
        }
        else {
            console.log("error al obtener los datos");
        }
    });
};
exports.translateFileCsv = translateFileCsv;
