"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpileTransFiles = transpileTransFiles;
var _fs = _interopRequireDefault(require("fs"));
var _processDirectory = require("./process-directory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function transpileTransFiles({
  locales,
  defaultLocale,
  pagesDir,
  i18nDir,
  apiKey
}) {
  if (!_fs.default.existsSync(pagesDir)) {
    console.error(`El directorio ${pagesDir} no existe.`);
    process.exit(1);
  }
  (0, _processDirectory.processDirectory)({
    dir: pagesDir,
    locales,
    defaultLocale,
    pagesDir,
    i18nDir
  });
}