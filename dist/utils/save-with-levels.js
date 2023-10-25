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
var fs = __importStar(require("fs"));
var add_key_value_to_object_1 = require("./add-key-value-to-object");
var sort_by_language_1 = require("./sort-by-language");
var saveWithLevels = function (jsonObj, folderSave) {
    var translationsOrders = (0, sort_by_language_1.sortByLanguage)(jsonObj);
    var notCreate = ["base", "key"];
    translationsOrders.map(function (translation) {
        var language = Object.keys(translation)[0];
        if (!notCreate.includes(language)) {
            var result_1 = {};
            Object.entries(translation[language]).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                var keys = key.split("&&");
                (0, add_key_value_to_object_1.addKeyValueToObject)(result_1, keys, value);
            });
            fs.writeFileSync("".concat(folderSave, "/").concat(language, ".json"), JSON.stringify(result_1, null, 4));
            console.log("Finish success ".concat(language));
        }
    });
};
exports.saveWithLevels = saveWithLevels;
