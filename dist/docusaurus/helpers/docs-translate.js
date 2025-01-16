"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docsTranslate = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _getTranslationsApi = require("../../translate/utils/get-translations-api");
var _copyFilesFolder = require("./copy-files-folder");
var _extractKeysAndTexts = require("./extract-keys-and-texts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const docsTranslate = async ({
  dir,
  baseDocsDir,
  defaultLocale,
  locales,
  i18nDir,
  outputDocDir,
  apiKey
}) => {
  const items = _fs.default.readdirSync(dir);
  items.forEach(async item => {
    const itemPath = _path.default.join(dir, item);
    const itemRelativePath = _path.default.relative(baseDocsDir, itemPath);
    if (_fs.default.statSync(itemPath).isDirectory()) {
      // subfolder process
      docsTranslate({
        dir: itemPath,
        baseDocsDir,
        defaultLocale,
        locales,
        i18nDir,
        outputDocDir
      });
    } else if (item.endsWith('.md') || item === '_category_.json') {
      // process archivo `.md` o `_category_.json`
      const content = _fs.default.readFileSync(itemPath, 'utf8');
      const keysAndTexts = (0, _extractKeysAndTexts.extractKeysAndTexts)(content);
      const localeArray = defaultLocale ? [defaultLocale, ...locales] : locales;
      for (const locale of localeArray) {
        let translations = {};
        if (defaultLocale === locale) {
          translations = keysAndTexts; // Mantener el contenido original
        } else {
          translations = await (0, _getTranslationsApi.getTranslationsFromAPI)({
            sourceLang: defaultLocale,
            targetLang: locale,
            data: keysAndTexts,
            typeProject: 'docusaurus',
            apiKey
          });
        }
        const localeDir = _path.default.join(i18nDir, locale, 'docusaurus-plugin-content-docs/current', _path.default.dirname(itemRelativePath));
        if (!_fs.default.existsSync(localeDir)) {
          _fs.default.mkdirSync(localeDir, {
            recursive: true
          });
        }
        const outputFilePath = _path.default.join(localeDir, item);
        let translatedContent = content;
        for (const [key, value] of Object.entries(translations)) {
          translatedContent = translatedContent.replace(new RegExp(`{{${key}\\|.*?}}`, 'g'), value);
        }
        const routeOutputLog = _path.default.join(locale, 'docusaurus-plugin-content-docs/current', _path.default.dirname(itemRelativePath), item);
        if (defaultLocale === locale) {
          const baseDocsPath = _path.default.join(outputDocDir, _path.default.dirname(itemRelativePath));
          if (!_fs.default.existsSync(baseDocsPath)) {
            _fs.default.mkdirSync(baseDocsPath, {
              recursive: true
            });
          }
          const routeFileSaveDoc = _path.default.join(outputDocDir, _path.default.dirname(itemRelativePath), item);
          _fs.default.writeFileSync(routeFileSaveDoc, translatedContent);
        }
        _fs.default.writeFileSync(outputFilePath, translatedContent);
        console.log(`✅ (Translated): ${routeOutputLog}`);
      }
    } else {
      // move file to all locales and copy to docs
      (0, _copyFilesFolder.copyFilesFolder)({
        defaultFolder: outputDocDir,
        defaultLocale,
        i18nDir,
        item,
        itemPath,
        itemRelativePath,
        locales,
        baseFolderSave: 'docusaurus-plugin-content-docs/current'
      });
    }
  });
};
exports.docsTranslate = docsTranslate;