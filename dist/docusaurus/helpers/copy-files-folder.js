"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFilesFolder = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const copyFilesFolder = ({
  locales,
  i18nDir,
  itemRelativePath,
  itemPath,
  item,
  defaultLocale,
  defaultFolder,
  baseFolderSave
}) => {
  // move file to all locales
  locales.forEach(locale => {
    const localeDir = _path.default.join(i18nDir, locale, baseFolderSave, _path.default.dirname(itemRelativePath));
    if (!_fs.default.existsSync(localeDir)) {
      _fs.default.mkdirSync(localeDir, {
        recursive: true
      });
    }
    const outputFilePath = _path.default.join(localeDir, item);
    _fs.default.copyFileSync(itemPath, outputFilePath);
    const routeOutputLog = _path.default.join(locale, baseFolderSave, _path.default.dirname(itemRelativePath), item);
    if (defaultLocale == locale) {
      const routeFilesDoc = _path.default.join(defaultFolder, _path.default.dirname(itemRelativePath));
      if (!_fs.default.existsSync(routeFilesDoc)) {
        _fs.default.mkdirSync(routeFilesDoc, {
          recursive: true
        });
      }
      const outputFileDoc = _path.default.join(routeFilesDoc, item);
      _fs.default.copyFileSync(itemPath, outputFileDoc);
    }
    console.log(`🔄 (File - Copied): ${routeOutputLog}`);
  });
};
exports.copyFilesFolder = copyFilesFolder;