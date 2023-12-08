"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTranslations = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _langs = require("../translate/types/langs");
var _translateFileCsv = require("../translate/utils/translate-file-csv");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const renameFiles = language => {
  const localesPath = './public/locales';
  const outputDir = _path.default.join(localesPath, language);
  const translatedFilePath = _path.default.join(localesPath, `${language}.json`);
  const newFilePath = _path.default.join(localesPath, language, 'translation.json');
  if (!_fs.default.existsSync(outputDir)) {
    _fs.default.mkdirSync(outputDir, {
      recursive: true
    });
  }
  if (_fs.default.existsSync(translatedFilePath)) {
    _fs.default.renameSync(translatedFilePath, newFilePath);
    console.log(`✅ Archivo ${language}.json translated and renamed to translation.json \n`);
  } else {
    console.log(`🛑 Archivo ${language}.json not found`);
  }
};
const makeTranslations = async (idDoc, config) => {
  const localesPath = './public/locales';
  await (0, _translateFileCsv.translateFileCsv)(idDoc, localesPath, config);
  const files = _fs.default.readdirSync(localesPath);
  const jsonFiles = files.filter(file => _path.default.extname(file) === '.json').map(file => file.replace('.json', ''));
  const existingCodes = jsonFiles.filter(code => _langs.langs.some(lang => lang.code === code));
  existingCodes.forEach(element => {
    renameFiles(element);
  });
};
exports.makeTranslations = makeTranslations;