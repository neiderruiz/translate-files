"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveWithLevels = void 0;
var fs = _interopRequireWildcard(require("fs"));
var _addKeyValueToObject = require("./add-key-value-to-object");
var _sortByLanguage = require("./sort-by-language");
var _langs = require("../types/langs");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const saveWithLevels = (jsonObj, folderSave, config) => {
  return new Promise((resolve, reject) => {
    try {
      const translationsOrders = (0, _sortByLanguage.sortByLanguage)(jsonObj);
      const notCreate = ["base", "key"];
      const langsKeys = _langs.langs.map(lang => lang.code);
      translationsOrders.map(translation => {
        const language = Object.keys(translation)[0];
        if (!notCreate.includes(language) && langsKeys.includes(language)) {
          let result = {};
          Object.entries(translation[language]).forEach(([key, value]) => {
            const keys = key.split(config?.separator ?? ".");
            (0, _addKeyValueToObject.addKeyValueToObject)(result, keys, value);
          });
          fs.writeFileSync(`${folderSave}/${language}.json`, JSON.stringify(result, null, 4));
          console.log(`🟢  Finish success ${language.toUpperCase()}  ${folderSave}/${language}.json \n`);
        }
      });
      resolve("Operation completed successfully");
    } catch (error) {
      reject(`Error occurred: ${error}`);
    }
  });
};
exports.saveWithLevels = saveWithLevels;