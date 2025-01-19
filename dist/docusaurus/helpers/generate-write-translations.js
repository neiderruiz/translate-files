"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateWriteTranslations = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _getTranslationsApi = require("../../translate/utils/get-translations-api");
var _readJsonFile = require("../../utils/read-json-file");
var _flattenWriteTranslationJson = require("./flatten-write-translation-json");
var _restructureJson = require("./restructure-json");
var _writeTranslationsCommand = require("./write-translations-command");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateWriteTranslations = async ({
  defaultLocale,
  locales,
  apiKey
}) => {
  await (0, _writeTranslationsCommand.writeTranslationsCommand)(defaultLocale);
  const filePath = _path.default.join('i18n', defaultLocale, 'code.json');
  const jsonData = (0, _readJsonFile.readJsonFile)(filePath);
  if (jsonData) {
    const {
      simpleKeys,
      flattenedJson
    } = (0, _flattenWriteTranslationJson.flattenWriteTranslationJson)(jsonData);
    for (const locale of locales) {
      if (locale === defaultLocale) continue;
      console.log(`✅ running translations ${locale} ... \n`);
      await (0, _writeTranslationsCommand.writeTranslationsCommand)(locale);
      const filePathSave = _path.default.join('i18n', locale, 'code.json');
      const result = await (0, _getTranslationsApi.getTranslationsFromAPI)({
        data: flattenedJson,
        sourceLang: defaultLocale,
        targetLang: locale,
        typeProject: 'docusaurus',
        apiKey,
        route_file: filePath
      });
      const restructuredJson = (0, _restructureJson.restructureJson)(result, jsonData, simpleKeys);
      _fs.default.writeFileSync(filePathSave, JSON.stringify(restructuredJson, null, 2));
      console.log(`📦  Finish success ${locale.toUpperCase()}  ${filePathSave} \n`);
    }
  } else {
    console.log('No se pudo leer el archivo JSON.');
  }
};
exports.generateWriteTranslations = generateWriteTranslations;