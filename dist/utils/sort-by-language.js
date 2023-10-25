"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByLanguage = void 0;
var sortByLanguage = function (jsonObj) {
    var n = [];
    jsonObj.map(function (row) {
        // filas
        Object.keys(row).map(function (fila) {
            var _a, _b, _c;
            var exists = n.find(function (val) { return val[fila]; });
            if (exists) {
                exists[fila] = __assign(__assign({}, exists[fila]), (_a = {}, _a[row["key"]] = row[fila], _a));
            }
            else {
                n.push((_b = {},
                    _b[fila] = (_c = {},
                        _c[row["key"]] = row[fila],
                        _c),
                    _b));
            }
        });
    });
    return n;
};
exports.sortByLanguage = sortByLanguage;
