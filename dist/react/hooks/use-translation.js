"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypedTranslation = void 0;
const react_i18next_1 = require("react-i18next");
function useTypedTranslation() {
    const { t, i18n } = (0, react_i18next_1.useTranslation)();
    const typedT = (key, ...args) => {
        return t(key);
    };
    return { t: typedT, i18n };
}
exports.useTypedTranslation = useTypedTranslation;
