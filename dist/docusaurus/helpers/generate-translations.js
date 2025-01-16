"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTranslations = generateTranslations;
var _fs = _interopRequireDefault(require("fs"));
var _blogTranslate = require("./blog-translate");
var _docsTranslate = require("./docs-translate");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function generateTranslations({
  locales,
  defaultLocale,
  baseDocsDir = './translate/docs',
  i18nDir = './i18n',
  apiKey,
  baseBlogDir = './translate/blog',
  outputDocDir = './docs',
  outputBlogDir = './blog',
  disableBlog,
  disableDocs
}) {
  if (disableDocs) {
    console.log('🚫 Not translate docs');
  } else {
    if (!_fs.default.existsSync(baseDocsDir)) {
      console.error(`El directorio ${baseDocsDir} no existe.`);
      process.exit(1);
    }
    await (0, _docsTranslate.docsTranslate)({
      dir: baseDocsDir,
      locales,
      defaultLocale,
      baseDocsDir,
      i18nDir,
      outputDocDir,
      apiKey
    });
  }
  if (disableBlog) {
    console.log('🚫 Not translate blog');
  } else {
    if (!_fs.default.existsSync(baseBlogDir)) {
      console.error(`El directorio ${baseBlogDir} no existe.`);
      process.exit(1);
    }
    await (0, _blogTranslate.blogTranslate)({
      dir: baseBlogDir,
      locales,
      defaultLocale,
      outputBlogDir,
      i18nDir,
      apiKey,
      baseBlogDir
    });
  }
}