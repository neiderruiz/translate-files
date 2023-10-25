"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypedTranslation = void 0;
var react_i18next_1 = require("react-i18next");
function useTypedTranslation() {
    var _a = (0, react_i18next_1.useTranslation)(), t = _a.t, i18n = _a.i18n;
    var typedT = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return t(key);
    };
    return { t: typedT, i18n: i18n };
}
exports.useTypedTranslation = useTypedTranslation;
