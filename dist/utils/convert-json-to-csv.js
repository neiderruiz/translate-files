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
var fs = __importStar(require("fs"));
var createConversion = function (jsonObj) {
    var csv = '"key","base"\n';
    var traverse = function (obj, path) {
        if (path === void 0) { path = ""; }
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (typeof value === "object") {
                traverse(value, path + key + "&&");
            }
            else {
                csv += "\"".concat(path).concat(key, "\",\"").concat(value, "\"\n");
            }
        }
    };
    traverse(jsonObj);
    return csv;
};
exports.createConversion = createConversion;
var convertJsonToCsv = function (data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.nameFile, nameFile = _c === void 0 ? "converted" : _c;
    var result = (0, exports.createConversion)(data);
    fs.writeFileSync("".concat(nameFile, ".csv"), result);
};
exports.convertJsonToCsv = convertJsonToCsv;
