"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConversion = exports.convertJsonToCsv = void 0;
var fs = _interopRequireWildcard(require("fs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createConversion = (jsonObj, config) => {
  let csv = '"key","base"';
  config?.langs?.forEach(lang => {
    csv += `,"${lang}"`;
  });
  csv += "\n";
  let rowCounter = 2;
  const traverse = (obj, path = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object") {
        traverse(value, path + key + (config?.separator ?? "."));
      } else {
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
  const result = createConversion(data, config);
  fs.writeFileSync(`${config?.nameFile ?? 'converted'}.csv`, result);
};
exports.convertJsonToCsv = convertJsonToCsv;