"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processDirectory = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _getTranslationsApi = require("../../translate/utils/get-translations-api");
var _extractKeysAndTexts = require("./extract-keys-and-texts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const processDirectory = ({
  dir,
  pagesDir,
  defaultLocale,
  locales,
  i18nDir
}) => {
  const items = _fs.default.readdirSync(dir);
  items.forEach(async item => {
    const itemPath = _path.default.join(dir, item);
    const itemRelativePath = _path.default.relative(pagesDir, itemPath);
    if (_fs.default.statSync(itemPath).isDirectory()) {
      // Si es una subcarpeta, procesarla recursivamente
      processDirectory({
        dir: itemPath,
        pagesDir,
        defaultLocale,
        locales,
        i18nDir
      });
    } else if (item.endsWith('.md') || item === '_category_.json') {
      // Procesar archivo `.md` o `_category_.json`
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
            typeProject: 'docusaurus'
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

        // Reemplazar claves con sus traducciones
        for (const [key, value] of Object.entries(translations)) {
          translatedContent = translatedContent.replace(new RegExp(`{{${key}\\|.*?}}`, 'g'), value);
        }
        const routeOutputLog = _path.default.join(locale, 'docusaurus-plugin-content-docs/current', _path.default.dirname(itemRelativePath), item);
        _fs.default.writeFileSync(outputFilePath, translatedContent);
        console.log(`✅ (Translated): ${routeOutputLog}`);
      }
    } else {
      // Procesar otros archivos (imágenes, etc.) para todos los idiomas
      locales.forEach(locale => {
        const localeDir = _path.default.join(i18nDir, locale, 'docusaurus-plugin-content-docs/current', _path.default.dirname(itemRelativePath));
        if (!_fs.default.existsSync(localeDir)) {
          _fs.default.mkdirSync(localeDir, {
            recursive: true
          });
        }
        const outputFilePath = _path.default.join(localeDir, item);
        _fs.default.copyFileSync(itemPath, outputFilePath);
        const routeOutputLog = _path.default.join(locale, 'docusaurus-plugin-content-docs/current', _path.default.dirname(itemRelativePath), item);
        console.log(`🔄 (File - Copied): ${routeOutputLog}`);
      });
    }
  });
};
exports.processDirectory = processDirectory;