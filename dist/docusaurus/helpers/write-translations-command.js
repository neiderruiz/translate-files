"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeTranslationsCommand = void 0;
var _child_process = require("child_process");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _readJsonFile = require("../../utils/read-json-file");
var _removeItemsFromJson = require("../../utils/remove-items-from-json");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const writeTranslationsCommand = async lang => {
  try {
    const command = `npm run write-translations -- --locale ${lang}`;
    console.log(`\n 🚀 Running command: ${command} \n`);
    await new Promise((resolve, reject) => {
      (0, _child_process.exec)(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error---: ${error.message}`);
          reject(error);
        } else if (stderr.includes('[WARNING] Some translation keys looks unknown to us')) {
          const regex = /-\s+(.*?)(?:\n|$)/g;
          let match;
          const itemsDelete = [];
          while ((match = regex.exec(stderr)) !== null) {
            itemsDelete.push(match[1]);
          }
          const filePath = _path.default.join('i18n', lang, 'code.json');
          const jsonData = (0, _readJsonFile.readJsonFile)(filePath);
          const filteredJson = (0, _removeItemsFromJson.removeItemsFromJson)(jsonData, itemsDelete);
          _fs.default.writeFileSync(filePath, JSON.stringify(filteredJson, null, 2));
          resolve(stdout); // Resolver a pesar de la advertencia
        } else {
          resolve(stdout);
        }
      });
    });
  } catch (error) {
    console.error(`Failed to execute command: ${error}`);
  }
};
exports.writeTranslationsCommand = writeTranslationsCommand;